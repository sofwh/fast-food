import { Center, Container, Image } from "@chakra-ui/react";
import { FC } from "react";
import pagenotfound from "../assets/pagenotfound.svg";

const PageNotFound: FC = () => {
  return (
    <>
      <Container maxWidth="80em">
        <Center>
          <Image src={pagenotfound} alt="Page not found" />
        </Center>
      </Container>
    </>
  );
};

export default PageNotFound;
