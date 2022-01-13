import React, { FC } from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  Select,
  Divider,
  SimpleGrid,
  Skeleton,
  Image,
  Badge,
} from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";
import CategoryCard from "../category/CategoryCard";
import {
  AiOutlineInsertRowLeft,
  AiOutlineInsertRowAbove,
} from "react-icons/ai";
import { useGetProductByCategoryQuery } from "../../features/products";
import { useParams } from "react-router-dom";

interface idProps {
  id?: number;
}

const Product: FC<idProps> = () => {
  const params = useParams();
  const id = parseInt(params.id!.toString());
  const { data, error, isLoading } = useGetProductByCategoryQuery(id);
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
      <GridItem colSpan={4} bg="white" p="4">
        <Box bg="Menu" p="4">
          <Stack>
            <Text as="kbd" fontSize="4xl" mr={4}>
              {data?.data[0].categoryTitle}
            </Text>
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
                <HStack spacing={10}>
                  <AiOutlineInsertRowLeft size="20px" />
                  <AiOutlineInsertRowAbove size="20px" />
                </HStack>
              </div>
              <div>
                <HStack spacing={3}>
                  <Text fontSize="sm">Sort By</Text>
                  <Select placeholder="Select Option" size="md">
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
        ) : (
          <SimpleGrid columns={3} spacing="20px" p="4">
            {data?.data.map((s) => (
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
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </GridItem>
    </Grid>
  );
};

export default Product;
