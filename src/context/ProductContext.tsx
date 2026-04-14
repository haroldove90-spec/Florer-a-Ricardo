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
  isSpecial?: boolean;
};

type ProductContextType = {
  products: Product[];
  categories: string[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>, mainImageFile?: File, secondaryImageFiles?: File[]) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>, mainImageFile?: File, secondaryImageFiles?: File[]) => Promise<void>;
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
        category: p.category,
        isSpecial: p.is_special || false
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
      setCategories([...new Set(data.map((c: any) => c.name.trim()))]);
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

  const uploadImage = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const addProduct = async (product: Omit<Product, 'id'>, mainImageFile?: File, secondaryImageFiles?: File[]) => {
    let mainImageUrl = product.image;
    let secondaryImageUrls = (product.secondaryImages || []).filter(url => !url.startsWith('blob:'));

    // Upload main image if it's a file
    if (mainImageFile) {
      mainImageUrl = await uploadImage(mainImageFile, 'products');
    }

    // Upload secondary images if they are files
    if (secondaryImageFiles && secondaryImageFiles.length > 0) {
      const uploadedUrls = await Promise.all(
        secondaryImageFiles.map(file => uploadImage(file, 'products'))
      );
      secondaryImageUrls = [...secondaryImageUrls, ...uploadedUrls];
    }

    const { error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: product.price,
        image: mainImageUrl,
        secondary_images: secondaryImageUrls,
        category: product.category,
        is_special: product.isSpecial || false
      }]);

    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
    
    await fetchProducts();
  };

  const updateProduct = async (id: number, product: Partial<Product>, mainImageFile?: File, secondaryImageFiles?: File[]) => {
    let mainImageUrl = product.image;
    let secondaryImageUrls = (product.secondaryImages || []).filter(url => !url.startsWith('blob:'));

    // Upload main image if it's a file
    if (mainImageFile) {
      mainImageUrl = await uploadImage(mainImageFile, 'products');
    }

    // Upload secondary images if they are files
    if (secondaryImageFiles && secondaryImageFiles.length > 0) {
      const uploadedUrls = await Promise.all(
        secondaryImageFiles.map(file => uploadImage(file, 'products'))
      );
      secondaryImageUrls = [...secondaryImageUrls, ...uploadedUrls];
    }

    const { error } = await supabase
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        image: mainImageUrl,
        secondary_images: secondaryImageUrls,
        category: product.category,
        is_special: product.isSpecial ?? false
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
    
    await fetchProducts();
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

    await fetchProducts();
  };

  const addCategory = async (category: string) => {
    const trimmedCategory = category.trim();
    if (!trimmedCategory) return;
    
    const { error } = await supabase
      .from('categories')
      .insert([{ name: trimmedCategory }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return;
      }
      console.error('Error adding category:', error);
      throw error;
    }

    await fetchCategories();
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

    await fetchCategories();
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      categories, 
      loading,
      addProduct, 
      updateProduct,
      deleteProducts, 
      addCategory, 
      deleteCategory 
    }}>
      {children}
    </ProductContext.Provider>
  );
};
