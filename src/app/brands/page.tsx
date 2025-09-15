import React from 'react'
import { Suspense } from 'react'
import getBrands from '@/api/brands.api'
import BrandCard from '../_components/BrandCard/BrandCard'
import { BrandType } from '@/types/brand.type'

// Loading component
function BrandsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse border border-gray-200">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main brands component
async function BrandsContent() {
  try {
    const brandsData = await getBrands()
    const brands: BrandType[] = brandsData.data

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                Brands
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover products from the world&apos;s most trusted and innovative brands
            </p>
            <div className="mt-6 text-sm text-gray-500">
              {brandsData.results} brands available
            </div>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              Can&apos;t find what you&apos;re looking for? 
              <span className="text-teal-600 font-medium ml-1">
                Browse all products
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn&apos;t load the brands right now.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
}

export default function Brands() {
  return (
    <Suspense fallback={<BrandsLoading />}>
      <BrandsContent />
    </Suspense>
  )
}