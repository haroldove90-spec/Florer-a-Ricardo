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
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvpbPt9J3nR4KlXv2McMmf_vr5ACVwnX-N7cbU5MZ_1gp-LRUOej8-tatF1VPpbber1YxPGhtJ4dt6XIykhWvxGinQXAQREuHSyx2xqXgysYCbHsjtyUT90Zc",
    description: "Un ramo clásico y elegante de 24 rosas rojas frescas de tallo largo. El símbolo perfecto del amor y la pasión, presentado con follaje decorativo y papel de seda.",
    category: "Rosas Rojas"
  },
  {
    id: 2,
    name: "Arreglo de Tulipanes Holandeses",
    price: 35.00,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTs-t4cqNQqucnnbmhhiPDh1hbrq08YCtTnOVeKATLr5LJC3lBkfje4SsbLLfLTSWDf88At9_7LKWjm7srBVQZuybs0HEHDCB9TWf8op0uQcc-7qY1dJIUSOXo",
    description: "Hermoso arreglo de 15 tulipanes de colores variados en un jarrón de cristal. Aporta frescura y alegría a cualquier espacio con su elegancia natural.",
    category: "Tulipanes"
  },
  {
    id: 3,
    name: "Caja de Rosas y Orquídeas",
    price: 65.00,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpnK5BsbPHzYIr8eXEWhrV2AWhCpVVT0FMwCkBLuaJmmN3pHsj43jU7xZs7mglmWoaI2GuBkjXUSFQ1AH2MzZtRKW1soe2Eovm5iPgNXG3T_qh8759n1VaBQ",
    description: "Una combinación sofisticada de rosas premium y orquídeas en una caja de lujo. Ideal para aniversarios o momentos inolvidables.",
    category: "Ocasiones Especiales"
  },
  {
    id: 4,
    name: "Arreglo Mixto 'Primavera'",
    price: 40.00,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpnK5BsbPHzYIr8eXEWhrV2AWhCpVVT0FMwCkBLuaJmmN3pHsj43jU7xZs7mglmWoaI2GuBkjXUSFQ1AH2MzZtRKW1soe2Eovm5iPgNXG3T_qh8759n1VaBQ",
    description: "Un vibrante arreglo que combina flores de temporada como gerberas, lirios y margaritas. Lleno de color y vida para cualquier ocasión.",
    category: "Arreglos Mixtos"
  },
  {
    id: 5,
    name: "Orquídea Phalaenopsis Blanca",
    price: 50.00,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTm9PBzvZPvfwyUapJHReFnWx47ImRmfj66HlJn5DVRh3m1ljPdlKxG8IMiKv3NSm2wHPVxqKvZujtvx-I7D4E1kCUWHUkoc361ACagsH5tC9gQntNJV9yF3w",
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
  },
  {
    id: 9,
    name: "Arreglo de Rosas en Caja de Terciopelo",
    price: 85.00,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSJ4YWuFqLKrPpSlUgLC5yi-J5IkFKFhF3jcW1h21CkDnUUjVmQi8AvwdNNrrmTzqas2gvXEC4UbP_ZMLVR5SMxHTGP5K7Fm2dcviaHclJjZUorRjH7S1TOpZw",
    description: "Un arreglo de lujo con rosas seleccionadas en una elegante caja de terciopelo negro. El regalo definitivo para impresionar.",
    category: "Selección Especial"
  },
  {
    id: 10,
    name: "Ramo de Tulipanes y Girasoles",
    price: 48.00,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvpbPt9J3nR4KlXv2McMmf_vr5ACVwnX-N7cbU5MZ_1gp-LRUOej8-tatF1VPpbber1YxPGhtJ4dt6XIykhWvxGinQXAQREuHSyx2xqXgysYCbHsjtyUT90Zc",
    description: "Una combinación vibrante de tulipanes amarillos y girasoles frescos que iluminarán cualquier habitación.",
    category: "Selección Especial"
  },
  {
    id: 11,
    name: "Cesta de Rosas y Frutas",
    price: 72.00,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT8briO2NNW6b3Fbn5uBP8t5haTegazaQNwSfLl3ycGP5XR6K5RJaZ9-CGsvgZY91zp7FTWqVQec_5pkizVGu06wwmfXRrZKjOfrIja7CmnjKLN0Rd9mEJ4",
    description: "Una cesta artesanal que combina la belleza de las rosas con una selección de frutas frescas de temporada.",
    category: "Selección Especial"
  },
  {
    id: 12,
    name: "Arreglo Floral 'Corazón de Rosas'",
    price: 95.00,
    image: "https://dovanapataki.com/wp-content/uploads/2023/04/9.jpeg",
    description: "Un diseño romántico en forma de corazón compuesto por rosas rojas de la más alta calidad.",
    category: "Selección Especial"
  },
  {
    id: 13,
    name: "Ramo de Lirios y Rosas Blancas",
    price: 55.00,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSZFYSTTGLssq_3_WYTEKyaLgRVsVLOs2DGkjJKHq4IIEQ6qA4McsTsVxtSD5ZQMrOwauNeUCJ44yOke0CrDzyOhm4qcH44sHSkQjVNz0Y9dPF_hPAxJDs6jIlF",
    description: "Elegancia pura en un ramo de lirios y rosas blancas, ideal para expresar paz y admiración.",
    category: "Selección Especial"
  },
  {
    id: 14,
    name: "Arreglo de Orquídeas Exóticas",
    price: 110.00,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRXM0-BEfXi4b-5KkIqo8lgaXmxW4Nqa3_5hQjv0SV_Z_mEXJ5ZxvhWOCUu0u1_Lkjac17t9ZRC98BdkRev9ikRAthcEjhQH0dmrIWLdUfAge6d7TbtHjrAJg",
    description: "Una selección de orquídeas exóticas presentadas en una base de cerámica moderna. Un toque de distinción.",
    category: "Selección Especial"
  },
  {
    id: 15,
    name: "Ramo de Flores Silvestres Premium",
    price: 42.00,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSLCpgad6M6wBSYS2TMe2C5YH7tgXAVVVearfjQkv8vVXMqFyNB6zfw9m4iKJiovaiRSr6Fsvs-skbJnmZlK---1-SoNBLQZq5HXvw8TCVE8LtQXJTFmCexcA",
    description: "Flores silvestres seleccionadas a mano para crear un ramo con un aire rústico y sofisticado.",
    category: "Selección Especial"
  },
  {
    id: 16,
    name: "Caja de Rosas y Chocolates",
    price: 78.00,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTzWj5eSYk97l97w3jFKduJjQcI9lg4HGijqD2zV_e48WYxs9tRtstD_1djm6_0r0j4bZiPDNAQUZgm3VXdlk26_o6Z1g9ZEnfILTCmkM2I40cASv8KZ7p7",
    description: "El dúo perfecto: rosas frescas y una selección de chocolates gourmet en una presentación de lujo.",
    category: "Selección Especial"
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
