import { SiteLink as Link } from "./site-link";
import { siteUrl } from "./site-seo";
import { StructuredData } from "./structured-data";

type Breadcrumb = { name: string; path: string };

/** Visible navigation and structured data always describe the same trail. */
export function Breadcrumbs({ items, className }: { items: Breadcrumb[]; className: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
  return <>
    <nav aria-label="Breadcrumb" className={className}><ol>
      {items.map((item, index) => <li key={item.path}>
        {index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}
      </li>)}
    </ol></nav>
    <StructuredData value={schema} />
  </>;
}
