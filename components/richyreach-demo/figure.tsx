import RichyReachDemo from "./index";

/**
 * The RichyReach demo with a text equivalent: the stage itself is a picture,
 * so screen readers get the story in one sentence instead.
 */
export function RichyReachFigure({ className }: { className?: string }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div aria-hidden="true">
        <RichyReachDemo />
      </div>
      <figcaption className="sr-only">
        A brand reviews a creator&rsquo;s reel on RichyReach with ₹40,000
        already held in escrow, approves it, and the escrow is released; the
        creator&rsquo;s phone shows a Payment released notification for the
        ₹40,000.
      </figcaption>
    </figure>
  );
}
