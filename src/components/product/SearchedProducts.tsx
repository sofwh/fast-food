import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  VStack,
  Stack,
  Text,
  Select,
  Divider,
  SimpleGrid,
  Skeleton,
  Image,
  Badge,
  Button,
  Center,
  IconButton,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";
import CategoryCard from "../category/CategoryCard";
import {
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowAbove,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useGetSearchedProuductByQueryQuery } from "../../features/products";
import { useNavigate, useParams } from "react-router";
import Pagination from "../Pagination";
import ProductModal from "../product/ProductModal";
import { Product } from "../../types/Products";
import { useAddToCartMutation } from "../../features/cart";

const SearchedProducts: FC = () => {
  const { searchQuery } = useParams<Record<string, string | undefined>>();
  const { data, error, isLoading } = useGetSearchedProuductByQueryQuery(
    searchQuery || ""
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState(1);
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(data?.data || []);
    document.title = `FastFood | ${searchQuery}`;
  }, [data, searchQuery]);

  // AddtoCart
  const toast = useToast();
  const [addToCart, result] = useAddToCartMutation();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const indexOfLastProd = currentPage * perPage;
  const indexOfFirstProd = indexOfLastProd - perPage;
  const currentProd = products.slice(indexOfFirstProd, indexOfLastProd);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Sorting
  const [sortValue, setSortValue] = useState<string | undefined>(undefined);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(event.target.value);
    console.log("SOrt value", sortValue);

    if (sortValue === "nameAsc") {
      const unsortedProducts = [...products];
      const foodItems = unsortedProducts.sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      setProducts([...foodItems]);
    } else if (sortValue === "nameDesc") {
      const unsortedProducts = [...products];

      const foodItems = unsortedProducts.sort((a, b) =>
        a.title < b.title ? 1 : -1
      );
      setProducts([...foodItems]);
    } else if (sortValue === "priceAsc") {
      const unsortedProducts = [...products];

      const foodItems = unsortedProducts.sort((a, b) =>
        a.unitPrice[0].sellingPrice > b.unitPrice[0].sellingPrice ? 1 : -1
      );
      setProducts([...foodItems]);
    } else if (sortValue === "priceDesc") {
      const unsortedProducts = [...products];

      const foodItems = unsortedProducts.sort((a, b) =>
        a.unitPrice[0].sellingPrice < b.unitPrice[0].sellingPrice ? 1 : -1
      );
      setProducts([...foodItems]);
    }
  };

  // Row-Column-Product
  const [style, setStyle] = useState(0);
  return (
    <Grid
      h="auto"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg="white" p="4">
        <CategoryCard />
      </GridItem>
      <GridItem rowSpan={2} colSpan={4} bg="white" p="4">
        <Box bg="Menu" p="4">
          <Stack>
            <HStack spacing={2}>
              <Heading fontSize="4xl" mr={4}>
                Searched Product : {searchQuery}
              </Heading>
            </HStack>

            {data?.data.length === 1 ? (
              <>
                <Text as="kbd" fontSize="xs">
                  {data?.data.length} product
                </Text>
              </>
            ) : (
              <>
                <Text as="kbd" fontSize="xs">
                  {data?.data.length} products
                </Text>
              </>
            )}
            <Divider />
            <div className="product-menu">
              <div>
                <ButtonGroup spacing={1}>
                  <IconButton
                    aria-label="Row"
                    colorScheme="red"
                    variant="outline"
                    icon={<AiOutlineInsertRowAbove size="20px" />}
                    onClick={() => {
                      setStyle(0);
                    }}
                  />
                  <IconButton
                    aria-label="Row"
                    colorScheme="red"
                    variant="outline"
                    icon={<AiOutlineInsertRowLeft size="20px" />}
                    onClick={() => {
                      setStyle(1);
                    }}
                  />
                </ButtonGroup>
              </div>

              <div>
                <HStack spacing={3}>
                  <Text fontSize="sm">Sort By</Text>
                  <Select size="md" onChange={handleChange}>
                    <option value="default">Select Option</option>
                    <option value="nameAsc">A to Z</option>
                    <option value="nameDesc">Z to A</option>
                    <option value="priceAsc">Price (Low to High)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                  </Select>
                </HStack>
              </div>
            </div>
          </Stack>
        </Box>
        {error || isLoading ? (
          <>
            <SimpleGrid minChildWidth="120px" spacing="40px">
              <Skeleton height="150px"></Skeleton>
              <Skeleton height="150px"></Skeleton>
              <Skeleton height="150px"></Skeleton>
              <Skeleton height="150px"></Skeleton>
            </SimpleGrid>
          </>
        ) : null}{" "}
        {style === 0 ? (
          <>
            <SimpleGrid columns={3} spacing="20px" p="4">
              {currentProd.map((s) => (
                <Box
                  maxW="xs"
                  borderWidth="1px"
                  borderRadius="base"
                  overflow="hidden"
                  p="4"
                  key={s.id}
                >
                  <Image src={s.images[0].imageName} alt="" />

                  <Box p="6" bg="Menu">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="red">
                        {s.categoryTitle}
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        <HStack>
                          <FaLocationArrow />
                          <p>{s.warehouses[0].title}</p>
                        </HStack>
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {s.title}
                    </Box>

                    <Box>Rs {s.unitPrice[0].sellingPrice}</Box>
                    <Box p="3">
                      <Center>
                        <VStack>
                          <Button
                            size="xs"
                            rightIcon={<AiOutlineSearch />}
                            onClick={() => {
                              navigate(`/product/${s.id}`);
                            }}
                          >
                            View Product
                          </Button>

                          <Button
                            size="xs"
                            rightIcon={<BsFillCartCheckFill />}
                            onClick={() => {
                              onOpen();
                              setProductId(s.id);
                              setProductName(s.title);
                              addToCart({
                                productId: s.id,
                                priceId: s?.unitPrice[0].id,
                                quantity: 1,
                              });

                              if (result.isLoading) {
                                toast({
                                  title: "Item adding to cart ...",
                                  status: "info",
                                  duration: 1000,
                                  isClosable: true,
                                  position: "top",
                                });
                              } else if (result.isSuccess) {
                                toast({
                                  title: "Item added to Cart",
                                  status: "success",
                                  duration: 5000,
                                  position: "top",
                                  isClosable: true,
                                });
                                setTimeout(() => {
                                  navigate("/");
                                }, 3000);
                              } else if (result.isError) {
                                toast({
                                  title: "Faile to add item",
                                  status: "error",
                                  duration: 1000,
                                  isClosable: true,
                                  position: "top",
                                });
                              }
                            }}
                          >
                            Add to Cart
                          </Button>
                        </VStack>
                      </Center>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <>
            <SimpleGrid columns={1} spacing="20px" p="4">
              {currentProd.map((s) => (
                <Box
                  maxW="lg"
                  borderWidth="1px"
                  borderRadius="base"
                  overflow="hidden"
                  p="4"
                  key={s.id}
                >
                  <Box display="flex">
                    <img
                      height="200px"
                      width="200px"
                      src={s.images[0].imageName}
                      alt={s.title}
                    />
                    <Box>
                      <Box p="6" bg="Menu" maxW="300px">
                        <Box display="flex" alignItems="baseline">
                          <Badge borderRadius="full" px="2" colorScheme="red">
                            {s.categoryTitle}
                          </Badge>
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                          >
                            <HStack>
                              <FaLocationArrow />
                              <p>{s.warehouses[0].title}</p>
                            </HStack>
                          </Box>
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          isTruncated
                        >
                          {s.title}
                        </Box>

                        <Box>Rs {s.unitPrice[0].sellingPrice}</Box>
                        <Box p="3">
                          <Center>
                            <VStack>
                              <Button
                                size="xs"
                                rightIcon={<AiOutlineSearch />}
                                onClick={() => {
                                  navigate(`/product/${s.id}`);
                                }}
                              >
                                View Product
                              </Button>

                              <Button
                                size="xs"
                                rightIcon={<BsFillCartCheckFill />}
                                onClick={() => {
                                  onOpen();
                                  setProductId(s.id);
                                  setProductName(s.title);
                                  addToCart({
                                    productId: s.id,
                                    priceId: s?.unitPrice[0].id,
                                    quantity: 1,
                                  });

                                  if (result.isLoading) {
                                    toast({
                                      title: "Item adding to cart ...",
                                      status: "info",
                                      duration: 1000,
                                      isClosable: true,
                                      position: "top",
                                    });
                                  } else if (result.isSuccess) {
                                    toast({
                                      title: "Item added to Cart",
                                      status: "success",
                                      duration: 5000,
                                      position: "top",
                                      isClosable: true,
                                    });
                                    setTimeout(() => {
                                      navigate("/");
                                    }, 3000);
                                  } else if (result.isError) {
                                    toast({
                                      title: "Faile to add item",
                                      status: "error",
                                      duration: 1000,
                                      isClosable: true,
                                      position: "top",
                                    });
                                  }
                                }}
                              >
                                Add to Cart
                              </Button>
                            </VStack>
                          </Center>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </>
        )}
        <Box>
          <Pagination
            itemsPerpage={perPage}
            totalItems={products.length}
            paginate={paginate}
          />
        </Box>
      </GridItem>
      <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Add{" "}
            <Text as="kbd" color="red.500">
              {productName}{" "}
            </Text>
            to your Cart
          </ModalHeader>
          <ModalBody>
            <ProductModal id={productId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default SearchedProducts;
