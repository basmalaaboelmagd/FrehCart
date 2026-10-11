"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaCreditCard, FaLock } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const ORDERS_URL = "https://ecommerce.routemisr.com/api/v1/orders";

type PaymentMethod = "cash" | "online";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

const formatPrice = (n: number | undefined) => Number(n ?? 0).toLocaleString("en-US");

export default function CheckoutPage() {
  const { cartId } = useParams<{ cartId: string }>();
  const router = useRouter();
  const { cart, loading, getCart } = useCart();

  const [form, setForm] = useState<ShippingAddress>({ details: "", phone: "", city: "" });
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // الدفع محتاج تسجيل دخول
    if (!localStorage.getItem("userToken")) {
      router.replace("/login");
      return;
    }
    getCart();
  }, [getCart, router]);

  const products = cart?.products ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validate = () => {
    const e: Partial<ShippingAddress> = {};
    if (form.details.trim().length < 5) e.details = "Please enter your full address";
    if (!/^01[0125][0-9]{8}$/.test(form.phone)) e.phone = "Enter a valid Egyptian phone number";
    if (form.city.trim().length < 2) e.city = "Please enter your city";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const headers = { token: localStorage.getItem("userToken") ?? "" };
    setSubmitting(true);

    try {
      if (method === "cash") {
        // ---------- الدفع كاش عند الاستلام ----------
        await axios.post(`${ORDERS_URL}/${cartId}`, { shippingAddress: form }, { headers });
        toast.success("Order placed successfully 🎉");
        await getCart(); // الكارت بيتفرّغ من السيرفر بعد الطلب
        router.push("/allorders");
      } else {
        // ---------- الدفع أونلاين (Stripe) ----------
        const { data } = await axios.post<{ status: string; session: { url: string } }>(
          `${ORDERS_URL}/checkout-session/${cartId}`,
          { shippingAddress: form },
          { headers, params: { url: window.location.origin } }
        );
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(
        axios.isAxiosError(err)
          ? err.response?.data?.message ?? "Something went wrong"
          : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !cart) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cart || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <Link href="/products" className="text-green-600 hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  const inputClass = (hasError?: string) =>
    `w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 ${
      hasError ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-green-600">Shopping Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Checkout</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 items-start" noValidate>
          {/* ---------- Left: address + payment ---------- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping address */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-5">Shipping Address</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="details" className="block text-sm font-medium mb-1">Address details</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Street, building, apartment..."
                    className={inputClass(errors.details)}
                  />
                  {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      className={inputClass(errors.phone)}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Cairo"
                      className={inputClass(errors.city)}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment method */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-5">Payment Method</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  { value: "cash", title: "Cash on Delivery", desc: "Pay when your order arrives", icon: <FaMoneyBillWave /> },
                  { value: "online", title: "Pay Online", desc: "Secure card payment via Stripe", icon: <FaCreditCard /> },
                ] as const).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      method === opt.value ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={method === opt.value}
                      onChange={() => setMethod(opt.value)}
                      className="sr-only"
                    />
                    <span className={`text-2xl mt-1 ${method === opt.value ? "text-green-600" : "text-gray-400"}`}>
                      {opt.icon}
                    </span>
                    <span>
                      <span className="block font-semibold">{opt.title}</span>
                      <span className="block text-sm text-gray-500">{opt.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* ---------- Right: summary ---------- */}
          <aside className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-24">
            <div className="bg-gray-900 text-white px-7 py-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
            </div>

            <div className="p-7">
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {products.map((item) => (
                  <li key={item.product._id || item.product.id} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.imageCover} alt={item.product.title} className="w-14 h-14 rounded-lg object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.count}</p>
                    </div>
                    <span className="text-sm font-semibold">{formatPrice(item.price * item.count)}</span>
                  </li>
                ))}
              </ul>

              <hr className="my-6" />

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cart.totalCartPrice)} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">{formatPrice(cart.totalCartPrice)} EGP</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3"
              >
                <FaLock />
                {submitting ? "Processing..." : method === "cash" ? "Place Order" : "Continue to Payment"}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
