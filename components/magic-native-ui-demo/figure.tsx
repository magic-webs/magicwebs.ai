import MagicNativeUiDemo from "./index";

/**
 * The Magic Native UI demo with a text equivalent: the stage itself is a
 * picture, so screen readers get the story in one sentence instead.
 */
export function MagicNativeUiFigure({ className }: { className?: string }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div aria-hidden="true">
        <MagicNativeUiDemo />
      </div>
      <figcaption className="sr-only">
        A terminal runs npx magic-native-ui add dialog, which writes
        components/ui/dialog.tsx into the project. The same Delete project
        dialog then opens, identical, on an iPhone and an Android phone.
      </figcaption>
    </figure>
  );
}
