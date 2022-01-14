import {
  SimpleGrid,
  Box,
  Container,
  Skeleton,
  HStack,
  Image,
  Text,
  Divider,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../features/products";
import boafresh from "../../assets/boafresh.png";
import { ImageDetails } from "../../types/Products";

interface slugProps {
  id?: number;
}
const SingleProduct: FC<slugProps> = () => {
  const params = useParams();
  const id = parseInt(params.id!.toString());
  const { data, error, isLoading } = useGetSingleProductQuery(id);
  const [quantityValue, setQuantityValue] = useState<string | "1">("1");

  const handleChange = (quantityValue: string) =>
    setQuantityValue(quantityValue as string);
  return (
    <Container maxW="70em">
      <SimpleGrid minChildWidth="200px" spacing="40px" m="20px">
        {error || isLoading ? (
          <>
            <Box>
              <Skeleton height="400px"></Skeleton>
              <br />
              <Skeleton height="50px" width="100px"></Skeleton>
            </Box>
            <Box>
              <Skeleton height="30px" width="200px"></Skeleton>
              <br />
              <Skeleton height="30px" width="200px"></Skeleton>
              <br />

              <Skeleton height="50px" width="200px"></Skeleton>
              <br />

              <HStack>
                <Skeleton height="50px" width="200px"></Skeleton>
                <Skeleton height="30px" width="200px"></Skeleton>
              </HStack>
            </Box>
          </>
        ) : null}

        {data ? (
          <>
            <Box bg="white" height="700px">
              {(data.data.images as ImageDetails[]).length ? (
                <>
                  <Carousel showArrows={true} autoPlay infiniteLoop>
                    {data.data.images &&
                      data.data.images.map((i) => (
                        <img src={i.imageName} key={i.id} alt="" />
                      ))}
                  </Carousel>
                </>
              ) : (
                <Image src={boafresh} alt="" />
              )}
            </Box>
            <Box bg="white" height="500px">
              <Text fontSize="20px" fontWeight="bolder">
                {data.data.title}
              </Text>
              <br />
              <Divider />
              <br />

              <Text as="kbd">
                Category :{" "}
                <Badge p="2" color="red">
                  {data.data.categoryTitle}
                </Badge>
              </Text>
              <br />
              <br />
              <Divider />
              <br />

              <Text color="green.500" fontWeight="bolder">
                NRS{" "}
                {data.data.unitPrice[0].sellingPrice * parseInt(quantityValue)}
                (Including Tax){" "}
              </Text>
              <br />
              <Divider />
              <br />

              <HStack>
                <NumberInput
                  allowMouseWheel
                  size="md"
                  maxW="5em"
                  step={1}
                  defaultValue={1}
                  min={1}
                  max={data.data.unitPrice[0].stock}
                  value={quantityValue}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Button colorScheme="green">Add to Cart</Button>
              </HStack>
            </Box>
          </>
        ) : null}
      </SimpleGrid>
    </Container>
  );
};

export default SingleProduct;
