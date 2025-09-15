import React from 'react'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryById, getCategoryProducts } from '@/api/categories.api'
import GetAllProducts from '../../_components/getAllProducts/GetAllProducts'
import { CategoryType } from '@/types/category.type'

interface CategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Loading component
function CategoryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gray-200 rounded-3xl mx-auto mb-6 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        
        {/* Products Skeleton */}
        <div className="flex flex-wrap w-full">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-1/5 p-2">
              <div className="bg-white rounded-xl p-4 shadow-sm animate-pulse border border-gray-200">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main category component
async function CategoryContent({ categoryId }: { categoryId: string }) {
  try {
    const [category, productsData] = await Promise.all([
      getCategoryById(categoryId),
      getCategoryProducts(categoryId)
    ])
    
    const products = productsData.data

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur opacity-20"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover amazing products in the {category.name} category. Find exactly what you&apos;re looking for with our curated selection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="inline-flex items-center px-6 py-3 bg-white rounded-full text-teal-700 text-sm font-semibold shadow-lg border border-teal-200">
                <i className="fas fa-box mr-2 text-teal-600"></i>
                {products.length} products available
              </div>
              <Link 
                href="/categories" 
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold text-sm shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Categories
              </Link>
            </div>
          </div>

          {/* Products Section */}
          {products.length > 0 ? (
            <div className="mb-16">
              <GetAllProducts categoryId={categoryId} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-box-open text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No products found in {category.name}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We&apos;re working on adding more products to this category. Check back soon!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/categories" 
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                >
                  Browse Other Categories
                </Link>
                <Link 
                  href="/products" 
                  className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold"
                >
                  View All Products
                </Link>
              </div>
            </div>
          )}

          {/* Related Categories */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore Other Categories
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/categories" 
                className="px-6 py-3 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors font-medium"
              >
                All Categories
              </Link>
              <Link 
                href="/brands" 
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Browse Brands
              </Link>
              <Link 
                href="/products" 
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching category:', error)
    notFound()
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params
  
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent categoryId={id} />
    </Suspense>
  )
}


