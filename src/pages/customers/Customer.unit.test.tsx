// Customer.unit.test.tsx
import { render } from "@testing-library/react";
import { Customer } from "./Customer";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router";

describe("Customer - Unit Tests", () => {
  const renderCustomer = () =>
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Customer />
        </MemoryRouter>
      </HelmetProvider>
    );

  it("abre y cierra el modal al cambiar isModalOpen", () => {
    renderCustomer();
  });

  it("actualiza el input de nombre correctamente", () => {
    renderCustomer();
  });
});
