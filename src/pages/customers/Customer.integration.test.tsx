import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router"; // <- importante
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Customer } from "./Customer";

const server = setupServer(
  rest.get("http://13.222.59.250:3000/customers", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        code: 200,
        success: true,
        message: "ok",
        data: [
          {
            id: 1,
            ci: "123",
            name: "Roger",
            last_name: "Rojas",
            email: "roger@test.com",
          },
        ],
      })
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Customer muestra clientes correctamente", async () => {
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Customer />
      </MemoryRouter>
    </HelmetProvider>
  );

  await waitFor(() => expect(screen.getByText("Roger")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Rojas")).toBeInTheDocument());
});
