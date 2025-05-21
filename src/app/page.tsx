import { Metadata } from "next";
import { getArticles } from "@/lib/contentful";
import BlogContent from "./blog-content";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Actualités Immobilières | Elise Buil Immobilier",
  description: "Découvrez les dernières actualités et conseils en immobilier en Guadeloupe. Suivez les tendances du marché et nos recommandations.",
  keywords: "actualités immobilières, marché immobilier Guadeloupe, conseils immobilier, achat, vente",
  authors: [{ name: "Elise Buil" }],
  alternates: {
    canonical: "https://blog.elisebuilimmobilierguadeloupe.com/",
  },
};

// Update the component props to match Next.js App Router expectations
export default async function BlogPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams before accessing its properties
  const searchParams = await props.searchParams;
  
  // Extract category safely, handling both string and array cases
  const categoryParam = searchParams.category;
  const category = typeof categoryParam === 'string' 
    ? categoryParam 
    : Array.isArray(categoryParam) 
      ? categoryParam[0] 
      : "General"; // Default to "General"
  
  const allArticles = await getArticles();

  // Filter articles based on category
  const filteredArticles = category === "General"
    ? allArticles
    : allArticles.filter((article) => article.category === category);

  return <BlogContent initialArticles={filteredArticles} currentCategory={category} />;
}