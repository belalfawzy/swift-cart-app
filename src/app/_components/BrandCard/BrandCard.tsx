'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrandType } from '@/types/brand.type'
import { Card } from '@/components/ui/card'

interface BrandCardProps {
  brand: BrandType
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/products?brand=${brand._id}`}>
      <Card className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-100 hover:-translate-y-1">
        <div className="flex flex-col items-center space-y-4">
          {/* Brand Image */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-50 p-2">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 96px, 96px"
            />
          </div>
          
          {/* Brand Name */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-600">
              {brand.name}
            </h3>
            <p className="text-sm text-gray-500">
              Explore Products
            </p>
          </div>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-teal-600/0 transition-all duration-300 group-hover:from-teal-500/5 group-hover:to-teal-600/5" />
      </Card>
    </Link>
  )
}
