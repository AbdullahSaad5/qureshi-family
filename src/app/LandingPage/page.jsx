import HeroSection from "../components/LandingPage/HeroSection";
import JoinFamily from "../components/LandingPage/JoinFamily";
import Verse from "../components/LandingPage/Verse";
import SearchMember from "../components/LandingPage/SearchMember";
import KalmaCounter from "../components/LandingPage/KalmaCounter";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <KalmaCounter />
      <SearchMember />
      <Verse />
      <JoinFamily />
    </>
  );
}
