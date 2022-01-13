import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Container,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useGetHomeQuery } from "../../features/home";

const Categories: FC = () => {
  const { data, error, isLoading } = useGetHomeQuery();
  return (
    <div>
      {isLoading || error ? (
        <Container>
          <Center>
            <HStack>
              <Box padding="6" boxShadow="lg" bg="white">
                <HStack>
                  <SkeletonCircle size="10" />
                  <Skeleton height="50px" />
                </HStack>
              </Box>

              <Box padding="6" boxShadow="lg" bg="white">
                <HStack>
                  <SkeletonCircle size="10" />
                  <Skeleton height="50px" />
                </HStack>
              </Box>
              <Box padding="6" boxShadow="lg" bg="white">
                <HStack>
                  <SkeletonCircle size="10" />
                  <Skeleton height="50px" />
                </HStack>
              </Box>
            </HStack>
          </Center>
        </Container>
      ) : null}
      <Container maxW="80rem">
        <SimpleGrid minChildWidth="150px" spacing="10px">
          {data
            ? data.data[1].categories.map((c) => (
                <Box p="3" backgroundImage={c.icon} key={c.id}>
                  <VStack>
                    <Avatar src={c.backgroundImage} />
                    <Box
                      ml="3"
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Text fontWeight="bold">{c.title}</Text>
                      <Badge m="3" colorScheme="green">
                        {c.productCount} products
                      </Badge>
                      <Link to={`category/${c.id}`}>
                        <Button
                          rightIcon={<TriangleDownIcon />}
                          variant="outline"
                          size="xs"
                          color="red"
                        >
                          Shop Now
                        </Button>
                      </Link>
                    </Box>
                  </VStack>
                </Box>
              ))
            : null}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default Categories;
