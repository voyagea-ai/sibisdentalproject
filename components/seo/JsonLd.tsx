/** Server component that renders a JSON-LD script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, static content built from verified fields.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
