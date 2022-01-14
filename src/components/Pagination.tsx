import {
  Container,
  Center,
  HStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { FC } from "react";

interface paginateProps {
  totalItems: number;
  itemsPerpage: number;
  paginate: (i: number) => void;
}

const Pagination: FC<paginateProps> = ({
  totalItems,
  itemsPerpage,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Container maxWidth="80em">
      <Center>
        <HStack>
          <ButtonGroup>
            {pageNumbers.map((i) => (
              <Button key={i} onClick={() => paginate(i)}>
                {i}
              </Button>
            ))}
          </ButtonGroup>
        </HStack>
      </Center>
    </Container>
  );
};

export default Pagination;
