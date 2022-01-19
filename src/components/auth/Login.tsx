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
import { useUserLoginMutation } from "../../features/auth";
import { FC, useState } from "react";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import food from "../../assets/food.avif";
import Cookies from "js-cookie";
import CustomBreadcumb from "../CustomBreadcumb";

const Login: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loginUser, result] = useUserLoginMutation();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Please enter your email address"),
    password: Yup.string()
      .min(8, "Password has a max length of 8 characters")
      .max(32, "Must not be long than 32 Character")
      .matches(/[A-Z]/, "Must contain one Uppercase")
      .matches(/[a-z]/, "Must contain one Lowercase")
      .matches(/[0-9]/, "Must contain one number")
      .matches(
        /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
        "Must contain one special character"
      )
      .required("Please enter your password"),
  });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const onSubmit = (values: any) => {
    loginUser(values);
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
        title: "Login Successful",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
      Cookies.set("access_token", result.data.access_token);
    } else if (result.isError) {
      toast({
        title: "Login Unsuccessful",
        description: "User credentials were incorrect",
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
    <>
      <CustomBreadcumb title="Login" />

      <Container p="4" maxW="90em" height="800px">
        <SimpleGrid
          minChildWidth="200px"
          spacing="40px"
          columns={2}
          border="1px solid black"
          p="4"
        >
          <Box p="4" height="500px" backgroundImage={`url(${food}) `}>
            <Heading color="white">Log in to your account</Heading>
            <br />
            <Divider />
            <br />

            <Text as="kbd" color="white">
              Dont't have an acccount ? <Link to="/register">Sign up</Link>
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

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPassword color="gray.300" />}
                  />
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                      colorScheme="teal"
                      variant="solid"
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password ? (
                  <Badge colorScheme="red" variant="solid" p="3">
                    {formik.errors.password}
                  </Badge>
                ) : null}
                <Box>
                  <Link to="/forgot-password">
                    <Text color="red">Forgot Password ?</Text>
                  </Link>
                </Box>
                <Center>
                  <Button size="md" p="4" colorScheme="twitter" type="submit">
                    Login
                  </Button>
                </Center>
              </Stack>
            </form>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Login;
