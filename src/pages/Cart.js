import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, updateQty, totals, clear } = useCart();

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-soft">
            <p className="text-gray-600 mb-6">Your cart is empty. Browse our products and add items to your cart.</p>
            <Link to="/shop" className="inline-block px-5 py-3 bg-primary hover:bg-primaryDark text-white rounded-xl font-semibold shadow-medium">Go to Shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-soft">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{(item.price).toLocaleString()} SAR</p>
                    <div className="mt-3 flex items-center gap-3">
                      <label className="text-sm text-gray-600">Qty</label>
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, parseInt(e.target.value || '1', 10))}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="px-3 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded-lg">Remove</button>
                </div>
              ))}
              <button onClick={clear} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Clear Cart</button>
            </div>

            <aside className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between"><span>Subtotal</span><span>{totals.subtotal.toFixed(2)} SAR</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping.toFixed(2)} SAR</span></div>
                <div className="flex justify-between"><span>VAT (15%)</span><span>{totals.tax.toFixed(2)} SAR</span></div>
                <div className="border-t pt-3 flex justify-between font-semibold text-gray-900"><span>Total</span><span>{totals.total.toFixed(2)} SAR</span></div>
              </div>
              <Link to="/checkout" className="block mt-6 text-center px-5 py-3 bg-primary hover:bg-primaryDark text-white rounded-xl font-semibold shadow-medium">Proceed to Checkout</Link>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Cart;
