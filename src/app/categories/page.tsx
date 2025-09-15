import React from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import getAllCategories from '@/api/categories.api'
import CategoryCard from '../_components/CategoryCard/CategoryCard'
import { CategoryType } from '@/types/category.type'

// Loading component
function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-16 bg-gray-200 rounded-lg w-96 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-80 mx-auto mb-8 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-full w-48 mx-auto animate-pulse"></div>
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl h-56 shadow-lg animate-pulse border-2 border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
            </div>
          ))}
        </div>
        
        {/* Stats Skeleton */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main categories component
async function CategoriesContent() {
  try {
    const categoriesData = await getAllCategories()
    const categories: CategoryType[] = categoriesData.data

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                Category
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover amazing products organized by categories. Find exactly what you&apos;re looking for with ease and style.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <div 
                key={category._id} 
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shopping-bag text-teal-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">10+</h3>
                <p className="text-gray-600">Categories</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-box text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-star text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8</h3>
                <p className="text-gray-600">Rating</p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Start Shopping?
                </h3>
                <p className="text-teal-100 mb-8 text-lg max-w-2xl mx-auto">
                  Explore our wide range of products across all categories. Find the perfect items for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/products" 
                    className="px-8 py-4 bg-white text-teal-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Browse All Products
                  </Link>
                  <Link 
                    href="/brands" 
                    className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-teal-600 transition-all duration-300 font-semibold text-lg"
                  >
                    <i className="fas fa-tags mr-2"></i>
                    View Brands
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn&apos;t load the categories right now.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            <i className="fas fa-refresh mr-2"></i>
            Try Again
          </button>
        </div>
      </div>
    )
  }
}

export default function Categories() {
  return (
    <Suspense fallback={<CategoriesLoading />}>
      <CategoriesContent />
    </Suspense>
  )
}