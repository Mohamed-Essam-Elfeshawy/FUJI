import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  return (
    <div className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <h3 className="text-gray-900 font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">{product.price.toLocaleString()} SAR</span>
          <button
            onClick={() => addItem(product, 1)}
            className="px-4 py-2 bg-primary hover:bg-primaryDark text-white rounded-xl text-sm font-semibold transition-all shadow-medium hover:shadow-strong"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
