import ExovaraLogo from '@/components/ExovaraLogo';

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#030304]/90">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <ExovaraLogo size={40} />
              <span className="text-lg font-semibold tracking-[-0.02em] text-white">Exovara Labs</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              We design and ship premium marketing sites, launch experiences, and product storytelling for teams who care how
              their brand feels in the browser — performance-first, built on modern web tooling.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/35">Based in the United States · Remote-friendly</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">Navigate</p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a href="#capabilities" className="transition-colors hover:text-red-400">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#process" className="transition-colors hover:text-red-400">
                  Process
                </a>
              </li>
              <li>
                <a
                  href="https://exovaralabs.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">Connect</p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="https://exovaralabs.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-400"
                >
                  Contact & project inquiries
                </a>
              </li>
              <li>
                <a
                  href="https://exovaralabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-400"
                >
                  exovaralabs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Exovara Labs. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-xs text-white/40">
            <a href="https://exovaralabs.com/privacy" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-400">
              Privacy
            </a>
            <a href="https://exovaralabs.com/terms" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-400">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
