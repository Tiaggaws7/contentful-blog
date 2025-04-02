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

export default async function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category || "General"; // Default to "General"
  const allArticles = await getArticles();

  // Filter articles **on the server** before passing to BlogContent
  const filteredArticles = category === "General"
    ? allArticles
    : allArticles.filter((article) => article.category === category);

  return <BlogContent initialArticles={filteredArticles} currentCategory={category} />;
}
