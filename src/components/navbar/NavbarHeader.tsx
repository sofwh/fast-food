import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  HStack,
  Flex,
  Box,
  VStack,
  Heading,
  Button,
  Spacer,
  Avatar,
  useToast,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FC, useState, FormEvent, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserProfileQuery } from "../../features/auth";
import { BiLogOutCircle } from "react-icons/bi";

const NavbarHeader: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [queryValue, setQueryValue] = useState("");
  const { data, error, isLoading } = useUserProfileQuery();

  const submitHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQueryValue(e.currentTarget.value);
  };

  const tokenValue = Cookies.get("access_token");

  const [accessToken, setAccessToken] = useState(tokenValue);

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);
  return (
    <div>
      <header className="header-padding">
        <Flex>
          <Box>
            <HStack>
              <Input
                type="text"
                value={queryValue}
                placeholder="Search product"
                onChange={submitHandler}
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
          <Spacer />
          <Box>
            <VStack>
              <HStack>
                <Link to="/">
                  <Heading as="h2">FastFood</Heading>
                </Link>
              </HStack>
            </VStack>
          </Box>
          <Spacer />

          <Box>
            <HStack>
              {tokenValue ? (
                <>
                  <Link to="user/profile">
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
              <IconButton aria-label="cart" icon={<BsMinecartLoaded />} />
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
        </Flex>
      </header>
    </div>
  );
};

export default NavbarHeader;
