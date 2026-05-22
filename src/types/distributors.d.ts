interface Distributor {
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    whatsapp: string;
    keyword: string;
    lat: number;
    lng: number;
    createdAt: string;
    updatedAt: string;
}

interface DistributorFormValues {
    name: string;
    city: string;
    address: string;
    phone: string;
    whatsapp: string;
    keyword: string;
    lat: number;
    lng: number;
}