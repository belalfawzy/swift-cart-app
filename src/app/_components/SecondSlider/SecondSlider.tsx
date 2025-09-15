
import React from "react";
import CategorySwiper from "../CategorySwiper/CategorySwiper";
import getAllCategories from "@/api/categories.api";


export default async function SecondSlider() {
  
    const categoriesData = await getAllCategories()
    const data = categoriesData.data

  return (
    <>
      <CategorySwiper data={data}/>
    </>
  );
}