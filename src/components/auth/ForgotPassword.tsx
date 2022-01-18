import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Center,
  Badge,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../../features/auth";
import { FC } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import food from "../../assets/food.avif";

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loginUser, result] = useForgotPasswordMutation();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Please enter your email address"),
  });
  const onSubmit = (values: any) => {
    loginUser(values.email);
    if (result.isLoading) {
      toast({
        title: "Processing",
        status: "info",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else if (result.isSuccess) {
      toast({
        title: "Link Sent",
        description: `Link has been sent to ${values.email}`,
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 6000);
    } else if (result.isError) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Container p="4" maxW="90em" height="800px">
      <SimpleGrid
        minChildWidth="200px"
        spacing="40px"
        columns={2}
        border="1px solid black"
        p="4"
      >
        <Box p="4" height="500px" backgroundImage={`url(${food}) `}>
          <Heading color="white">Forgot your password ?</Heading>
          <br />
          <Divider />
          <br />

          <Text as="kbd" color="white">
            Have you remembered ? <Link to="/login">Login</Link>
          </Text>
        </Box>
        <Box display="grid" justifyContent="center" p="4" mt="5">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdOutlineAlternateEmail color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Email Address "
                  {...formik.getFieldProps("email")}
                />
              </InputGroup>
              {formik.touched.email && formik.errors.email ? (
                <Badge colorScheme="red" variant="solid" p="3">
                  {formik.errors.email}
                </Badge>
              ) : null}

              <Center>
                <Button size="md" p="4" colorScheme="twitter" type="submit">
                  Get Link
                </Button>
              </Center>
            </Stack>
          </form>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default ForgotPassword;
