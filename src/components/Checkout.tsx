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
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useGetCartQuery } from "../features/cart";
import { CartItems } from "../types/cart";
import { BsCashCoin, BsCreditCard } from "react-icons/bs";
import CustomBreadcumb from "./CustomBreadcumb";
import DeliveryAddress from "./auth/User/DeliveryAddress";
import { useGetAddressQuery } from "../features/address";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [paymentId, setPaymentId] = useState("1");
  const cartData = useGetCartQuery();
  const navigate = useNavigate();
  const toast = useToast();
  const { data, error, isLoading } = useGetAddressQuery();

  useEffect(() => {
    document.title = "FastFood | Checkout";
  });
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
                  <DeliveryAddress />
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
                    <Tr key={p.id}>
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
                  {data?.data.map((s) =>
                    s.isDefault ? (
                      <>
                        <Text isTruncated key={s.id}>
                          {s.detail.formatted_address}
                        </Text>
                      </>
                    ) : null
                  )}

                  {paymentId === "1" ? (
                    <Text>Cash on Delivery</Text>
                  ) : (
                    <Text>Card on Delivery</Text>
                  )}
                </Stack>
              </Box>
            </Flex>
            <Button
              variant="solid"
              colorScheme="red"
              mt="5"
              onClick={() => {
                toast({
                  title: "Your order is placed",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                  position: "top",
                });
                navigate("/");
              }}
            >
              Place Order
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Checkout;
