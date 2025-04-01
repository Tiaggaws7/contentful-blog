// src/app/blog/page.tsx
import { Metadata } from 'next';
import { getArticles } from '@/lib/contentful';
import BlogContent from './blog-content';

// This enables static generation with dynamic content
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Actualités Immobilières | Elise Buil Immobilier',
  description: 'Découvrez les dernières actualités et conseils en immobilier en Guadeloupe. Suivez les tendances du marché et nos recommandations.',
  keywords: 'actualités immobilières, marché immobilier Guadeloupe, conseils immobilier, achat, vente',
  authors: [{ name: 'Elise Buil' }],
  alternates: {
    canonical: 'https://elisebuilimmobilierguadeloupe.com/blog/actualites',
  },
};

export default async function BlogPage() {
  const articles = await getArticles();
  return <BlogContent initialArticles={articles} />;
}