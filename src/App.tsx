import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavbarHeader from "./components/navbar/NavbarHeader";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/product/Product";

const App: FC = () => {
  return (
    <>
      <header>
        <NavbarHeader />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Product />} />
          {/* <Route path="/product/categoryId?=:id" element={<Product />} /> */}
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
