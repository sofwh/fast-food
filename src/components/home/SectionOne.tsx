import { Box, Image, Skeleton } from "@chakra-ui/react";
import { FC } from "react";
import { useGetHomeQuery } from "../../features/home";
import { DataDetails } from "../../types/home";

const SectionOne: FC = () => {
  const { data, error, isLoading } = useGetHomeQuery();

  return (
    <div>
      {isLoading || error ? <Skeleton height="300px"></Skeleton> : null}
      {data
        ? (data.data[0].details as DataDetails[]).map((banner: DataDetails) =>
            banner.position === 1 ? (
              <Box key={banner.id}>
                <Image
                  src={banner.images}
                  alt={banner.title}
                  className="banner-image"
                />
              </Box>
            ) : null
          )
        : null}
    </div>
  );
};

export default SectionOne;
