import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { FC } from "react";
import { useOrderHistoryQuery } from "../../../features/auth";

const OrderHistory: FC = () => {
  const { data, error, isLoading } = useOrderHistoryQuery();
  return (
    <>
      <Table variant="striped" colorScheme="facebook">
        <Thead>
          <Tr>
            <Th>Order Number</Th>
            <Th>Order Date</Th>
            <Th>Total products</Th>
            <Th>Status</Th>
            <Th>Total Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {error || isLoading ? (
            <>
              <Tr>
                <Td>
                  <Skeleton height="30px" width="500px"></Skeleton>
                </Td>
                <Td>
                  <Skeleton height="30px" width="500px"></Skeleton>
                </Td>
                <Td>
                  <Skeleton height="30px" width="500px"></Skeleton>
                </Td>
                <Td>
                  <Skeleton height="30px" width="500px"></Skeleton>
                </Td>
                <Td>
                  <Skeleton height="30px" width="500px"></Skeleton>
                </Td>
                <Td>
                  <Skeleton height="30px" width="500px"></Skeleton>
                </Td>
              </Tr>
            </>
          ) : null}
          {data?.data.map((d) => (
            <Tr key={d.orderNumber}>
              <Td>{d.orderNumber}</Td>
              <Td>{d.orderDate}</Td>
              <Td>{d.orderProductsCount}</Td>
              <Td>
                {d.status === "Pending" ? (
                  <>
                    <Badge variant="solid" p="2" colorScheme="blue">
                      Pending
                    </Badge>
                  </>
                ) : null}

                {d.status === "Approved" ? (
                  <>
                    <Badge variant="solid" p="2" colorScheme="green">
                      Approved
                    </Badge>
                  </>
                ) : null}
                {d.status === "Cancelled" ? (
                  <>
                    <Badge variant="solid" p="2" colorScheme="red">
                      Cancelled
                    </Badge>
                  </>
                ) : null}
              </Td>
              <Td>Rs {d.total}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default OrderHistory;
