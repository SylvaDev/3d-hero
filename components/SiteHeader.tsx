import ExovaraLogo from '@/components/ExovaraLogo';

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.09] bg-[#050506]/82 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3.5 sm:px-6 md:px-10">
        <a
          href="https://exovaralabs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <ExovaraLogo size={36} priority className="transition-[border-color,background-color] group-hover:border-white/20 group-hover:bg-white/[0.08]" />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[-0.02em] text-white">Exovara Labs</span>
            <span className="hidden text-[0.65rem] uppercase tracking-[0.28em] text-white/45 sm:block">
              Digital product studio
            </span>
          </span>
        </a>

        <nav
          className="order-3 flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-1 border-t border-white/[0.06] pt-3 sm:order-none sm:w-auto sm:border-t-0 sm:pt-0 md:gap-1"
          aria-label="Primary"
        >
          {[
            ['Capabilities', '#capabilities'],
            ['Process', '#process'],
            ['Contact', 'https://exovaralabs.com/contact'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-red-400"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="https://exovaralabs.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="glass neo-lift-sm inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition-[transform,box-shadow,color] hover:text-red-300 motion-safe:hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
