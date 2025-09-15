import { BrandsResponse, BrandProductsResponse } from '@/types/brand.type'

export default async function getBrands(): Promise<BrandsResponse> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    method: 'GET',
    next: { revalidate: 60 } // ISR
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch brands')
  }
  
  const data = await res.json()
  return data
}

export async function getBrandProducts(brandId: string): Promise<BrandProductsResponse> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
    method: 'GET',
    next: { revalidate: 60 } // ISR
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch brand products')
  }
  
  const data = await res.json()
  return data
}
