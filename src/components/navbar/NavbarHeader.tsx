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
  FormControl,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { useGetCategoriesQuery } from "../../features/categories";
import { Link, useNavigate } from "react-router-dom";

const NavbarHeader: FC = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [queryValue, setQueryValue] = useState<string | undefined>("");

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
              />
              <Button
                type="submit"
                onClick={() => {
                  setQueryValue(queryValue);

                  navigate(`/products/${queryValue}`);
                }}
              >
                Search
              </Button>
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
              <IconButton aria-label="cart" icon={<BsMinecartLoaded />} />
            </HStack>
          </Box>
        </Flex>
      </header>
    </div>
  );
};

export default NavbarHeader;
