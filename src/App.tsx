import { FC } from "react";
import Categories from "./components/home/Categories";
import HealthyDishes from "./components/home/HealthyDishes";
import InfoSection from "./components/home/InfoSection";
import SectionOne from "./components/home/SectionOne";
import NavbarHeader from "./components/navbar/NavbarHeader";

const App: FC = () => {
  return (
    <>
      <NavbarHeader />
      <SectionOne />
      <InfoSection />
      <Categories />
      <HealthyDishes />
    </>
  );
};

export default App;
