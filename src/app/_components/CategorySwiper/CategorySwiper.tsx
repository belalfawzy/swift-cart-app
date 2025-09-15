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
    <div className="mb-12">
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 7,
          },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        className="px-4"
      >
        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id}>
            <Link
              href={`/categories/${category._id}`}
              className="group block"
              aria-label={`Explore ${category.name} category`}
            >
              <div className="w-full h-[120px] overflow-hidden rounded-xl group-hover:bg-teal-50 transition-colors duration-200 shadow-sm">
                <Image
                  src={category.image}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  alt={`${category.name} category image`}
                />
              </div>
              <p className="text-center font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-200 mt-3 text-sm">
                {category.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}