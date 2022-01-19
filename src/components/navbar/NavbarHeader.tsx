import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  HStack,
  Flex,
  Box,
  Heading,
  Button,
  Spacer,
  Avatar,
  useToast,
  Text,
  Badge,
  Skeleton,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { FC, useState, FormEvent, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserProfileQuery } from "../../features/auth";
import { BiLogOutCircle } from "react-icons/bi";
import { useGetCartQuery } from "../../features/cart";

const NavbarHeader: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [queryValue, setQueryValue] = useState("");
  const { data, error, isLoading } = useUserProfileQuery();

  const CartItems = useGetCartQuery();
  const submitHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQueryValue(e.currentTarget.value);
  };

  const tokenValue = Cookies.get("access_token");

  return (
    <header className="header-padding">
      <SimpleGrid columns={4} minChildWidth="300px" spacing={20}>
        <Box>
          <Link to="/">
            <Heading as="h2">FastFood</Heading>
          </Link>
        </Box>

        <Box>
          <HStack>
            <Input
              type="text"
              value={queryValue}
              placeholder="Search product"
              onChange={submitHandler}
              maxW="200px"
            />
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              type="submit"
              onClick={() => {
                if (queryValue.trim() === "") {
                  toast({
                    title: "Enter minimum 1 character to search",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                  });
                } else {
                  setQueryValue(queryValue);
                  navigate(`/products/${queryValue}`);
                }
              }}
            />
          </HStack>
        </Box>
        <Box>
          <HStack>
            {tokenValue ? (
              <>
                <Link to="user/profile">
                  {error || isLoading ? (
                    <Flex>
                      <Avatar src="" />
                      <Box ml="3">
                        <HStack spacing={3}>
                          <Skeleton height="30px" width="150px"></Skeleton>
                          <Skeleton height="30px" width="50px"></Skeleton>
                        </HStack>
                      </Box>
                    </Flex>
                  ) : null}
                  {data ? (
                    <Flex>
                      <Avatar src={data?.data.image} />
                      <Box ml="3">
                        <Text fontWeight="bold">
                          {data?.data.firstName} {""} {data?.data.lastName}
                          <Badge ml="1" colorScheme="green">
                            {data?.data.total_loyalty_points === null
                              ? 0
                              : data?.data.total_loyalty_points}{" "}
                            points
                          </Badge>
                        </Text>
                      </Box>
                    </Flex>
                  ) : null}
                </Link>
              </>
            ) : (
              <>
                <HStack>
                  <Link to="/login">
                    <Text>Login</Text>
                  </Link>
                  <Text>/</Text>
                  <Link to="/register">
                    <Text>Register</Text>
                  </Link>
                </HStack>
              </>
            )}
            <Button
              leftIcon={<BsMinecartLoaded />}
              onClick={() => {
                navigate("/cart");
              }}
            >
              {CartItems.data?.data.cartProducts.length}
            </Button>
            {tokenValue ? (
              <Button
                aria-label="logout"
                rightIcon={<BiLogOutCircle />}
                onClick={() => {
                  Cookies.remove("access_token");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            ) : null}
          </HStack>
        </Box>
      </SimpleGrid>
    </header>
  );
};

export default NavbarHeader;
