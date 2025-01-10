import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Import Autoplay module
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
    Heart,
    Brain,
    Stethoscope,
    Eye,
    Baby,
    User as UserRound,
    Scissors
} from "lucide-react";

const specialties = [
    { name: "طب عام", icon: Stethoscope },
    { name: "طب أسنان", icon: Heart },
    { name: "طب عيون", icon: Eye },
    { name: "طب أطفال", icon: Baby },
    { name: "طب نساء وولادة", icon: Heart },
    { name: "طب باطني", icon: UserRound },
    { name: "جراحة عامة", icon: Scissors },
    { name: "طب نفسي", icon: Brain }
];

export function Specialties() {
    return (
        <section className="specialities-section py-20 bg-gradient-to-r from-blue-50 to-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-mainColor">التخصصات الطبية</h2>
                <Swiper
                    spaceBetween={10} // المسافة بين الشرائح
                    slidesPerView={1} // عدد الشرائح في العرض الافتراضي
                    loop={true} // التكرار بين الشرائح
                    autoplay={{
                        delay: 2000, // التبديل بين الشرائح كل 2 ثانية
                        disableOnInteraction: false, // يستمر التمرير التلقائي حتى بعد التفاعل
                    }}
                    modules={[Autoplay]} // التمرير التلقائي
                    breakpoints={{
                        320: { slidesPerView: 1.2, spaceBetween: 10 }, // للموبايل
                        480: { slidesPerView: 1.5, spaceBetween: 15 }, // للشاشات الصغيرة
                        640: { slidesPerView: 2, spaceBetween: 20 }, // للأجهزة اللوحية
                        768: { slidesPerView: 3, spaceBetween: 20 }, // للأجهزة اللوحية الكبيرة
                        1024: { slidesPerView: 4, spaceBetween: 25 }, // لأجهزة الكمبيوتر المحمولة
                        1280: { slidesPerView: 5, spaceBetween: 30 }, // للشاشات الكبيرة
                    }}
                    className="specialities-carousel"
                >
                    {specialties.map((specialty) => (
                        <SwiperSlide key={specialty.name} className="bg-transparent">
                            <div className="relative group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                                <div className="absolute inset-0 bg-transparent rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <div className="relative z-10 text-center">
                                    <specialty.icon className="h-16 w-16 mx-auto mb-4 text-mainColor group-hover:text-blue-800 transition-colors duration-300" />
                                    <h3 className="font-semibold text-lg text-mainColor group-hover:text-blue-600 transition-colors duration-300">
                                        {specialty.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
