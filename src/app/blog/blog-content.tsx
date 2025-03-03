// src/app/blog/blog-content.tsx
'use client';

import { useState } from 'react';
import { Article } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

interface BlogContentProps {
  initialArticles: Article[];
}

export default function BlogContent({ initialArticles }: BlogContentProps) {
  const [articles] = useState<Article[]>(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
            setSelectedArticle(null);
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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedArticle(article);
          }}
          className="text-gray-800 hover:text-blue-600 transition-colors"
        >
          {article.title}
        </a>
      </h2>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          Par {article.author} | {article.date}
        </span>
        <button
          onClick={() => setSelectedArticle(article)}
          className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
        >
          Lire la suite →
        </button>
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

  const FullArticle = ({ article }: { article: Article }) => {
    const richTextOptions = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
          <p className="text-gray-700 mb-4">{children}</p>
        ),
        [BLOCKS.HEADING_1]: (_node: any, children: any) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        [BLOCKS.HEADING_2]: (_node: any, children: any) => (
          <h2 className="text-2xl font-semibold mb-3">{children}</h2>
        ),
      },
      renderMark: {
        [MARKS.BOLD]: (text: any) => <strong className="font-bold">{text}</strong>,
      },
    };
  
    return (
      <article className="bg-white border border-gray-200 rounded-lg p-8">
        <h1 className="text-4xl font-serif font-bold mb-4 text-gray-800">{article.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          <span>Par {article.author}</span>
          <span className="mx-2">|</span>
          <span>{article.date}</span>
        </div>
        <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
        <div className="prose max-w-none mb-8">
          {documentToReactComponents(article.content, richTextOptions)}
        </div>
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          ← Retour à tous les articles
        </button>
      </article>
    );
  };

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
            {selectedArticle ? (
              <FullArticle article={selectedArticle} />
            ) : (
              <ArticleList />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}