import MagicAgentDemo from "./index";

/**
 * The Magic Agent demo with a text equivalent: the stage itself is a picture,
 * so screen readers get the story in one sentence instead.
 */
export function MagicAgentFigure({ className }: { className?: string }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div aria-hidden="true">
        <MagicAgentDemo />
      </div>
      <figcaption className="sr-only">
        A customer asks a print shop on WhatsApp for 500 printed tote bags.
        Magic Agent asks how many print colours and the deadline, answers the
        lead time from the shop&rsquo;s delivery policy, and the enquiry on the
        dashboard fills in field by field until it reads Ready to price.
      </figcaption>
    </figure>
  );
}
