import { Features } from "./components/Home/Features";
import { SearchSection } from "./components/Home/SearchSection";
import SliderHome from "./components/Home/SliderHome";
import { FeaturedDoctors } from "./components/Home/SpecialDoctor/FeaturedDoctors";
import { Specialties } from "./components/Home/Specialties";

function Home() {
    
    return(
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50" dir="rtl">
 
            <SliderHome/>
            <Specialties/>
            <FeaturedDoctors/>
            <SearchSection/>
            <Features />
        </div>

    )
}
export default Home;