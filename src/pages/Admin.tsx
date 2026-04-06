import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LayoutDashboard, PackagePlus, DollarSign, ShoppingBag, TrendingUp, PlusCircle, LogOut, ClipboardList, UploadCloud, X, Menu, Home, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const mockSalesData = [
  { time: '08:00', sales: 120 },
  { time: '10:00', sales: 300 },
  { time: '12:00', sales: 450 },
  { time: '14:00', sales: 200 },
  { time: '16:00', sales: 600 },
  { time: '18:00', sales: 800 },
  { time: '20:00', sales: 500 },
];

const mockCategoryData = [
  { name: 'Rosas', value: 450 },
  { name: 'Tulipanes', value: 320 },
  { name: 'Orquídeas', value: 580 },
  { name: 'Arreglos Mixtos', value: 410 },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-black shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img 
            src="https://appdesignproyectos.com/floreriaricardo.jpg" 
            alt="Florería Ricardo" 
            className="h-8 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="h-6 w-px bg-white/20"></div>
          <span className="text-xs font-bold text-white uppercase tracking-widest">Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shadow-sm border border-white/10 active:scale-90 transition-transform"
        >
          <Menu size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-50 flex flex-col p-6 overflow-hidden md:hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="flex justify-between items-center mb-12 relative z-10">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://appdesignproyectos.com/floreriaricardo.jpg" 
                  alt="Florería Ricardo" 
                  className="h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="h-8 w-px bg-white/20"></div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">Admin</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white shadow-sm border border-white/10 active:scale-90 transition-transform"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4 relative z-10">
              <Link 
                to="/admin/ventas" 
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white/5 shadow-sm border border-white/10 active:scale-95 transition-all ${location.pathname.includes('/ventas') ? 'ring-2 ring-white/20' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/ventas') ? 'bg-white text-black shadow-md shadow-white/20' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}`}>
                  <LayoutDashboard size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-white font-medium group-hover:text-gold">Ventas y Métricas</span>
              </Link>
              
              <Link 
                to="/admin/pedidos" 
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white/5 shadow-sm border border-white/10 active:scale-95 transition-all ${location.pathname.includes('/pedidos') ? 'ring-2 ring-white/20' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/pedidos') ? 'bg-white text-black shadow-md shadow-white/20' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}`}>
                  <ClipboardList size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-white font-medium group-hover:text-gold">Pedidos Recientes</span>
              </Link>
              
              <Link 
                to="/admin/productos" 
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white/5 shadow-sm border border-white/10 active:scale-95 transition-all ${location.pathname.includes('/productos') ? 'ring-2 ring-white/20' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/productos') ? 'bg-white text-black shadow-md shadow-white/20' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}`}>
                  <PackagePlus size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-white font-medium group-hover:text-gold">Gestión de Productos</span>
              </Link>

              <Link 
                to="/admin/usuarios" 
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white/5 shadow-sm border border-white/10 active:scale-95 transition-all ${location.pathname.includes('/usuarios') ? 'ring-2 ring-white/20' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/usuarios') ? 'bg-white text-black shadow-md shadow-white/20' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}`}>
                  <PlusCircle size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-white font-medium group-hover:text-gold">Gestión de Usuarios</span>
              </Link>
              
              <div className="h-px bg-white/10 my-4"></div>
              
              <Link 
                to="/" 
                className="group flex items-center space-x-4 p-4 rounded-2xl bg-white/5 shadow-sm border border-white/10 active:scale-95 transition-all" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Home size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-white/80 font-medium group-hover:text-gold">Volver a la Tienda</span>
              </Link>
            </nav>
            
            <div className="mt-auto text-center pb-8 relative z-10">
              <div className="w-16 h-[1px] bg-white/20 mx-auto rounded-full mb-6"></div>
              <p className="text-white/40 text-sm font-light uppercase tracking-widest">Panel de Administración</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-black text-white flex-col sticky top-0 h-screen z-40">
        <div className="hidden md:block p-6 border-b border-white/10">
          <img 
            src="https://appdesignproyectos.com/floreriaricardo.jpg" 
            alt="Florería Ricardo" 
            className="h-10 object-contain mb-2"
            referrerPolicy="no-referrer"
          />
          <p className="text-xs text-white/50 uppercase tracking-widest">Panel de Control</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link 
            to="/admin/ventas" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/ventas') ? 'bg-white text-black font-medium' : 'hover:bg-white/10 text-white/80 hover:text-gold'}`}
          >
            <LayoutDashboard size={20} />
            <span>Ventas y Métricas</span>
          </Link>
          <Link 
            to="/admin/pedidos" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/pedidos') ? 'bg-white text-black font-medium' : 'hover:bg-white/10 text-white/80 hover:text-gold'}`}
          >
            <ClipboardList size={20} />
            <span>Pedidos Recientes</span>
          </Link>
          <Link 
            to="/admin/productos" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/productos') ? 'bg-white text-black font-medium' : 'hover:bg-white/10 text-white/80 hover:text-gold'}`}
          >
            <PackagePlus size={20} />
            <span>Gestión de Productos</span>
          </Link>
          <Link 
            to="/admin/usuarios" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/usuarios') ? 'bg-white text-black font-medium' : 'hover:bg-white/10 text-white/80 hover:text-gold'}`}
          >
            <PlusCircle size={20} />
            <span>Gestión de Usuarios</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 mt-auto space-y-2">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 text-white/80 hover:text-gold transition-colors">
            <Home size={20} />
            <span>Volver a la Tienda</span>
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const AdminSales = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-black mb-2">Resumen de Ventas</h1>
        <p className="text-darkgray/70">Métricas y rendimiento de tu tienda en tiempo real.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ventas del Día</p>
            <p className="text-2xl font-bold text-black">$2,970.00</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pedidos Completados</p>
            <p className="text-2xl font-bold text-black">42</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ticket Promedio</p>
            <p className="text-2xl font-bold text-black">$70.71</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-black mb-6">Ventas por Hora (Hoy)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value}`, 'Ventas']}
                />
                <Line type="monotone" dataKey="sales" stroke="black" strokeWidth={3} dot={{r: 4, fill: 'black', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-black mb-6">Ventas por Categoría</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCategoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f3f4f6'}}
                  formatter={(value) => [`$${value}`, 'Ventas']}
                />
                <Bar dataKey="value" fill="black" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const { products, addProduct, deleteProducts, categories, addCategory, loading } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    secondaryImages: [] as string[]
  });

  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0] }));
    }
  }, [categories, formData.category]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      try {
        await addCategory(newCategoryName.trim());
        setFormData(prev => ({ ...prev, category: newCategoryName.trim() }));
        setNewCategoryName('');
        setIsAddingCategory(false);
      } catch (error) {
        alert("Error al añadir categoría");
      }
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
    }
  };

  const handleSecondaryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const urls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ 
      ...prev, 
      secondaryImages: [...prev.secondaryImages, ...urls] 
    }));
  };

  const removeSecondaryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      secondaryImages: prev.secondaryImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;
    
    setIsSubmitting(true);
    try {
      await addProduct({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        image: formData.image,
        secondaryImages: formData.secondaryImages
      });
      
      setIsAdding(false);
      setFormData({ name: '', description: '', category: categories[0] || '', price: '', image: '', secondaryImages: [] });
      alert("¡Producto añadido con éxito!");
    } catch (error) {
      alert("Error al añadir producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`¿Estás seguro de que deseas borrar ${selectedProducts.length} producto(s)?`)) {
      try {
        await deleteProducts(selectedProducts);
        setSelectedProducts([]);
      } catch (error) {
        alert("Error al borrar productos");
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-black mb-2">Gestión de Productos</h1>
          <p className="text-darkgray/70">Administra el catálogo de tu tienda.</p>
        </div>
        <div className="flex items-center space-x-4">
          {selectedProducts.length > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 size={18} />
              <span>Borrar ({selectedProducts.length})</span>
            </button>
          )}
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            {isAdding ? <X size={18} /> : <PlusCircle size={18} />}
            <span>{isAdding ? 'Cancelar' : 'Nuevo Producto'}</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-medium text-black mb-6 border-b pb-4">Añadir Nuevo Producto</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Ej. Ramo de Rosas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <div className="flex space-x-2">
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button 
                    type="button"
                    onClick={() => setIsAddingCategory(!isAddingCategory)}
                    className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors"
                    title="Añadir nueva categoría"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                {isAddingCategory && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        placeholder="Nueva categoría..."
                        className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <button 
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-black text-white text-xs px-3 py-1 rounded-md hover:bg-gray-800"
                      >
                        Añadir
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsAddingCategory(false)}
                        className="text-gray-500 hover:text-black"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagen Principal</label>
                <div className="flex items-center space-x-6">
                  <div className="flex-1">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                        <p className="text-xs text-gray-500">PNG, JPG o WEBP (Max. 2MB)</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
                    </label>
                  </div>
                  {formData.image && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                      >
                        <X size={14} className="text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes Secundarias</label>
                <div className="flex flex-col space-y-4">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-6 h-6 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Subir imágenes adicionales</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleSecondaryImagesChange} />
                  </label>
                  
                  {formData.secondaryImages.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {formData.secondaryImages.map((url, idx) => (
                        <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                          <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeSecondaryImage(idx)}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                          >
                            <X size={14} className="text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea 
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Describe el producto..."
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Cargando productos...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    checked={products.length > 0 && selectedProducts.length === products.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${selectedProducts.includes(product.id) ? 'bg-gray-50' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                      <span className="font-medium text-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category || 'Sin categoría'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-black">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-black hover:text-gray-600 cursor-pointer">Editar</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  );
};

const AdminUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Note: In Supabase, signUp by default might sign in the new user.
      // To create a user without signing in, you'd normally use the Admin API (service role),
      // but for this demo we use the standard signUp. 
      // IMPORTANT: The admin might be signed out after this if Supabase is configured to auto-login.
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Usuario registrado con éxito. Se ha enviado un correo de confirmación (si está habilitado en Supabase).' 
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al registrar el usuario.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif text-black mb-2">Gestión de Usuarios</h1>
        <p className="text-darkgray/70">Registra nuevos administradores para la tienda.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-black mb-6 border-b pb-4">Registrar Nuevo Administrador</h3>
        
        <form onSubmit={handleRegister} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ejemplo@floreriaricardo.com"
                className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <span>Registrar Usuario</span>}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Nota importante:</strong> Por seguridad, Supabase puede requerir que el nuevo usuario confirme su correo electrónico antes de poder iniciar sesión. Puedes desactivar esta opción en el panel de Supabase (Authentication &gt; Providers &gt; Email &gt; Confirm email) si deseas acceso inmediato.
          </p>
        </div>
      </div>
    </div>
  );
};

const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Carlos Mendoza',
    phone: '+52 55 1234 5678',
    email: 'carlos@example.com',
    date: '2026-03-23 10:30 AM',
    total: 70.00,
    status: 'Completado',
    products: [
      { name: 'Ramo de 24 Rosas Rojas', qty: 1, price: 45.00 },
      { name: 'Ramo de Girasoles Brillantes', qty: 1, price: 25.00 }
    ]
  },
  {
    id: 'ORD-002',
    customer: 'Ana Sofía López',
    phone: '+52 55 8765 4321',
    email: 'ana.sofia@example.com',
    date: '2026-03-23 11:15 AM',
    total: 65.00,
    status: 'Pendiente',
    products: [
      { name: 'Caja de Rosas y Orquídeas', qty: 1, price: 65.00 }
    ]
  },
  {
    id: 'ORD-003',
    customer: 'Roberto Gómez',
    phone: '+52 33 9876 5432',
    email: 'roberto.g@example.com',
    date: '2026-03-23 02:45 PM',
    total: 110.00,
    status: 'Enviado',
    products: [
      { name: 'Arreglo de Orquídeas Exóticas', qty: 1, price: 110.00 }
    ]
  },
];

const AdminOrders = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-black mb-2">Pedidos Recientes</h1>
        <p className="text-darkgray/70">Revisa las últimas ventas y los detalles de tus clientes.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Pedido</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Productos</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-black">{order.id}</span>
                    <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.phone}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <ul className="text-sm text-gray-600 space-y-1">
                      {order.products.map((p, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-4 h-4 rounded-full bg-gray-200 text-[10px] flex items-center justify-center mr-2">{p.qty}</span>
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-black">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completado' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-black mx-auto mb-4" />
          <p className="text-gray-500 font-serif">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/ventas" replace />} />
        <Route path="/ventas" element={<AdminSales />} />
        <Route path="/pedidos" element={<AdminOrders />} />
        <Route path="/productos" element={<AdminProducts />} />
        <Route path="/usuarios" element={<AdminUsers />} />
      </Routes>
    </AdminLayout>
  );
};
