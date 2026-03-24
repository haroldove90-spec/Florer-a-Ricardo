import React, { createContext, useContext, useState } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  category?: string;
};

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Ramo de 24 Rosas Rojas",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1548610762-7c6abc25c28e?q=80&w=2072&auto=format&fit=crop",
    description: "Un ramo clásico y elegante de 24 rosas rojas frescas de tallo largo. El símbolo perfecto del amor y la pasión, presentado con follaje decorativo y papel de seda.",
    category: "Rosas Rojas"
  },
  {
    id: 2,
    name: "Arreglo de Tulipanes Holandeses",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1520323232427-6b620030f124?q=80&w=2070&auto=format&fit=crop",
    description: "Hermoso arreglo de 15 tulipanes de colores variados en un jarrón de cristal. Aporta frescura y alegría a cualquier espacio con su elegancia natural.",
    category: "Tulipanes"
  },
  {
    id: 3,
    name: "Caja de Rosas y Orquídeas",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1519340241574-2dec3963672a?q=80&w=2070&auto=format&fit=crop",
    description: "Una combinación sofisticada de rosas premium y orquídeas en una caja de lujo. Ideal para aniversarios o momentos inolvidables.",
    category: "Ocasiones Especiales"
  },
  {
    id: 4,
    name: "Arreglo Mixto 'Primavera'",
    price: 40.00,
    image: "https://images.unsplash.com/photo-1523694559144-4ec08b9e114c?q=80&w=2070&auto=format&fit=crop",
    description: "Un vibrante arreglo que combina flores de temporada como gerberas, lirios y margaritas. Lleno de color y vida para cualquier ocasión.",
    category: "Arreglos Mixtos"
  },
  {
    id: 5,
    name: "Orquídea Phalaenopsis Blanca",
    price: 50.00,
    image: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?q=80&w=2043&auto=format&fit=crop",
    description: "Elegante orquídea blanca de dos varas en maceta decorativa. Un regalo duradero que simboliza pureza y sofisticación.",
    category: "Ocasiones Especiales"
  },
  {
    id: 6,
    name: "Ramo de Girasoles Brillantes",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=2070&auto=format&fit=crop",
    description: "Un ramo alegre de 10 girasoles grandes que irradian luz y energía. Perfecto para desear un buen día o celebrar un logro.",
    category: "Arreglos Mixtos"
  },
  {
    id: 7,
    name: "Arreglo de Lirios Aromáticos",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?q=80&w=2070&auto=format&fit=crop",
    description: "Lirios blancos y rosados con un aroma embriagador. Presentados en un jarrón minimalista para resaltar su belleza natural.",
    category: "Arreglos Mixtos"
  },
  {
    id: 8,
    name: "Canasta de Flores Silvestres",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2080&auto=format&fit=crop",
    description: "Una encantadora canasta rústica llena de flores silvestres y follaje verde. Evoca la frescura de un jardín en plena floración.",
    category: "Ocasiones Especiales"
  }
];

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
