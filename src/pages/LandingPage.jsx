import Hero from '../components/landing/Hero.jsx'
import FeaturedProperties from '../components/landing/FeaturedProperties.jsx'
import TravelPartners from '../components/landing/TravelPartners.jsx'
import Bankpartners from '../components/landing/Bankpartners.jsx'
import Services from '../components/landing/Services.jsx'
import Categories from '../components/landing/Categories.jsx'
import PlanLayout from '../components/landing/Plan-Layout.jsx'
import AboutSection from '../components/landing/AboutSection.jsx'
import Facilities from '../components/landing/Facilities.jsx'
import Locationadvantage from '../components/landing/Locationadvantage.jsx'
export default function LandingPage() {
  return (
    <div className="space-y-16">
      <Hero />
      {/* <TravelPartners /> */}
      
       
      <AboutSection />
      <Bankpartners />
      
      <FeaturedProperties />
      
     
     
      
    
      {/* <PlanLayout /> */}
      {/* <Services /> */}
      {/* <Categories /> */}
      <Facilities />
      {/* <Locationadvantage /> */}
     
    </div>
  );
}


