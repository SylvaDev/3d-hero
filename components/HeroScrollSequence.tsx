'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { heroWordmarkFont } from '@/app/hero-font';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
/** Pinned scroll distance (px). Do not set the section height to this — ScrollTrigger pinSpacing already creates the scroll track. */
const SCROLL_DISTANCE = 3800;

/** Source frame dimensions — caps canvas backing store so we do not paint larger than the sequence can resolve. */
const SEQUENCE_NATIVE_WIDTH = 1920;
const SEQUENCE_NATIVE_HEIGHT = 1080;
/** Keeps 1080p-class desktops smooth; raise toward 2.5–3 only if you need sharper HiDPI and accept the cost. */
const MAX_CANVAS_DPR = 2;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroScrollSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  const frames = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => `/frames/frame_${String(index + 1).padStart(4, '0')}.jpg`),
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const playhead = { frame: 0 };
    let loaded = 0;
    let raf = 0;
    let lastDrawnFrame = -1;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width;
      const cssH = rect.height;
      if (!cssW || !cssH) return;

      const ratio = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
      let bw = Math.floor(cssW * ratio);
      let bh = Math.floor(cssH * ratio);

      const maxBW = Math.floor(SEQUENCE_NATIVE_WIDTH * ratio);
      const maxBH = Math.floor(SEQUENCE_NATIVE_HEIGHT * ratio);
      const scaleDown = Math.min(1, maxBW / bw, maxBH / bh);
      bw = Math.max(1, Math.floor(bw * scaleDown));
      bh = Math.max(1, Math.floor(bh * scaleDown));

      canvas.width = bw;
      canvas.height = bh;
      context.setTransform(bw / cssW, 0, 0, bh / cssH, 0, 0);

      lastDrawnFrame = -1;
      render();
    };

    const drawContain = (image: HTMLImageElement) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      context.fillStyle = '#030303';
      context.fillRect(0, 0, width, height);

      const imageRatio = image.width / image.height;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;

      if (imageRatio > canvasRatio) {
        drawWidth = width;
        drawHeight = width / imageRatio;
      } else {
        drawHeight = height;
        drawWidth = height * imageRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;
      context.drawImage(image, x, y, drawWidth, drawHeight);
    };

    const render = () => {
      const index = clamp(Math.round(playhead.frame), 0, FRAME_COUNT - 1);
      if (index === lastDrawnFrame) return;

      const current = images[index];
      if (!current?.complete) return;

      lastDrawnFrame = index;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => drawContain(current));
    };

    const handleLoad = () => {
      loaded += 1;
      if (loaded === 1) {
        setCanvasSize();
      }
    };

    frames.forEach((src) => {
      const image = new Image();
      image.src = src;
      image.decoding = 'async';
      image.onload = handleLoad;
      images.push(image);
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${SCROLL_DISTANCE}`,
        scrub: 0.9,
        pin: true,
        anticipatePin: 1,
      },
    });

    timeline
      .to(playhead, {
        frame: FRAME_COUNT - 1,
        duration: 1,
        ease: 'none',
        snap: 'frame',
        onUpdate: render,
      })
      .to(playhead, {
        frame: 0,
        duration: 1,
        ease: 'none',
        snap: 'frame',
        onUpdate: render,
      });

    const title = titleRef.current;
    if (title && !prefersReducedMotion()) {
      gsap.set(title, { opacity: 1, y: 0, scale: 1 });
      timeline.to(
        title,
        {
          y: '-115vh',
          opacity: 0,
          scale: 0.88,
          ease: 'none',
          duration: 2,
        },
        0
      );
    }

    const resizeObserver = new ResizeObserver(() => setCanvasSize());
    resizeObserver.observe(canvas);
    window.addEventListener('resize', setCanvasSize);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('resize', setCanvasSize);
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [frames]);

  useLayoutEffect(() => {
    const hint = scrollHintRef.current;
    if (!hint) return;

    if (prefersReducedMotion()) {
      gsap.set(hint, { clearProps: 'all' });
      return;
    }

    gsap.set(hint, { opacity: 0, y: 28 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(hint, { opacity: 1, y: 0, duration: 0.75 }, 0.1);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-transparent">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-5%,rgba(180,40,40,0.16),transparent_42%),radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_26%),linear-gradient(180deg,#0b0b0e_0%,#050506_55%,#020203_100%)]" />
        <div className="canvas-shell absolute inset-0 z-10">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        {/* Bottom blur + page-bg tint: sits under corner cards (z-35), matches body/--bg below fold */}
        <div className="hero-bottom-vignette pointer-events-none absolute inset-x-0 bottom-0 z-[32]" aria-hidden />

        {/* Wordmark sits above the canvas; top fade mask lets the car read through */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-4 pb-2 pt-20 drop-shadow-[0_2px_28px_rgba(0,0,0,0.5)] sm:px-6 sm:pt-24 md:px-8 md:pt-24 lg:px-10 lg:pt-28 xl:px-12">
          <h1
            ref={titleRef}
            className={`hero-wordmark font-bold ${heroWordmarkFont.className} w-full max-w-7xl text-center will-change-transform`}
          >
            Experience Luxury
          </h1>
        </div>

        <div className="pointer-events-none absolute bottom-6 right-[5%] z-[35] origin-bottom-right scale-[1.1] -translate-x-[5px] translate-y-[16px] sm:bottom-8 md:bottom-10 lg:bottom-12">
          <div ref={scrollHintRef} className="will-change-transform">
            <div className="hero-scroll-hint-card w-fit max-w-[min(18rem,calc(100vw-2.5rem))] rounded-[1.35rem] p-[3px]">
              <div className="hero-scroll-hint-card__inner flex min-h-[3.5rem] items-center justify-center rounded-[1rem] px-5 py-3.5 sm:min-h-[3.75rem] sm:px-6 sm:py-4">
                <p className="text-center text-[0.9375rem] font-medium leading-snug tracking-wide text-white/92 sm:text-base">
                  Scroll down
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
