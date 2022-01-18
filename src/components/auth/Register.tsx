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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useCreateNewUserMutation } from "../../features/auth";
import { FC, useState } from "react";
import { BiUser } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";
import { GoDeviceMobile } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import food from "../../assets/food.avif";

const Register: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [newUser, result] = useCreateNewUserMutation();
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("Please enter your firstname")
      .min(4, "Enter atleast 4 character")
      .max(10, "First name cannot be longer than 20 characters"),
    last_name: Yup.string()
      .required("Please enter your lastname")
      .min(4, "Enter atleast 4 character")
      .max(10, "Last name cannot be longer than 20 characters"),
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
    mobile_number: Yup.string()
      .required("Please enter your mobile number")
      .matches(
        /^([9]\[78]\d{8}|[0-9]\d*)$/,
        "Phone number must start either with 98 or 97"
      )
      .min(10, "Too short")
      .max(10, "Too long"),
  });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const onSubmit = (values: any) => {
    newUser(values);
    setTimeout(() => {
      navigate("/login");
    }, 6000);
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
          <Heading color="white">Create your account here</Heading>
          <br />
          <Divider />
          <br />

          <Text as="kbd" color="white">
            Already have an acccount ? <Link to="/login">Log in</Link>
          </Text>
        </Box>
        <Box display="grid" justifyContent="center" p="4" mt="3">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiUser color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="First Name "
                  {...formik.getFieldProps("first_name")}
                />
              </InputGroup>
              {formik.touched.first_name && formik.errors.first_name ? (
                <Badge colorScheme="red" variant="solid" p="3">
                  {formik.errors.first_name}
                </Badge>
              ) : null}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiUser color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Last Name "
                  {...formik.getFieldProps("last_name")}
                />
              </InputGroup>
              {formik.touched.last_name && formik.errors.last_name ? (
                <Badge colorScheme="red" variant="solid" p="3">
                  {formik.errors.last_name}
                </Badge>
              ) : null}
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
                  children={<GoDeviceMobile color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="Mobile Number "
                  {...formik.getFieldProps("mobile_number")}
                />
              </InputGroup>
              {formik.touched.mobile_number && formik.errors.mobile_number ? (
                <Badge colorScheme="red" variant="solid" p="3">
                  {formik.errors.mobile_number}
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
              <Center>
                <Button size="md" p="4" colorScheme="twitter" type="submit">
                  Register
                </Button>
              </Center>
            </Stack>
          </form>
        </Box>
        {result.isLoading
          ? toast({
              title: "Processing",
              description: "We are creating your account for you.",
              status: "info",
              duration: 1000,
              isClosable: true,
              position: "top",
            })
          : null}
        {result.isSuccess
          ? toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 5000,
              position: "top",
              isClosable: true,
            })
          : null}
        {result.isError
          ? toast({
              title: "Account creation failed",
              description: "We're unable to create  account for you.",
              status: "error",
              duration: 3000,
              position: "top",
              isClosable: true,
            })
          : null}
      </SimpleGrid>
    </Container>
  );
};

export default Register;
