"use client";
import Link from "next/link";
import React, { useContext, useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

// Define prop types
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  badge?: number;
  onClick?: () => void;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!cartContext) throw new Error("CartContext is not available");
  if (!wishlistContext) throw new Error("WishlistContext is not available");

  const { numberOfItems } = cartContext;
  const { numberOfWishlistItems } = wishlistContext;

  function handleLogout() {
    signOut({ callbackUrl: "/" });
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-teal-500 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <i className="fa-solid fa-cart-arrow-down text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                  SwiftCart
                </h1>
                <p className="text-xs text-gray-500 -mt-1">E-commerce Store</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-8 py-3 shadow-inner border border-gray-200">
            {navItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <NavLink href={item.href}>
                  {item.label}
                </NavLink>
                {index < navItems.length - 1 && (
                  <div className="w-px h-4 bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            {status === "authenticated" && (
              <Link href="/wishlist" className="relative">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 hover:border-red-300 transition-all duration-200">
                  <i className="fa-solid fa-heart text-gray-700 font-semibold text-lg"></i>
                </div>
                {numberOfWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {numberOfWishlistItems}
                  </span>
                )}
              </Link>
            )}

            {/* Cart */}
            {status === "authenticated" && (
              <Link href="/cart" className="relative">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 hover:border-teal-300 transition-all duration-200">
                  <i className="fa-solid fa-shopping-cart text-gray-700 font-semibold text-lg"></i>
                </div>
                {numberOfItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {numberOfItems}
                  </span>
                )}
              </Link>
            )}

            {/* Auth Section */}
            {!session ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-5 py-2 text-gray-700 font-medium hover:text-teal-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Profile Dropdown */}
                <div className="relative hidden lg:block" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2 border border-gray-200 hover:border-teal-300 transition-all duration-200"
                  >
                    <div className="w-9 h-9 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-teal-600">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-800">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 -mt-0.5">Member</p>
                    </div>
                    <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}></i>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/allorders"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fa-solid fa-shopping-bag mr-3 text-teal-500"></i>
                        Your Orders
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fa-solid fa-user mr-3 text-teal-500"></i>
                        Profile Settings
                      </Link>
                    </div>
                  )}
                </div>
                <div 
                  className="relative flex items-center"
                  onMouseEnter={() => setIsLogoutHovered(true)}
                  onMouseLeave={() => setIsLogoutHovered(false)}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center h-10 bg-red-100 rounded-full overflow-hidden transition-all duration-300 hover:bg-red-200"
                    style={{ width: isLogoutHovered ? '100px' : '40px' }}
                    title="Sign Out"
                  >
                    <i className="fa-solid fa-sign-out-alt text-red-600 text-sm mr-1"></i>
                    {isLogoutHovered && (
                      <span className="text-red-600 text-sm font-medium whitespace-nowrap pr-2">
                        Logout
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"} text-gray-700`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 mt-2">
              {navItems.map((item) => (
                <MobileNavLink key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </MobileNavLink>
              ))}
              {status === "authenticated" && (
                <>
                  <MobileNavLink
                    href="/allorders"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Orders
                  </MobileNavLink>
                  <MobileNavLink
                    href="/wishlist"
                    badge={numberOfWishlistItems}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlist
                  </MobileNavLink>
                  <MobileNavLink
                    href="/cart"
                    badge={numberOfItems}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shopping Cart
                  </MobileNavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Desktop Navigation Links
function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-600 font-medium hover:text-teal-600 transition-colors px-2 py-1"
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Links
function MobileNavLink({ href, children, badge = 0, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between py-3 px-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200 border-b border-gray-100 last:border-b-0"
    >
      <span className="font-medium">{children}</span>
      {badge > 0 && (
        <span className="bg-teal-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {badge}
        </span>
      )}
    </Link>
  );
}