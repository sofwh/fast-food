import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Container,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import CustomBreadcumb from "../../CustomBreadcumb";
import ChangePassword from "./ChangePassword";
import DeliveryAddress from "./DeliveryAddress";
import OrderHistory from "./OrderHistory";
import UserInformation from "./UserInformation";

const UserProfile = () => {
  useEffect(() => {
    document.title = `FastFood | User Profile`;
  });
  return (
    <>
      <CustomBreadcumb title="User Profile" />
      <Container p="5" height="600px" maxW="80em">
        <Tabs isFitted variant="enclosed" colorScheme="red">
          <TabList>
            <Tab>User Information</Tab>
            <Tab>Change Password</Tab>
            <Tab>Order History</Tab>
            <Tab>Delivery Address</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserInformation />
            </TabPanel>
            <TabPanel>
              <ChangePassword />
            </TabPanel>
            <TabPanel>
              <OrderHistory />
            </TabPanel>
            <TabPanel>
              <DeliveryAddress />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default UserProfile;
