import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavbarHeader from "./components/navbar/NavbarHeader";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/product/Product";
import SearchedProducts from "./components/product/SearchedProducts";
import SingleProduct from "./components/product/SingleProduct";

const App: FC = () => {
  return (
    <>
      <header>
        <NavbarHeader />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:id" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/products/:searchQuery" element={<SearchedProducts />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
