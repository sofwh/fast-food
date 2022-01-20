import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Container,
  Box,
  IconButton,
  Text,
  Badge,
  Center,
  Button,
  useToast,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Stack,
  Image,
  Heading,
  HStack,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import {
  useDeleteAddressMutation,
  useGetAddressQuery,
  useNewAddressMutation,
} from "../../../features/address";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerImg from "../../../assets/marker.png";
import empty from "../../../assets/empty.svg";
import { BiStar } from "react-icons/bi";

const DeliveryAddress = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, isLoading } = useGetAddressQuery();
  const [marker, setMarker] = useState([]);
  const [addressTitle, setAddressTitle] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setAddressTitle(e.currentTarget.value);
  };

  const MyComponent = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarker([e.latlng]);
        map.locate();
      },
      locationfound: (location) => {
        console.log(location);
      },
    });
    return null;
  };
  const markerIcon = new L.Icon({
    iconUrl: markerImg,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const handleChange = (e) => {
    setAddressTitle(e.target.value);
  };
  const [deleteAddress, result] = useDeleteAddressMutation();
  const [addAddress, response] = useNewAddressMutation();
  return (
    <Container maxW="80em">
      <Box>
        <Box>
          {data
            ? data?.data.map((d) => (
                <Box p="3" key={d.id} border="1px solid black" mb="3">
                  <Stack spacing={4}>
                    <HStack spacing={5}>
                      <Badge p="2" variant="solid" colorScheme="telegram">
                        {" "}
                        Address title :{" "}
                      </Badge>
                      <Badge p="2" isTruncated>
                        {d.title}
                      </Badge>
                    </HStack>
                    <HStack spacing={5}>
                      <Badge p="2" variant="solid" colorScheme="telegram">
                        Location :{" "}
                      </Badge>
                      <Badge p="2" isTruncated>
                        {" "}
                        {d.detail.formatted_address}
                      </Badge>
                    </HStack>
                    {d.isDefault ? (
                      <>
                        <BiStar />
                      </>
                    ) : null}
                    <Center>
                      <IconButton
                        aria-label="Delete address"
                        colorScheme="red"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          deleteAddress(d.id);
                          if (result.isLoading) {
                            toast({
                              title: "Deleting...",
                              status: "info",
                              duration: 1000,
                              isClosable: true,
                              position: "top",
                            });
                          } else if (result.isSuccess) {
                            toast({
                              title: "Delivery Address Deleted",
                              status: "success",
                              duration: 5000,
                              position: "top",
                              isClosable: true,
                            });
                          } else if (result.isError) {
                            toast({
                              title: "Deletion Unsuccessful",
                              description: "Unable to delete address",
                              status: "error",
                              duration: 1000,
                              isClosable: true,
                              position: "top",
                            });
                          }
                        }}
                      />
                    </Center>
                  </Stack>
                </Box>
              ))
            : null}

          {data?.data.length === 0 ? (
            <>
              <Center>
                <Image src={empty} alt="" />
                <Heading size="lg">NO DELIVERY ADDRESS ADDED YET !!!</Heading>
              </Center>
            </>
          ) : null}

          <Box>
            <Center>
              <Button
                colorScheme="green"
                leftIcon={<AddIcon />}
                onClick={onOpen}
              >
                Add Delivery Address
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add delivery address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <Stack spacing={4}>
                <Input
                  type="text"
                  placeholder="Address title"
                  value={addressTitle}
                  variant="outline"
                  onChange={handleChange}
                />
              </Stack>
              <Box className="address-map" p="3">
                <MapContainer center={{ lat: 27.7172, lng: 85.324 }} zoom={10}>
                  <TileLayer
                    url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=EmE5kSDEagm0le1OEm2r"
                    attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MyComponent />

                  {marker.map((marker) => (
                    <Marker
                      key={marker.lat}
                      icon={markerIcon}
                      position={marker}
                    ></Marker>
                  ))}
                </MapContainer>
              </Box>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addAddress({
                  title: addressTitle,
                  latitude: marker[0].lat,
                  longitude: marker[0].lng,
                  isDefault: true,
                });

                if (response.isLoading) {
                  toast({
                    title: "Adding...",
                    status: "info",
                    duration: 1000,
                    isClosable: true,
                    position: "top",
                  });
                } else if (result.isSuccess) {
                  toast({
                    title: "Delivery Address Added",
                    status: "success",
                    duration: 5000,
                    position: "top",
                    isClosable: true,
                  });
                } else if (result.isError) {
                  toast({
                    title: "Addition Unsuccessful",
                    description: "Unable to add address",
                    status: "error",
                    duration: 1000,
                    isClosable: true,
                    position: "top",
                  });
                }
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default DeliveryAddress;
