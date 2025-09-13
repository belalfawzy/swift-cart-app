"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "@/types/category.type";

interface CategorySwiperProps {
  data: CategoryType[];
}

export default function CategorySwiper({ data }: CategorySwiperProps) {
  return (
    <div className="w-[80%] mx-auto my-12">
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id}>
            <Link
              href={`/categories/${category._id}`}
              className="group block"
              aria-label={`Explore ${category.name} category`}
            >
              <div className="w-full h-[150px] overflow-hidden group-hover:bg-teal-50 transition-colors duration-200">
                <Image
                  src={category.image}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  alt={`${category.name} category image`}
                  placeholder="blur"
                  blurDataURL="/placeholder-category.jpg"
                />
              </div>
              <p className="text-center font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-200 mt-2">
                {category.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}