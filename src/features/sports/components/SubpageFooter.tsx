/**
 * Thin footer section for sport subpages. Wraps ReturnLink in a centred
 * section with consistent vertical padding. Rendered conditionally by
 * SportPageLayout when a `footerLabel` prop is provided.
 */
import ReturnLink from "@/components/ui/ReturnLink";

type SubpageFooterProps = {
  label: string;
  outlineColor: string;
  hoverColor: string;
  isDark?: boolean;
};

export default function SubpageFooter({ label, outlineColor, hoverColor, isDark = true }: SubpageFooterProps) {
  return (
    <section className="py-24 px-6 text-center">
      <ReturnLink label={label} outlineColor={outlineColor} hoverColor={hoverColor} isDark={isDark} />
    </section>
  );
}
