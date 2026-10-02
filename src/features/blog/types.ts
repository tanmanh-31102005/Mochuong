export interface BlogSeoConfig {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  author: string;
  status: "draft" | "published";
  seo: BlogSeoConfig;
}
