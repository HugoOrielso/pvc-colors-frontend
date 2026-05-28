interface ProductRecommendationImage {
    id: string;
    url: string;
    alt?: string | null;
    isMain: boolean;
    position: number;
}

interface ProductRecommendationPresentation {
    id: string;
    name: string;
    price: number;
    stock: number;
}

interface ProductRecommendationLine {
    id: string;
    name: string;
    slug: string;
}

interface ProductRecommendation {
    id: string;
    slug: string;
    name: string;
    description: string;
    image?: string | null;

    productLine: ProductRecommendationLine;

    images: ProductRecommendationImage[];

    presentations: ProductRecommendationPresentation[];
}

interface ProductRecommendationsResponse {
    type: "BEST_SELLERS" | "RANDOM_PRODUCTS";
    total: number;
    products: ProductRecommendation[];
}