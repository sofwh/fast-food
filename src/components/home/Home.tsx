import { Box, Center, Container, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import HealthyDishes from "./HealthyDishes";
import InfoSection from "./InfoSection";
import SectionOne from "./SectionOne";

const Home: FC = () => {
  return (
    <>
      <SectionOne />
      <InfoSection />
      <Container maxWidth="80em" p="5">
        <Text as="kbd" align="left" fontSize="lg">
          Shop by Categories
        </Text>
        <Text fontSize="sm">We’ve got something for everyone </Text>
      </Container>
      <Categories />
      <Container maxWidth="80em" p="5">
        <Text as="kbd" align="left" fontSize="lg">
          Eat Healthy ,Stay Healthy
        </Text>
        <Text fontSize="sm">We’ve got something for everyone </Text>
      </Container>
      <HealthyDishes />
      <Banner />
      <Container maxWidth="80em" p="5">
        <Text as="kbd" align="left" fontSize="lg">
          Mouth Watering Dishes
        </Text>
        <Text fontSize="sm">We’ve got something for everyone </Text>
      </Container>
      <FeaturedProducts />
    </>
  );
};

export default Home;
