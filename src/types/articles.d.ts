interface Article {
    id: string;
    title: string;
    markdown: string;
    createdAt: string;
    updatedAt: string;
}

interface ArticleFormValues {
    title: string;
    markdown: string;
}
