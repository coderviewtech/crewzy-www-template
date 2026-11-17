/** Escape script delimiters even when future content includes literal HTML. */
export function StructuredData({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(value).replace(/</g, "\\u003c"),
  }} />;
}
