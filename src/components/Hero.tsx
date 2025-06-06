
import HeroContent from './hero/HeroContent';
import HeroFeatures from './hero/HeroFeatures';
import HeroStats from './hero/HeroStats';
import HeroDoctorCard from './hero/HeroDoctorCard';
import HeroTrustIndicators from './hero/HeroTrustIndicators';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-arogya-light-blue via-white to-arogya-beige-yellow/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <HeroContent />
            <HeroFeatures />
            <HeroStats />
          </div>
          
          <HeroDoctorCard />
        </div>

        <HeroTrustIndicators />
      </div>
    </section>
  );
};

export default Hero;
