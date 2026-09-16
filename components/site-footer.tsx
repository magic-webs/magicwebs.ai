import Link from "next/link";
import { Brandmark } from "@/components/brandmark";
import { company, navLinks, platforms } from "@/lib/site";

const footLink =
  "font-mono text-sm leading-relaxed text-secondary no-underline transition-colors duration-150 ease-standard hover:text-ink hover:underline hover:underline-offset-[3px]";

function FootHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 font-mono text-xs tracking-wider text-faint uppercase">
      {children}
    </h2>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto mt-[clamp(4rem,10vh,7rem)] w-full max-w-site border-t border-line px-(--gutter) pt-[clamp(1.75rem,3vh,2.5rem)] pb-8">
      <div className="mb-[clamp(1.5rem,3vh,2rem)] grid grid-cols-1 gap-8 border-b border-line pb-[clamp(2rem,4vh,3rem)] sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Brandmark />
          <p className="m-0 max-w-[34ch] font-mono text-sm leading-relaxed text-muted">
            {company.legalName}. Automation software for businesses that would
            rather not answer the same question twice.
          </p>
          <p className="m-0 font-mono text-xs text-faint">{company.note}</p>
        </div>

        <div className="flex flex-col gap-4">
          <FootHead>Platforms</FootHead>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {platforms.map((p) => (
              <li key={p.slug}>
                <Link className={footLink} href={`/platforms/${p.slug}`}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <FootHead>Company</FootHead>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link className={footLink} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className={footLink} href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <FootHead>Get in touch</FootHead>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li>
              <a className={footLink} href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              <a className={footLink} href={`tel:${company.phoneHref}`}>
                {company.phone}
              </a>
            </li>
            <li className="font-mono text-sm leading-relaxed text-muted">
              {company.hours}
            </li>
          </ul>
          <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
            {company.social.map((s) => (
              <li key={s.label}>
                <a
                  className={footLink}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted">
        <span>
          © {year} {company.legalName}
        </span>
        <div className="flex flex-wrap gap-4">
          {company.offices.map((o) => (
            <span key={o.label}>{o.label}</span>
          ))}
          <Link
            className="no-underline hover:underline hover:underline-offset-[3px]"
            href="/privacy"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
