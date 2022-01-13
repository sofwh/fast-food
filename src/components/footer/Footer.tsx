import { Box, Center, Text } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <>
      <Box bg="ThreeDFace" p="4" m="4">
        <Center>
          <Text as="kbd"> Made with 💌 by Sirjan</Text>
        </Center>
      </Box>
    </>
  );
};

export default Footer;
