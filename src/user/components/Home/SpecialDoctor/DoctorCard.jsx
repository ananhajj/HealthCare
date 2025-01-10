import { Star } from "lucide-react";

export function DoctorCard({ name, specialty, rating, image }) {
    return (
        <div className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 rounded-xl bg-white">
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold mr-1">{rating}</span>
                </div>
            </div>
            <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-mainColor mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {name}
                </h3>
                <p className="text-gray-600 mb-4">{specialty}</p>
                <button className="w-full bg-mainColor hover:bg-blue-500 text-white py-3 rounded-lg transition-colors duration-300 transform hover:scale-105">
                    احجز موعد
                </button>
            </div>
        </div>
    );
}
