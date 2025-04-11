import Banner from "../components/Banner";
import banner from "../assets/banner.png";
import mobileBanner from "../assets/mobileBanner.png"
import "../styles/Navbar.css"
import WeightGain from "../components/WeightGain";
import NewLaunched from "../components/NewLaunched";
import RecipeStory from "../components/RecipeStory";
import ComingSoon from "../components/ComingSoon";
import Footer from "../components/Footer";

export default function Home(){
    return(
        <>
        <Banner
        desktopBanners={[banner]}
        mobileBanners={[mobileBanner]}
        />
        <WeightGain/>
        <NewLaunched/>
        <RecipeStory/>
        <ComingSoon/>
        <Footer/>
        </>
    )
}