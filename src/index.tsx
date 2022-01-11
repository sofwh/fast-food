import ReactDOM from "react-dom";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
