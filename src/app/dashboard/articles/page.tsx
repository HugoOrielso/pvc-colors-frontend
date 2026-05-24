import { ArticlesList } from "@/components/articles/ArticlesList";

export const metadata = {
    title: "Artículos",
    description: "Lista de todas los artículos registrados",
};

export default function Page() {
    return <ArticlesList />;
}