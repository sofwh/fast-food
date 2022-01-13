import {
  List,
  ListItem,
  Text,
  ListIcon,
  Stack,
  Skeleton,
  Button,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useGetCategoriesQuery } from "../../features/categories";
import { MdFoodBank } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const CategoryCard = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCategoriesQuery();
  return (
    <>
      <Text as="kbd">CATEGORIES</Text>
      <Divider p="3" />
      <br />
      <List spacing={10}>
        {error || isLoading ? (
          <Stack>
            <Skeleton height="30px"></Skeleton>
            <Skeleton height="30px"></Skeleton>
            <Skeleton height="30px"></Skeleton>
            <Skeleton height="30px"></Skeleton>
            <Skeleton height="30px"></Skeleton>
          </Stack>
        ) : null}
        {data
          ? data.data.map((c) => (
              <ListItem key={c.id}>
                <ListIcon as={MdFoodBank} color="red" />
                <Button
                  onClick={() => {
                    navigate(`/category/${c.id}`);
                  }}
                >
                  {c.title}
                </Button>
              </ListItem>
            ))
          : null}
        <Divider p="3" />
      </List>
    </>
  );
};

export default CategoryCard;
