import MagicFormsDemo from "./index";

/**
 * The Magic Forms demo with a text equivalent: the stage itself is a picture,
 * so screen readers get the story in one sentence instead.
 */
export function MagicFormsFigure({ className }: { className?: string }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div aria-hidden="true">
        <MagicFormsDemo />
      </div>
      <figcaption className="sr-only">
        In the Magic Forms builder, a Company size choice field is added to a
        lead capture form and its share link is copied. A submission from
        Ananya Rao then arrives in the Submissions list, and the
        submission.created webhook is delivered with a 200 response.
      </figcaption>
    </figure>
  );
}
