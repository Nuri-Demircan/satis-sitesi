export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    createdAt: number;
}

export interface AdminContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

export interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
    updateProduct: (id: string, product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loading: boolean;
}
