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
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useChangePasswordMutation } from "../../../features/auth";
import { MdOutlineAlternateEmail, MdPassword } from "react-icons/md";

const ChangePassword: FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [changePassword, result] = useChangePasswordMutation();
  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    old_password: Yup.string()
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
    new_password: Yup.string()
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
    confirm_password: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Passwords must match"
    ),
  });
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const handleClick1 = () => setShow1(!show1);
  const handleClick2 = () => setShow2(!show2);
  const handleClick3 = () => setShow3(!show3);
  const onSubmit = (values: any) => {
    changePassword(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <Container maxW="80em" p="4">
        <Center>
          <Box p="4">
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={5}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPassword color="gray.300" />}
                  />
                  <Input
                    pr="4.5rem"
                    type={show1 ? "text" : "password"}
                    placeholder="Old Password"
                    {...formik.getFieldProps("old_password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick1}
                      colorScheme="teal"
                      variant="solid"
                    >
                      {show1 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.old_password && formik.errors.old_password ? (
                  <Badge colorScheme="red" variant="solid" p="3">
                    {formik.errors.old_password}
                  </Badge>
                ) : null}

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPassword color="gray.300" />}
                  />
                  <Input
                    pr="4.5rem"
                    type={show2 ? "text" : "password"}
                    placeholder="New Password"
                    {...formik.getFieldProps("new_password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick2}
                      colorScheme="teal"
                      variant="solid"
                    >
                      {show2 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.new_password && formik.errors.new_password ? (
                  <Badge colorScheme="red" variant="solid" p="3">
                    {formik.errors.new_password}
                  </Badge>
                ) : null}

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPassword color="gray.300" />}
                  />
                  <Input
                    pr="4.5rem"
                    type={show3 ? "text" : "password"}
                    placeholder="Confirm new password"
                    {...formik.getFieldProps("confirm_password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick3}
                      colorScheme="teal"
                      variant="solid"
                    >
                      {show3 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <Badge colorScheme="red" variant="solid" p="3">
                    {formik.errors.confirm_password}
                  </Badge>
                ) : null}
                <Center>
                  <Button size="md" p="4" colorScheme="twitter" type="submit">
                    Change Password
                  </Button>
                </Center>
              </Stack>
            </form>
          </Box>
          {result.isLoading
            ? toast({
                title: "Processing",
                description: "Changing your password",
                status: "info",
                duration: 1000,
                isClosable: true,
                position: "top",
              })
            : null}
          {result.isSuccess
            ? toast({
                title: "Password Change",
                description: "You have changed your password",
                status: "success",
                duration: 5000,
                position: "top",
                isClosable: true,
              })
            : null}
          {result.isError
            ? toast({
                title: "Password Change failed",
                description: "You are unable to change your  password",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
              })
            : null}
        </Center>
      </Container>
    </>
  );
};

export default ChangePassword;
