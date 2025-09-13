
import React from "react";
import CategorySwiper from "../CategorySwiper/CategorySwiper";
import getAllCategories from "@/api/categories.api";


export default async function SecondSlider() {
  
    const data = await getAllCategories()

  return (
    <>
      <CategorySwiper data={data}/>
    </>
  );
}