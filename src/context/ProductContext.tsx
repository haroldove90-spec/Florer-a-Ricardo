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
    try {
      const [categoriesRes, homeCatsRes] = await Promise.all([
        supabase
          .from('categories')
          .select('name')
          .order('name', { ascending: true }),
        supabase
          .from('home_categories_config')
          .select('name')
          .order('display_order', { ascending: true })
      ]);

      if (categoriesRes.error) throw categoriesRes.error;
      
      const catNames = categoriesRes.data ? categoriesRes.data.map((c: any) => c.name.trim()) : [];
      const homeCatNames = homeCatsRes.data ? homeCatsRes.data.map((c: any) => c.name.trim()) : [];
      
      // Merge and remove duplicates, filter out empty strings and "Galería"
      const allNames = [...catNames, ...homeCatNames]
        .filter(name => name && name !== 'Galería');
        
      setCategories([...new Set(allNames)].sort());
    } catch (error) {
      console.error('Error fetching categories:', error);
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

    const homeCategoriesSubscription = supabase
      .channel('home-categories-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'home_categories_config' } as any, () => {
        fetchCategories();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productsSubscription);
      supabase.removeChannel(categoriesSubscription);
      supabase.removeChannel(homeCategoriesSubscription);
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
    try {
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

      const updateData: any = {};
      if (product.name !== undefined) updateData.name = product.name.trim();
      if (product.description !== undefined) updateData.description = product.description;
      if (product.price !== undefined) updateData.price = product.price;
      if (mainImageUrl !== undefined) updateData.image = mainImageUrl;
      if (secondaryImageUrls !== undefined) updateData.secondary_images = secondaryImageUrls;
      if (product.category !== undefined) updateData.category = product.category;
      if (product.isSpecial !== undefined) updateData.is_special = product.isSpecial;

      // Filter out keys with undefined values just in case
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      await fetchProducts();
    } catch (error) {
      console.error('Error in updateProduct:', error);
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

    await fetchProducts();
  };

  const addCategory = async (category: string) => {
    const trimmedCategory = category.trim();
    if (!trimmedCategory) return;
    
    // First, check if it already exists in categories to avoid redundant inserts
    const { data: existingCat } = await supabase
      .from('categories')
      .select('name')
      .eq('name', trimmedCategory)
      .single();

    if (!existingCat) {
      const { error: catError } = await supabase
        .from('categories')
        .insert([{ name: trimmedCategory }]);

      if (catError && catError.code !== '23505') {
        console.error('Error adding to categories:', catError);
        throw catError;
      }
    }

    // Now check and add to home_categories_config for display on Home
    const { data: existingHomeCat } = await supabase
      .from('home_categories_config')
      .select('name')
      .eq('name', trimmedCategory)
      .single();

    if (!existingHomeCat) {
      // Get the current max display_order
      const { data: maxOrderData } = await supabase
        .from('home_categories_config')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);
      
      const nextOrder = maxOrderData && maxOrderData.length > 0 ? (maxOrderData[0].display_order + 1) : 0;

      const { error: homeCatError } = await supabase
        .from('home_categories_config')
        .insert([{ 
          name: trimmedCategory,
          desc: `Descubre nuestra colección de ${trimmedCategory}.`,
          image: 'https://images.unsplash.com/photo-1522673607200-164848d79c65?q=80&w=2072&auto=format&fit=crop', // Default beautiful placeholder
          display_order: nextOrder
        }]);

      if (homeCatError && homeCatError.code !== '23505') {
        console.error('Error adding to home_categories_config:', homeCatError);
        throw homeCatError;
      }
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
