import MagicRewardDemo from "./index";

/**
 * The Magic Reward demo with a text equivalent: the stage itself is a
 * picture, so screen readers get the story in one sentence instead.
 */
export function MagicRewardFigure({ className }: { className?: string }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div aria-hidden="true">
        <MagicRewardDemo />
      </div>
      <figcaption className="sr-only">
        A customer at a café taps Spin on a prize wheel on their phone and
        wins 20% off. The win lands at the top of the café&rsquo;s Magic Reward
        live dashboard, and the day&rsquo;s plays count rolls from 128 to 129.
      </figcaption>
    </figure>
  );
}
