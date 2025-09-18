import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { items, totals, clear } = useCart();
  const [method, setMethod] = useState('card');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = (e) => {
    e.preventDefault();
    alert('Order placed successfully! (Demo)');
    clear();
  };

  const disabled = items.length === 0;

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={placeOrder} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">First name</label>
                  <input name="firstName" value={form.firstName} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Last name</label>
                  <input name="lastName" value={form.lastName} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Phone</label>
                  <input name="phone" value={form.phone} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-700">Address</label>
                  <input name="address" value={form.address} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">City</label>
                  <input name="city" value={form.city} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm text-gray-700">Country</label>
                  <input name="country" value={form.country} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input type="radio" name="method" checked={method === 'card'} onChange={() => setMethod('card')} />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="method" checked={method === 'apple'} onChange={() => setMethod('apple')} />
                  <span>Apple Pay (Demo)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="method" checked={method === 'cod'} onChange={() => setMethod('cod')} />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {method === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-700">Card number</label>
                    <input name="cardNumber" value={form.cardNumber} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">CVV</label>
                    <input name="cardCvv" value={form.cardCvv} onChange={handle} className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Expiry</label>
                    <input name="cardExpiry" value={form.cardExpiry} onChange={handle} placeholder="MM/YY" className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              )}

              <button disabled={disabled} className={`mt-6 px-6 py-3 rounded-xl font-semibold text-white shadow-medium ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-primaryDark'}`}>
                Place Order
              </button>
            </div>
          </form>

          <aside className="bg-white rounded-2xl border border-gray-100 p-6 shadow-soft h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-auto pr-2">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-gray-700">
                  <span>{i.name} × {i.qty}</span>
                  <span>{(i.price * i.qty).toFixed(2)} SAR</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-gray-600">No items</p>}
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Subtotal</span><span>{totals.subtotal.toFixed(2)} SAR</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping.toFixed(2)} SAR</span></div>
              <div className="flex justify-between"><span>VAT (15%)</span><span>{totals.tax.toFixed(2)} SAR</span></div>
              <div className="border-t pt-3 flex justify-between font-semibold text-gray-900"><span>Total</span><span>{totals.total.toFixed(2)} SAR</span></div>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
