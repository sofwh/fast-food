import { Box, Container, Image, SimpleGrid, Skeleton } from "@chakra-ui/react";
import React, { FC } from "react";
import { useGetHomeQuery } from "../../features/home";
import { DataDetails } from "../../types/home";

const Banner: FC = () => {
  const { data, error, isLoading } = useGetHomeQuery();
  return (
    <>
      <Container maxWidth="80em" p="5">
        {error || isLoading ? (
          <SimpleGrid>
            <Skeleton height="100px" width="200px"></Skeleton>
            <Skeleton height="100px" width="200px"></Skeleton>
          </SimpleGrid>
        ) : null}
        <SimpleGrid columns={2}>
          {data
            ? (data.data[5].details as DataDetails[]).map((a: DataDetails) =>
                a.position === 1 || a.position === 2 ? (
                  <Box key={a.id}>
                    <Image src={a.images} alt={a.title} />
                  </Box>
                ) : null
              )
            : null}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Banner;
