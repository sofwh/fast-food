import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FC } from "react";
import {
  useUpdateUserMutation,
  useUserProfileQuery,
} from "../../../features/auth";
import { useNavigate } from "react-router-dom";

const UserInformation: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, error, isLoading } = useUserProfileQuery();
  const [updateProfile, result] = useUpdateUserMutation();
  const initialValues = {
    first_name: "",
    last_name: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(4, "Enter atleast 4 character")
      .max(10, "First name cannot be longer than 20 characters"),
    last_name: Yup.string()
      .min(4, "Enter atleast 4 character")
      .max(10, "Last name cannot be longer than 20 characters"),
  });
  const onSubmit = (values: any) => {
    updateProfile(values);
    if (result.isLoading) {
      toast({
        title: "Updating",
        description: "We are updating your account for you.",
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else if (result.isSuccess) {
      toast({
        title: "Profile Updated",
        description: "We've updated your account for you.",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Profile Update failed",
        description: "We're unable to update  account for you.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <Container p="4" maxW="80em">
        {error || isLoading ? (
          <>
            <SimpleGrid columns={2}>
              <Box p="4">
                <Skeleton height="400px"></Skeleton>
              </Box>
              <Box p="5" mt="10">
                <HStack>
                  <Skeleton height="30px" width="90px"></Skeleton>
                  <Skeleton height="30px" width="200px"></Skeleton>
                </HStack>
                <br />
                <HStack>
                  <Skeleton height="30px" width="90px"></Skeleton>
                  <Skeleton height="30px" width="200px"></Skeleton>
                </HStack>
                <br />

                <HStack>
                  <Skeleton height="30px" width="90px"></Skeleton>
                  <Skeleton height="30px" width="200px"></Skeleton>
                </HStack>
                <br />

                <HStack>
                  <Skeleton height="30px" width="90px"></Skeleton>
                  <Skeleton height="30px" width="200px"></Skeleton>
                </HStack>
                <br />

                <HStack>
                  <Skeleton height="30px" width="90px"></Skeleton>
                  <Skeleton height="30px" width="200px"></Skeleton>
                </HStack>
              </Box>
            </SimpleGrid>
          </>
        ) : null}

        {data ? (
          <>
            <SimpleGrid columns={2} minChildWidth="400px">
              <Box p="4">
                <Stack spacing={5}>
                  <Image src={data.data.image} alt="" />

                  <Heading size="lg" p="4" align="center">
                    {data.data.firstName} {""} {data.data.lastName}
                  </Heading>
                </Stack>
              </Box>

              <Box p="5" mt="10">
                <form onSubmit={formik.handleSubmit}>
                  <HStack>
                    <Badge variant="solid" p="2">
                      First Name
                    </Badge>
                    <Input
                      placeholder={data.data.firstName}
                      {...formik.getFieldProps("first_name")}
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                      <Badge colorScheme="red" variant="solid" p="3">
                        {formik.errors.first_name}
                      </Badge>
                    ) : null}
                  </HStack>
                  <br />
                  <HStack>
                    <Badge variant="solid" p="2">
                      Last Name
                    </Badge>
                    <Input
                      placeholder={data.data.lastName}
                      {...formik.getFieldProps("last_name")}
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                      <Badge colorScheme="red" variant="solid" p="3">
                        {formik.errors.last_name}
                      </Badge>
                    ) : null}
                  </HStack>
                  <br />
                  <HStack>
                    <Badge variant="solid" p="2">
                      Email Address
                    </Badge>
                    <Input isDisabled value={data.data.email} />
                  </HStack>
                  <br />

                  <HStack>
                    <Badge variant="solid" p="2">
                      Mobile Number
                    </Badge>
                    <Input isDisabled value={data.data.mobileNumber} />
                  </HStack>
                  <br />
                  <Center>
                    <Button variant="solid" type="submit">
                      Save
                    </Button>
                  </Center>
                </form>
              </Box>
            </SimpleGrid>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default UserInformation;
