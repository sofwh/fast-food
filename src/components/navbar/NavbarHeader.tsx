import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  HStack,
  Flex,
  Box,
  VStack,
  Heading,
  Spacer,
  Button,
  useToast,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FC, useState, FormEvent, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { useGetCategoriesQuery } from "../../features/categories";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavbarHeader: FC = () => {
  const toast = useToast();
  const { data, error, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [queryValue, setQueryValue] = useState("");

  const submitHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQueryValue(e.currentTarget.value);
  };

  const tokenValue = Cookies.get("access_token");

  const [accessToken, setAccessToken] = useState(tokenValue);

  useEffect(() => {
    setAccessToken(accessToken);
  }, []);
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
              <div className="category-data">
                {error || isLoading ? (
                  <Button
                    isLoading
                    loadingText="Categories"
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="start"
                  >
                    Categories
                  </Button>
                ) : null}
                {data
                  ? data.data.map((c) => (
                      <Link to={`category/${c.id}`} key={c.id}>
                        <Button variant="outline">{c.title}</Button>
                      </Link>
                    ))
                  : null}
              </div>
            </VStack>
          </Box>
          <Spacer />

          <Box>
            <HStack>
              <IconButton aria-label="account" icon={<FaUser />} />

              {tokenValue ? (
                <>
                  {" "}
                  <Link to="user/profile">
                    <Badge variant="solid">
                      {Cookies.get("firstName")} {Cookies.get("lastName")}
                    </Badge>
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
            </HStack>
          </Box>
        </Flex>
      </header>
    </div>
  );
};

export default NavbarHeader;
