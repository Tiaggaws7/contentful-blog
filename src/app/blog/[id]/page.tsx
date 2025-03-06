// src/app/blog/[id]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleById, getArticles } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export const revalidate = 3600; // Revalidate every hour

// 1. Generate static paths at build time
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

// 2. Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Await params before accessing its properties
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return {
      title: 'Article non trouvé | Elise Buil Immobilier',
    };
  }

  return {
    title: `${article.title} | Elise Buil Immobilier`,
    description: article.excerpt,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://elisebuilimmobilierguadeloupe.com/blog/${id}`,
    },
  };
}

// 3. Main page component
export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  // Await params before accessing its properties
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound(); // Render the 404 page if the article doesn't exist
  }

  const richTextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className="text-gray-700 mb-4">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
        <h1 className="text-3xl font-bold mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
        <h2 className="text-2xl font-semibold mb-3">{children}</h2>
      ),
    },
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="font-bold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => (
        <em className="italic">{text}</em>
      ),
    },
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white border border-gray-200 rounded-lg p-8">
          <h1 className="text-4xl font-serif font-bold mb-4 text-gray-800">
            {article.title}
          </h1>
          <div className="text-sm text-gray-500 mb-6">
            <span>Par {article.author}</span>
            <span className="mx-2">|</span>
            <span>{article.date}</span>
          </div>
          <div className="prose max-w-none mb-8">
            {documentToReactComponents(article.content, richTextOptions)}
          </div>
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            ← Retour à tous les articles
          </Link>
        </article>
      </div>
    </div>
  );
}