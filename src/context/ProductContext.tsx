import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  secondaryImages?: string[];
  description: string;
  category?: string;
};

type ProductContextType = {
  products: Product[];
  categories: string[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProducts: (ids: number[]) => Promise<void>;
  addCategory: (category: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      const formattedProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        secondaryImages: p.secondary_images || [],
        description: p.description,
        category: p.category
      }));
      setProducts(formattedProducts);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data.map((c: any) => c.name));
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };

    initializeData();

    // Set up real-time subscriptions
    const productsSubscription = supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' } as any, () => {
        fetchProducts();
      })
      .subscribe();

    const categoriesSubscription = supabase
      .channel('categories-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' } as any, () => {
        fetchCategories();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productsSubscription);
      supabase.removeChannel(categoriesSubscription);
    };
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        secondary_images: product.secondaryImages,
        category: product.category
      }]);

    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const deleteProducts = async (ids: number[]) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Error deleting products:', error);
      throw error;
    }
  };

  const addCategory = async (category: string) => {
    const { error } = await supabase
      .from('categories')
      .insert([{ name: category }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return;
      }
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const deleteCategory = async (category: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('name', category);

    if (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      categories, 
      loading,
      addProduct, 
      deleteProducts, 
      addCategory, 
      deleteCategory 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
