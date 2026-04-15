import Image from 'next/image';

/** Logo file in `public/favicon.ico` (served as `/favicon.ico`). */
export const EXOVARA_LOGO_SRC = '/favicon.ico';

type Props = {
  /** Display height/width in px (square box; image uses object-contain). */
  size?: number;
  priority?: boolean;
  className?: string;
  src?: string;
};

export default function ExovaraLogo({ size = 36, priority = false, className = '', src = EXOVARA_LOGO_SRC }: Props) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/12 bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="object-contain p-1"
        sizes={`${size}px`}
      />
    </span>
  );
}
