import { DoctorCard } from "./DoctorCard";

const doctors = [
    {
        name: "د. محمد أحمد",
        specialty: "أخصائي طب عام",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=300&fit=crop"
    },
    {
        name: "د. سارة خالد",
        specialty: "أخصائية طب أطفال",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&h=300&fit=crop"
    },
    {
        name: "د. أحمد محمود",
        specialty: "جراح عام",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=300&fit=crop"
    }
];

const handleShowMore=()=>{
    console.log("Doctor");
}

export function FeaturedDoctors() {
    return (
        <div className="container mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold text-center mb-12 text-mainColor">أطباء مميزون</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.name} {...doctor} />
                ))}
            </div>
            <button
                className="relative mx-auto mt-3 py-2 px-6 group bg-transparent border-2 border-mainColor text-mainColor hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center gap-5"
                onClick={() => handleShowMore()}
            >
                <span className="text-lg font-bold">عرض المزيد</span>
                <svg
                    width="15px"
                    height="10px"
                    viewBox="0 0 13 10"
                    className="transform group-hover:translate-x-1 transition-all duration-300"
                >
                    <path d="M1,5 L11,5" />
                    <polyline points="8 1 12 5 8 9" />
                </svg>
                <span className="absolute top-0 left-0 block w-full h-full rounded-full bg-white opacity-10 group-hover:opacity-30 transition-all duration-300"></span>
            </button>



        </div>
    );
}