import { HomeNav } from "../components/homesection/HomeNav"
import OverView from "../components/homesection/OverView"
import Steps from "../components/homesection/Steps"
import Pricing from "../components/homesection/Pricing"
import Contact from "../components/homesection/Contact"
import Footer from "../components/homesection/Footer"
import FAQSection from "../components/homesection/FAQs"
import ScrolledButton from "./ScrolledButton"

const Homepage = () => {
  return (
    <div>
        <HomeNav/>
        <OverView/>
        <Steps/>
        <Pricing/>
        <FAQSection/>
        <Contact/>
        <Footer/>
        <ScrolledButton/>
    </div>
  )
}

export default Homepage