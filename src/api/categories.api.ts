import { CategoriesResponse, CategoryProductsResponse, CategoryType } from '@/types/category.type'

export default async function getAllCategories(): Promise<CategoriesResponse> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    method: 'GET',
    next: { revalidate: 60 } // ISR
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  
  const data = await res.json()
  return data
}

export async function getCategoryProducts(categoryId: string): Promise<CategoryProductsResponse> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
    method: 'GET',
    next: { revalidate: 60 } // ISR
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch category products')
  }
  
  const data = await res.json()
  return data
}

export async function getCategoryById(categoryId: string): Promise<CategoryType> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
    method: 'GET',
    next: { revalidate: 60 } // ISR
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch category')
  }
  
  const data = await res.json()
  return data.data
}