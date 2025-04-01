// src/app/blog/blog-content.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/contentful';

interface BlogContentProps {
  initialArticles: Article[];
  initialSelectedArticleId?: string | null;
}

export default function BlogContent({ initialArticles }: BlogContentProps) {
  const [articles] = useState<Article[]>(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('General');

  const filteredArticles = selectedCategory === 'General'
    ? articles
    : articles.filter((article) => article.category === selectedCategory);

  const categories = ['General', 'Acheteur', 'Vendeur', 'Investisseur'];

  const CategorySelector = () => (
    <div className="flex flex-col space-y-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`text-left py-2 px-4 rounded transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedCategory(category);
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );

  const ArticleCard = ({ article }: { article: Article }) => (
    <article className="bg-white border border-blue-600 rounded-lg p-6 transition-shadow duration-300 hover:shadow-md">
      <h2 className="text-2xl font-serif font-semibold mb-2">
        <Link
          href={`/actualites/${article.id}`}
          className="text-gray-800 hover:text-blue-600 transition-colors"
        >
          {article.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          Par {article.author} | {article.date}
        </span>
        <Link
          href={`/actualites/${article.id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
        >
          Lire la suite →
        </Link>
      </div>
    </article>
  );

  const ArticleList = () => (
    <div className="space-y-6">
      {filteredArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center text-gray-800">
          Actualités
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-800">
                Catégories
              </h2>
              <CategorySelector />
            </div>
          </aside>
          <main className="lg:w-3/4">
            <ArticleList /> {/* This now only contains links to individual pages */}
          </main>
        </div>
      </div>
    </div>
  );
}