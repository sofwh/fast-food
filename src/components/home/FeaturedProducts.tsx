import {
  Box,
  Container,
  Skeleton,
  Button,
  Center,
  Image,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import { useGetHomeQuery } from "../../features/home";
import { Product } from "../../types/Products";
import { useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const FeaturedProducts: FC = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetHomeQuery();
  return (
    <>
      {" "}
      <Container maxWidth="80em">
        <Carousel responsive={responsive}>
          {data ? (
            (data.data[6].sectionDetails.products as Product[]).map(
              (p: Product) => (
                <Box
                  maxW="xs"
                  borderWidth="1px"
                  borderRadius="base"
                  overflow="hidden"
                  p="4"
                  key={p.id}
                >
                  <Image src={p.images[0].imageName} alt="" />

                  <Box p="6" bg="Menu">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="red">
                        {p.categoryTitle}
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
                          <p>{p.warehouses[0].title}</p>
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
                      {p.title}
                    </Box>

                    <Box>Rs {p.unitPrice[0].sellingPrice}</Box>

                    <Box p="3">
                      <Center>
                        <HStack>
                          <Button
                            size="xs"
                            rightIcon={<AiOutlineSearch />}
                            onClick={() => {
                              navigate(`product/${p.id}`);
                            }}
                          >
                            View Product
                          </Button>

                          <Button size="xs" rightIcon={<BsFillCartCheckFill />}>
                            Add to Cart
                          </Button>
                        </HStack>
                      </Center>
                    </Box>
                  </Box>
                </Box>
              )
            )
          ) : error || isLoading ? (
            <HStack>
              <Skeleton height="300px"></Skeleton>
              <Skeleton height="300px"></Skeleton>
              <Skeleton height="300px"></Skeleton>
            </HStack>
          ) : null}
        </Carousel>
      </Container>
    </>
  );
};

export default FeaturedProducts;
