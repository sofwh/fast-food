import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Center,
  Badge,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import breadcumbImage from "../assets/bc.png";

interface titleProps {
  title?: string;
}

const CustomBreadcumb: FC<titleProps> = (title) => {
  return (
    <Box p="5" backgroundImage={`url(${breadcumbImage})`} height="200px">
      <Breadcrumb
        mt="100px"
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <Link to="/">
            <Text as="kbd" fontSize="2xl" fontWeight="bold" color="gray.500">
              Home
            </Text>
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <Text as="kbd" fontSize="2xl" fontWeight="bold" color="gray.500">
            {title.title}
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
};

export default CustomBreadcumb;
