
import Link from "next/link";
import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  CircleHelp,
  RotateCcw,
  User,
  Heart,
  Package,
  Lock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">

      {/* Main Footer */}
      <div className="w-11/12 mx-auto py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-5">

          <Link
            href="/"
            className="bg-white rounded-xl px-4 py-3 w-fit flex items-center gap-2"
          >
            <ShoppingCart className="text-emerald-500 w-6 h-6" />

            <span className="text-gray-900 font-extrabold text-lg">
              FreshCart
            </span>
          </Link>

          <p className="text-sm leading-relaxed">
            FreshCart is your one-stop destination for quality products.
            From fashion to electronics, we bring you the best brands at
            competitive prices with a seamless shopping experience.
          </p>

          {/* Contact */}
          <div className="flex flex-col gap-3 text-sm">

            <div className="flex items-center gap-3">
              <Phone className="text-emerald-500 w-4 h-4 shrink-0" />
              <span>+1 (800) 123-4567</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-emerald-500 w-4 h-4 shrink-0" />
              <span>support@freshcart.com</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-emerald-500 w-4 h-4 mt-1 shrink-0" />
              <span>
                123 Commerce Street, New York, NY 10001
              </span>
            </div>

          </div>

          {/* Social */}
          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <User className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <Heart className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <CircleHelp className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <Package className="w-4 h-4" />
            </Link>

          </div>

        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Shop</h4>

          <Link
            href="/products"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            All Products
          </Link>

          <Link
            href="/categories"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Categories
          </Link>

          <Link
            href="/brands"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Brands
          </Link>

          <Link
            href="/"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Electronics
          </Link>

          <Link
            href="/"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Men's Fashion
          </Link>

          <Link
            href="/"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Women's Fashion
          </Link>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Account</h4>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <User className="w-4 h-4" />
            My Account
          </Link>

          <Link
            href="/allorders"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <Package className="w-4 h-4" />
            Order History
          </Link>

          <Link
            href="/wishList"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Wishlist
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Shopping Cart
          </Link>

          <Link
            href="/login"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Support</h4>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <CircleHelp className="w-4 h-4" />
            Contact Us
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <CircleHelp className="w-4 h-4" />
            Help Center
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <Truck className="w-4 h-4" />
            Shipping Info
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Returns & Refunds
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <Package className="w-4 h-4" />
            Track Order
          </Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Legal</h4>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-500 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Privacy Policy
          </Link>

          <Link
            href="/"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Terms of Service
          </Link>

          <Link
            href="/"
            className="text-sm hover:text-emerald-500 transition-colors"
          >
            Cookie Policy
          </Link>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">

        <div className="w-11/12 mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-gray-400">
            <CreditCard className="w-8 h-8" />
            <CreditCard className="w-8 h-8" />
            <CreditCard className="w-8 h-8" />
          </div>

        </div>

      </div>

    </footer>
  );
}