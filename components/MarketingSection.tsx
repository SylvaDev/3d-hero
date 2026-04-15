'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function MarketingSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-animate="marketing"]'));
      if (items.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
        return;
      }

      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 88 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'top 68%',
              scrub: 0.75,
            },
          }
        );
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <section id="capabilities" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 pb-8 pt-12 md:px-10 md:pt-14">
        <div className="flex flex-col gap-8">
          <div
            data-animate="marketing"
            className="flex flex-wrap items-center justify-between gap-4 will-change-transform"
          >
            <div className="glass neo-lift-sm inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/85">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_22px_rgba(239,68,68,0.9),inset_0_1px_0_rgba(255,255,255,0.35)]" />
              Premium launch experiences
            </div>
            <div className="glass neo-lift-sm inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/65">
              Exovara Labs
            </div>
          </div>

          <div
            data-animate="marketing"
            className="glass-strong neo-lift mx-auto w-full max-w-4xl rounded-[2rem] p-6 will-change-transform md:p-8 lg:p-10"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
              <div className="min-w-0 flex-1 lg:max-w-[42%]">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Why teams hire Exovara</p>
                <h3 className="text-depth mt-3 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                  Get a site with this level of craft — built for your brand, not a template.
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65 md:text-[15px]">
                  This experience is the kind of work we ship: cinematic motion, disciplined performance, and a sales-ready story
                  that converts attention into qualified conversations.
                </p>
              </div>

              <div className="min-w-0 flex-1 space-y-3 text-sm leading-6 text-white/78">
                <div className="neo-inset flex items-start gap-3 rounded-xl px-3 py-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500/90 shadow-[0_0_14px_rgba(239,68,68,0.45)]" />
                  <span>
                    <strong className="font-medium text-white/92">Scroll-led storytelling</strong>
                    <span className="text-white/70">
                      {' '}
                      — Frame sequences, scrubbed reveals, and motion design that feel premium without bloating the page.
                    </span>
                  </span>
                </div>
                <div className="neo-inset flex items-start gap-3 rounded-xl px-3 py-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500/90 shadow-[0_0_14px_rgba(239,68,68,0.45)]" />
                  <span>
                    <strong className="font-medium text-white/92">Built to sell</strong>
                    <span className="text-white/70">
                      {' '}
                      — Layout, typography, and CTAs aligned to your funnel: launches, demos, waitlists, and lead capture.
                    </span>
                  </span>
                </div>
                <div className="neo-inset flex items-start gap-3 rounded-xl px-3 py-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500/90 shadow-[0_0_14px_rgba(239,68,68,0.45)]" />
                  <span>
                    <strong className="font-medium text-white/92">Shipped as a real product</strong>
                    <span className="text-white/70">
                      {' '}
                      — Modern Next.js delivery you can extend with your team, plus a partner who scopes from idea to production.
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <p className="text-sm leading-6 text-white/60">
                Ready to explore a build like this for your next release?{' '}
                <span className="text-white/85">Tell us what you are launching — we will follow up with scope, timeline, and pricing.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 pt-2 md:px-10 md:pb-20">
        <div
          data-animate="marketing"
          className="section-neo-frame overflow-hidden p-6 will-change-transform md:p-10 lg:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.42em] text-white/45">Exovara Labs</p>
            <h2 className="text-depth mt-4 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
              Start your project with Exovara Labs
            </h2>
            <p className="mt-5 text-base leading-7 text-white/68">
              Share your launch, audience, and timeline — we will reply with a clear next step.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="https://exovaralabs.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-lift inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_28px_rgba(220,38,38,0.35)] transition-[box-shadow,transform,background-color] duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-red-500"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
