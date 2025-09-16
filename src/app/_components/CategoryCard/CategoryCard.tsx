'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryType } from '@/types/category.type'
import { Card } from '@/components/ui/card'

interface CategoryCardProps {
  category: CategoryType
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link href={`/categories/${category._id}`} onClick={handleClick}>
      <Card className={`group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-lg transition-all duration-500 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-200/50 hover:-translate-y-3 hover:scale-105 ${isLoading ? 'pointer-events-none opacity-75' : ''}`}>
        <div className="relative h-56 w-full">
          {/* Category Image */}
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-115"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Category Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                {category.name}
              </h3>
              <div className="flex items-center text-teal-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    <span className="font-medium">Loading...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-arrow-right mr-2"></i>
                    <span className="font-medium">Explore Products</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-teal-400 transition-all duration-500" />
        
        {/* Corner Badge */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500 flex items-center justify-center shadow-lg">
          <i className="fas fa-arrow-right text-teal-600 text-sm"></i>
        </div>
        
        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Card>
    </Link>
  )
}
