import getProducts from "@/api/products.api";
import { getBrandProducts } from "@/api/brands.api";
import { getCategoryProducts } from "@/api/categories.api";
import React from "react";
import SingleProducts from "../SingleProduct/SingleProducts";
import { ProductType } from "@/types/product.type";

interface GetAllProductsProps {
  brandId?: string;
  categoryId?: string;
}

export default async function GetAllProducts({ brandId, categoryId }: GetAllProductsProps) {
  let data: ProductType[] = [];
  let filterName = "";
  let filterType = "";

  try {
    if (brandId) {
      // Fetch products by brand
      const brandData = await getBrandProducts(brandId);
      data = Array.isArray(brandData.data) ? brandData.data : [];
      // Get brand name from the first product's brand info
      if (data.length > 0) {
        filterName = data[0].brand.name;
        filterType = "brand";
      }
    } else if (categoryId) {
      // Fetch products by category
      const categoryData = await getCategoryProducts(categoryId);
      data = Array.isArray(categoryData.data) ? categoryData.data : [];
      // Get category name from the first product's category info
      if (data.length > 0) {
        filterName = data[0].category.name;
        filterType = "category";
      }
    } else {
      // Fetch all products
      const allProducts = await getProducts();
      data = Array.isArray(allProducts) ? allProducts : [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    data = [];
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {brandId ? "No products found for this brand" : categoryId ? "No products found for this category" : "No products available"}
        </h2>
        <p className="text-gray-600">
          {brandId ? "Try browsing other brands or check back later." : categoryId ? "Try browsing other categories or check back later." : "Please check back later for new products."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Products Grid */}
      <div className="flex flex-wrap w-full">
        {data.map((currentProduct: ProductType) => (
          <SingleProducts key={currentProduct.id} product={currentProduct} />
        ))}
      </div>
    </div>
  );
}


