import React from "react";
import GetAllProducts from "../_components/getAllProducts/GetAllProducts";

interface ProductsPageProps {
  searchParams: Promise<{
    brand?: string;
    category?: string;
  }>;
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <GetAllProducts brandId={params.brand} categoryId={params.category} />
      </div>
    </div>
  );
}