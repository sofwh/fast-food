import {
  AddIcon,
  CloseIcon,
  MinusIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  Center,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Avatar,
  IconButton,
  Text,
  Button,
  Spacer,
  Divider,
  Stack,
  HStack,
  useToast,
  Image,
  Input,
  Badge,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../features/cart";
import { CartItems } from "../types/cart";
import CustomBreadcumb from "./CustomBreadcumb";
import empty from "../assets/empty.svg";

const Cart: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCartQuery();
  const [deleteCart, result] = useDeleteCartMutation();
  const [deleteCartItem, response] = useDeleteCartItemMutation();
  const [updateCart, quantityResult] = useUpdateCartMutation();
  const handleUpdateCart = (cartProductId: number, quantity: number) => {
    updateCart({ cartProductId, quantity });
  };
  useEffect(() => {
    document.title = "FastFood | Cart";
  });
  return (
    <>
      <CustomBreadcumb title="Cart" />
      <Container maxW="80em" mt="4">
        <Box>
          {(data?.data.cartProducts as CartItems[]).length != 0 ? (
            <>
              <Center>
                <Heading>Your Cart Items</Heading>
              </Center>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>IMAGE</Th>
                    <Th>PRODUCT NAME</Th>
                    <Th>UNIT PRICE</Th>
                    <Th>QTY</Th>
                    <Th>SUBTOTAL</Th>
                    <Th>ACTION</Th>
                  </Tr>
                </Thead>
                {error || isLoading ? (
                  <Tbody>
                    <Tr>
                      <Td>No items</Td>
                    </Tr>
                  </Tbody>
                ) : null}
                <Tbody>
                  {(data?.data.cartProducts as CartItems[]).map(
                    (p: CartItems) => (
                      <Tr key={p.id}>
                        <Td>
                          <Avatar
                            src={p.product.images[0].imageName}
                            size="xl"
                          />
                        </Td>
                        <Td>{p.product.title}</Td>
                        <Td> Rs {p.product.unitPrice[0].sellingPrice}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              aria-label="Increase"
                              icon={<AddIcon />}
                              onClick={() => {
                                handleUpdateCart(p.id, p.quantity + 1);

                                if (quantityResult.isLoading) {
                                  toast({
                                    title: "Cart Item Updating .....",
                                    status: "info",
                                    duration: 3000,
                                    isClosable: true,
                                    position: "top",
                                  });
                                }
                              }}
                            />

                            <Badge variant="solid" p="3" colorScheme="red">
                              {p.quantity}
                            </Badge>
                            <IconButton
                              aria-label="Increase"
                              icon={<MinusIcon />}
                              onClick={() => {
                                handleUpdateCart(p.id, p.quantity - 1);
                                if (quantityResult.isLoading) {
                                  toast({
                                    title: "Cart Item Updating .....",
                                    status: "info",
                                    duration: 3000,
                                    isClosable: true,
                                    position: "top",
                                  });
                                }
                              }}
                            />
                          </HStack>
                        </Td>
                        <Td>Rs {p.price} </Td>
                        <Td>
                          <IconButton
                            aria-label="Remove-item"
                            icon={<CloseIcon />}
                            onClick={() => {
                              deleteCartItem(p.id);
                              if (response.isLoading) {
                                toast({
                                  title: "Cart Item deleting .....",
                                  status: "info",
                                  duration: 1000,
                                  isClosable: true,
                                  position: "top",
                                });
                              } else if (response.isSuccess) {
                                toast({
                                  title: "Cart Item deleted",
                                  status: "success",
                                  duration: 5000,
                                  position: "top",
                                  isClosable: true,
                                });
                              } else if (response.isError) {
                                toast({
                                  title: "Error occured",
                                  status: "error",
                                  duration: 1000,
                                  isClosable: true,
                                  position: "top",
                                });
                              }
                            }}
                          />
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
              <Box display="flex" p="5">
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Continue Shopping
                </Button>
                <Spacer />

                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    deleteCart();
                    if (result.isLoading) {
                      toast({
                        title: "Cart deleting .....",
                        status: "info",
                        duration: 1000,
                        isClosable: true,
                        position: "top",
                      });
                    } else if (result.isSuccess) {
                      toast({
                        title: "Cart deleted",
                        status: "success",
                        duration: 5000,
                        position: "top",
                        isClosable: true,
                      });
                      setTimeout(() => {
                        navigate(-1);
                      }, 3000);
                    } else if (result.isError) {
                      toast({
                        title: "Error occured",
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                        position: "top",
                      });
                    }
                  }}
                >
                  Clear shopping cart
                </Button>
              </Box>

              <Box display="flex">
                <Box></Box>
                <Spacer />
                <Box p="4">
                  <Text>Cart Total</Text>
                  <br />
                  <Divider />
                  <br />
                  <Stack spacing={3}>
                    <HStack spacing={9}>
                      <Text as="kbd">Total Order Amount </Text>
                      <Heading size="md" color="gray.500" mt="2">
                        Rs {data?.data.orderAmount}
                      </Heading>
                    </HStack>
                    <HStack spacing={9}>
                      <Text as="kbd">Discount </Text>
                      <Heading size="md" color="gray.500" mt="2">
                        Rs {data?.data.discount}
                      </Heading>
                    </HStack>
                    <HStack spacing={9}>
                      <Text as="kbd">Subtotal </Text>
                      <Heading size="md" color="gray.500" mt="2">
                        Rs {data?.data.subTotal}
                      </Heading>
                    </HStack>
                    <HStack spacing={9}>
                      <Text as="kbd">Delivery Charge </Text>
                      <Heading size="md" color="gray.500" mt="2">
                        Rs {data?.data.deliveryCharge}
                      </Heading>
                    </HStack>
                    <HStack spacing={9}>
                      <Heading size="lg">Grand Total </Heading>
                      <Heading size="lg" color="red" mt="2">
                        Rs {data?.data.total}
                      </Heading>
                    </HStack>
                  </Stack>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    mt="4"
                    onClick={() => {
                      navigate("/checkout");
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Center>
                <Stack spacing={4} p="4">
                  <Heading>Your Cart is empty</Heading>
                  <Image src={empty} alt="" />

                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Stack>
              </Center>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Cart;
