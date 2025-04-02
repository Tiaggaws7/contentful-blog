import Link from "next/link";
import { Article } from "@/lib/contentful";

interface BlogContentProps {
  initialArticles: Article[];
  currentCategory: string;
}

export default function BlogContent({ initialArticles, currentCategory }: BlogContentProps) {
  const categories = ["General", "Acheteur", "Vendeur", "Investisseur"];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-5xl font-serif font-bold mb-12 text-center text-gray-800">
          Actualités
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-800">
                Catégories
              </h2>
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={category === "General" ? "/" : `/?category=${category}`}
                    className={`block py-2 px-4 rounded transition-colors ${
                      currentCategory === category
                        ? "bg-[#D90115] text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Articles List */}
          <main className="lg:w-3/4">
            <div className="space-y-6">
              {initialArticles.map((article) => (
                <article key={article.id} className="bg-white border border-[#D90115] rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-serif font-semibold mb-2">
                    <Link href={`/${article.id}`} className="text-gray-800 hover:text-[#D90115] transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Par {article.author} | {article.date}</span>
                    <Link href={`/${article.id}`} className="text-[#2C75FF] hover:text-blue-800 transition-colors font-semibold">
                      Lire la suite →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
