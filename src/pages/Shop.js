import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'elevators', label: 'Elevators' },
  { key: 'spare_parts', label: 'Spare Parts' },
  { key: 'services', label: 'Services' },
];

const Shop = () => {
  const [category, setCategory] = useState('all');
  const filtered = useMemo(() => {
    if (category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
  }, [category]);

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Online Store</h1>
            <p className="text-gray-600 mt-2">Browse elevators, spare parts, and service plans.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${category === c.key ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shop;
