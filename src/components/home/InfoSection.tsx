import { Icon } from "@chakra-ui/icons";
import {
  Container,
  Grid,
  Box,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { FaShippingFast } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { GiCash, GiReturnArrow } from "react-icons/gi";

const InfoSection: FC = () => {
  return (
    <div>
      <Container p="4" maxW="80rem" centerContent>
        <Box border="1px solid black" p="5">
          <Grid templateColumns="repeat(4,1fr)" gap={2}>
            <GridItem w="100%" h="100" bg="white">
              <HStack spacing="2">
                <FaShippingFast size="50" />
                <VStack>
                  <Text className="info-header">Free Shipping</Text>
                  <Text as="i" className="info-text">
                    On orders over Rs. 1500
                  </Text>
                </VStack>
              </HStack>
            </GridItem>
            <GridItem w="100%" h="100" bg="white">
              <HStack spacing="2">
                <GiReturnArrow size="50" />
                <VStack>
                  <Text className="info-header">Free Returns</Text>
                  <Text as="i" className="info-text">
                    Free returns within 24 hours of delivery
                  </Text>
                </VStack>
              </HStack>
            </GridItem>
            <GridItem w="100%" h="100" bg="white">
              <HStack spacing="2">
                <GiCash size="50" />
                <VStack>
                  <Text className="info-header">100% Payment Secure</Text>
                  <Text as="i" className="info-text">
                    Your payment are safe with us
                  </Text>
                </VStack>
              </HStack>
            </GridItem>
            <GridItem w="100%" h="100" bg="white">
              <HStack spacing="2">
                <BiPhoneCall size="50" />
                <VStack>
                  <Text className="info-header">Support 10 Am - 4 Pm</Text>
                  <Text as="i" className="info-text">
                    Contact us from 10 am to 4 pm, every Sunday to Friday
                  </Text>
                </VStack>
              </HStack>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default InfoSection;
