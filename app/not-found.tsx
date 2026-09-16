import {
  Button,
  ButtonRow,
  Container,
  Display,
  Eyebrow,
  Lede,
  SoftBreak,
} from "@/components/ui";
import { platforms } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col justify-center gap-8 py-[clamp(2rem,5vw,4rem)]">
      <Eyebrow>Error 404</Eyebrow>
      <Display className="text-[clamp(2.5rem,9vw,6rem)]">
        That page has{" "}
        <SoftBreak />
        wandered off.
      </Display>
      <Lede>The link is wrong or the page moved. Everything else is here.</Lede>

      <ButtonRow>
        <Button href="/" size="lg">
          Back home
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Contact us
        </Button>
      </ButtonRow>

      <ul className="m-0 flex list-none flex-wrap gap-3 p-0 pt-4">
        {platforms.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/platforms/${p.slug}`}
              className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-4 py-2 font-mono text-xs tracking-wide text-secondary no-underline transition-colors duration-150 ease-standard hover:border-ink hover:text-ink"
            >
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full"
                style={{ background: p.swatch }}
              />
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
