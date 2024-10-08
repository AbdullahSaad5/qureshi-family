import HeroSection from "../components/LandingPage/HeroSection";
import JoinFamily from "../components/LandingPage/JoinFamily";
import Verse from "../components/LandingPage/Verse";
import SearchMember from "../components/LandingPage/SearchMember";
import KalmaCounter from "../components/LandingPage/KalmaCounter";
import Qureshi from '../components/LandingPage/Qureshi'
import Card from '../components/LandingPage/Card'
import Records from "../components/LandingPage/Records"

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <Records/>
      <Qureshi/>
      <SearchMember />
      <KalmaCounter />
      <Card/>
      <Verse />
    </>
  );
}
