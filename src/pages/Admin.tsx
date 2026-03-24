import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LayoutDashboard, PackagePlus, DollarSign, ShoppingBag, TrendingUp, PlusCircle, LogOut, ClipboardList, UploadCloud, X, Menu, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useProducts } from '../context/ProductContext';

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
  { name: 'Quesos', value: 400 },
  { name: 'Jamones', value: 300 },
  { name: 'Salchichas', value: 200 },
  { name: 'Embutidos', value: 278 },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img 
            src="https://appdesignproyectos.com/palbau.png" 
            alt="PALBAU" 
            className="h-8 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="h-6 w-px bg-gray-200"></div>
          <span className="text-xs font-bold text-gold uppercase tracking-widest">Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy shadow-sm border border-gray-100 active:scale-90 transition-transform"
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
            className="fixed inset-0 bg-cream z-50 flex flex-col p-6 overflow-hidden md:hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="flex justify-between items-center mb-12 relative z-10">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://appdesignproyectos.com/palbau.png" 
                  alt="PALBAU" 
                  className="h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="h-8 w-px bg-gray-300"></div>
                <span className="text-sm font-bold text-gold uppercase tracking-widest">Admin</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy shadow-sm border border-gray-100 active:scale-90 transition-transform"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4 relative z-10">
              <Link 
                to="/admin/ventas" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 active:scale-95 transition-all ${location.pathname.includes('/ventas') ? 'ring-2 ring-gold/50' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/ventas') ? 'bg-gold text-white shadow-md shadow-gold/20' : 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white'}`}>
                  <LayoutDashboard size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-navy font-medium">Ventas y Métricas</span>
              </Link>
              
              <Link 
                to="/admin/pedidos" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 active:scale-95 transition-all ${location.pathname.includes('/pedidos') ? 'ring-2 ring-lightblue/50' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/pedidos') ? 'bg-lightblue text-white shadow-md shadow-lightblue/20' : 'bg-lightblue/10 text-lightblue group-hover:bg-lightblue group-hover:text-white'}`}>
                  <ClipboardList size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-navy font-medium">Pedidos Recientes</span>
              </Link>
              
              <Link 
                to="/admin/productos" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex items-center space-x-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 active:scale-95 transition-all ${location.pathname.includes('/productos') ? 'ring-2 ring-navy/50' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${location.pathname.includes('/productos') ? 'bg-navy text-white shadow-md shadow-navy/20' : 'bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white'}`}>
                  <PackagePlus size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-navy font-medium">Gestión de Productos</span>
              </Link>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <Link 
                to="/" 
                className="group flex items-center space-x-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100 active:scale-95 transition-all" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Home size={24} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-gray-600 font-medium">Volver a la Tienda</span>
              </Link>
            </nav>
            
            <div className="mt-auto text-center pb-8 relative z-10">
              <div className="w-16 h-1 bg-gray-200 mx-auto rounded-full mb-6"></div>
              <p className="text-navy/50 text-sm font-light uppercase tracking-widest">Panel de Administración</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-navy text-white flex-col sticky top-0 h-screen z-40">
        <div className="hidden md:block p-6 border-b border-white/10">
          <h2 className="text-2xl font-serif text-gold tracking-widest uppercase">Palbau</h2>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">Panel de Control</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link 
            to="/admin/ventas" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/ventas') ? 'bg-lightblue text-navy font-medium' : 'hover:bg-white/10 text-white/80'}`}
          >
            <LayoutDashboard size={20} />
            <span>Ventas y Métricas</span>
          </Link>
          <Link 
            to="/admin/pedidos" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/pedidos') ? 'bg-lightblue text-navy font-medium' : 'hover:bg-white/10 text-white/80'}`}
          >
            <ClipboardList size={20} />
            <span>Pedidos Recientes</span>
          </Link>
          <Link 
            to="/admin/productos" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.includes('/productos') ? 'bg-lightblue text-navy font-medium' : 'hover:bg-white/10 text-white/80'}`}
          >
            <PackagePlus size={20} />
            <span>Gestión de Productos</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 mt-auto">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 text-white/80 transition-colors">
            <LogOut size={20} />
            <span>Volver a la Tienda</span>
          </Link>
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
        <h1 className="text-3xl font-serif text-navy mb-2">Resumen de Ventas</h1>
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
            <p className="text-2xl font-bold text-navy">$2,970.00</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pedidos Completados</p>
            <p className="text-2xl font-bold text-navy">42</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ticket Promedio</p>
            <p className="text-2xl font-bold text-navy">$70.71</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-navy mb-6">Ventas por Hora (Hoy)</h3>
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
                <Line type="monotone" dataKey="sales" stroke="#1A2B4C" strokeWidth={3} dot={{r: 4, fill: '#1A2B4C', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-navy mb-6">Ventas por Categoría</h3>
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
                <Bar dataKey="value" fill="#85A854" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const { products, addProduct } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Quesos Nacionales',
    price: '',
    image: '',
    secondaryImages: [] as string[]
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;
    
    addProduct({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image,
      secondaryImages: formData.secondaryImages
    });
    
    setIsAdding(false);
    setFormData({ name: '', description: '', category: 'Quesos Nacionales', price: '', image: '', secondaryImages: [] });
    alert("¡Producto añadido con éxito!");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-navy mb-2">Gestión de Productos</h1>
          <p className="text-darkgray/70">Administra el catálogo de tu tienda.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2 bg-navy text-white px-4 py-2 rounded-md hover:bg-lightblue hover:text-navy transition-colors"
        >
          {isAdding ? <X size={18} /> : <PlusCircle size={18} />}
          <span>{isAdding ? 'Cancelar' : 'Nuevo Producto'}</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-medium text-navy mb-6 border-b pb-4">Añadir Nuevo Producto</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Ej. Queso Brie"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                >
                  <option value="Quesos Nacionales">Quesos Nacionales</option>
                  <option value="Quesos Importados">Quesos Importados</option>
                  <option value="Jamones Selectos">Jamones Selectos</option>
                  <option value="Salchichas Premium">Salchichas Premium</option>
                  <option value="Embutidos">Embutidos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
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
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent resize-none"
                  placeholder="Describe el producto..."
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-[#85A854] text-white px-6 py-2 rounded-md hover:bg-[#6b8743] transition-colors font-medium"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                      <span className="font-medium text-navy">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category || 'Sin categoría'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#85A854]">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-lightblue hover:text-navy cursor-pointer">Editar</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    total: 32.00,
    status: 'Completado',
    products: [
      { name: 'Queso Manchego Curado', qty: 2, price: 11.00 },
      { name: 'Salchicha Ahumada Premium', qty: 1, price: 10.00 }
    ]
  },
  {
    id: 'ORD-002',
    customer: 'Ana Sofía López',
    phone: '+52 55 8765 4321',
    email: 'ana.sofia@example.com',
    date: '2026-03-23 11:15 AM',
    total: 45.50,
    status: 'Pendiente',
    products: [
      { name: 'Jamón Ibérico de Bellota', qty: 1, price: 45.50 }
    ]
  },
  {
    id: 'ORD-003',
    customer: 'Roberto Gómez',
    phone: '+52 33 9876 5432',
    email: 'roberto.g@example.com',
    date: '2026-03-23 02:45 PM',
    total: 38.00,
    status: 'Enviado',
    products: [
      { name: 'Prosciutto di Parma', qty: 1, price: 38.00 }
    ]
  },
];

const AdminOrders = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-navy mb-2">Pedidos Recientes</h1>
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
                    <span className="font-medium text-navy">{order.id}</span>
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
                  <td className="px-6 py-4 text-sm font-medium text-[#85A854]">${order.total.toFixed(2)}</td>
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
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/ventas" replace />} />
        <Route path="/ventas" element={<AdminSales />} />
        <Route path="/pedidos" element={<AdminOrders />} />
        <Route path="/productos" element={<AdminProducts />} />
      </Routes>
    </AdminLayout>
  );
};
