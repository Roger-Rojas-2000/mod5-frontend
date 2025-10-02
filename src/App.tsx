import { Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { Customer } from "./pages/customers/Customer";
import { Product } from "./pages/products/Product";
import { Order } from "./pages/orders/Order";
import { CreateOrder } from "./pages/orders/FormOrder";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />

          {/* customers */}
          <Route path="/clientes" element={<Customer />} />

          {/* Products */}
          <Route path="/productos" element={<Product />} />

          {/* Orders */}
          <Route path="/ordenes" element={<Order />} />
          <Route path="/ordenes/ordenar" element={<CreateOrder />} />

          {/* Others Page */}
        </Route>

        {/* Auth Layout */}

        <Route path="/login" element={<SignIn />} />
        <Route path="/registrarse" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
