// src/lib/contentful.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface Article {
  id: string;
  title: string;
  category: 'Acheteur' | 'Vendeur' | 'Investisseur' | 'General';
  excerpt: string;
  content: any;
  author: string;
  date: string;
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost', // Replace with your content model ID
      select: ['fields.title', 'fields.category', 'fields.excerpt', 'fields.content', 'fields.author', 'fields.date'],
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      category: item.fields.category,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      author: item.fields.author,
      date: item.fields.date,
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const entry = await contentfulClient.getEntry(id);
    
    return {
      id: entry.sys.id,
      title: entry.fields.title as string,
      category: entry.fields.category as 'Acheteur' | 'Vendeur' | 'Investisseur' | 'General',
      excerpt: entry.fields.excerpt as string,
      content: entry.fields.content,
      author: entry.fields.author as string,
      date: entry.fields.date as string,
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}