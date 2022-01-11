import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  HStack,
  Flex,
  Stack,
  Box,
  VStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaUser } from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { useGetCategoriesQuery } from "../../features/categories";

const NavbarHeader: FC = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();
  console.log("data", data?.data);
  return (
    <div>
      <header className="header-padding">
        <Flex>
          <Box>
            <HStack>
              <Input id="product" type="text" placeholder="Search product" />{" "}
              <IconButton aria-label="Search product" icon={<SearchIcon />} />
            </HStack>
          </Box>
          <Spacer />
          <Box>
            <VStack>
              <HStack>
                <Heading as="h2">Fast</Heading>
                <Heading>Food</Heading>
              </HStack>
              <div className="category-data">
                {data
                  ? data.data.map((c) => <p key={c.id}>{c.title}</p>)
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
