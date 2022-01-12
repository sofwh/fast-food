import { Box, Image, Skeleton } from "@chakra-ui/react";
import { FC } from "react";
import { useGetHomeQuery } from "../../features/home";
import { DataDetails, HomeData } from "../../types/home";

const SectionOne: FC = () => {
  const { data, error, isLoading } = useGetHomeQuery();
  console.log("banner", data?.data);
  const homeData = data?.data;

  return (
    <div>
      {isLoading || error ? <Skeleton height="300px"></Skeleton> : null}
      {homeData
        ? (homeData[0].details as DataDetails[]).map((banner: DataDetails) =>
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
