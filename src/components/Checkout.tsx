import {
  Accordion,
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useGetCartQuery } from "../features/cart";
import { CartItems } from "../types/cart";
import { BsCashCoin, BsCreditCard } from "react-icons/bs";
import CustomBreadcumb from "./CustomBreadcumb";

const Checkout: FC = () => {
  const [paymentId, setPaymentId] = useState("1");
  const cartData = useGetCartQuery();
  return (
    <>
      <CustomBreadcumb title="Checkout" />
      <Container p="4" maxW="80em">
        <SimpleGrid columns={2} minChildWidth="300px" spacing={30} p="4">
          <Box>
            <Heading size="lg">Your Order</Heading>
            <Accordion p="4">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" p="3">
                      <Heading size="md">Address</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" p="3">
                      <Heading size="md">Payment Method</Heading>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup
                    defaultValue="1"
                    onChange={setPaymentId}
                    value={paymentId}
                  >
                    <Stack>
                      <Radio value="1">
                        <HStack spacing={3}>
                          <BsCashCoin />
                          <Text>Cash on Delivery</Text>
                        </HStack>
                      </Radio>
                      <Radio value="2">
                        <HStack spacing={3}>
                          <BsCreditCard />
                          <Text>Card on Delivery</Text>
                        </HStack>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box bg="Menu" p="5">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {(cartData?.data?.data.cartProducts as CartItems[]).map(
                  (p: CartItems) => (
                    <Tr>
                      <Td>
                        {p.product.title} X {p.quantity}
                      </Td>
                      <Td>Rs {p.price}</Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
            <br />
            <br />
            <Flex>
              <Box>
                <Stack spacing={5}>
                  <Text>Order Amount</Text>
                  <Text>Cart Subtotal</Text>
                  <Text>Total </Text>
                  <Text>Delivery Address </Text>
                  <Text>Payment Method</Text>
                </Stack>
              </Box>
              <Spacer />
              <Box>
                <Stack spacing={5}>
                  <Text>Rs {cartData.data?.data.orderAmount}</Text>
                  <Text>Rs {cartData.data?.data.subTotal}</Text>
                  <Text color="red.400" fontWeight="bolder">
                    Rs {cartData.data?.data.total}
                  </Text>
                  <Text>Kathmandu ,Nepal</Text>
                  {paymentId === "1" ? (
                    <Text>Cash on Delivery</Text>
                  ) : (
                    <Text>Card on Delivery</Text>
                  )}
                </Stack>
              </Box>
            </Flex>
          </Box>
          <Button variant="solid" colorScheme="red">
            Place Order
          </Button>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Checkout;
