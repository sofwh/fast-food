import {
  Box,
  Container,
  Skeleton,
  Image,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useGetHomeQuery } from "../../features/home";
import { Product } from "../../types/Products";

const HealthyDishes: FC = () => {
  const { data, error, isLoading } = useGetHomeQuery();
  return (
    <>
      {error || isLoading ? (
        <Container maxW="80rem" p="4">
          <Skeleton height="300px"></Skeleton>
        </Container>
      ) : null}

      {data
        ? (data.data[4].sectionDetails.products as Product[]).map(
            (p: Product) => (
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image src={p.images[0].imageName} alt="" />

                <Box p="6">
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

                  <Box>
                    Rs {p.unitPrice[0].sellingPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                      / unit
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          )
        : null}
    </>
  );
};

export default HealthyDishes;
