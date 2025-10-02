import { useEffect, useState } from "react";
import { URL_API_SERVICE2 } from "../../config/config";
import { URL_API_SERVICE1 } from "../../config/config";
import { MessageSwal } from "../../components/modal/MessageSwal";

// Tipos
interface Product {
  id: number;
  name: string;
  description: string;
  autor: string;
  price: number;
}

interface Customer {
  id: number;
  name: string;
}

interface ResponseApiService2<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

interface OrderPayload {
  customerId: string;
  totalAmount: number;
  products: {
    productId: number;
    quantity: number;
  }[];
}

export function CreateOrder() {
  const [customer, setCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<
    { productId: number; productName: string; quantity: number }[]
  >([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Fetch productos
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${URL_API_SERVICE2}/products`);
      const data: ResponseApiService2<Product[]> = await response.json();
      if (!response.ok) throw new Error(`Error: ${data.message}`);
      return data.data;
    } catch (error) {
      console.error(error);
      MessageSwal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al obtener productos",
      });
      return [];
    }
  };

  // Fetch clientes
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${URL_API_SERVICE1}/customers`);
      const data: ResponseApiService2<Customer[]> = await response.json();
      if (!response.ok) throw new Error(`Error: ${data.message}`);
      return data.data;
    } catch (error) {
      console.error(error);
      MessageSwal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al obtener clientes",
      });
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setProducts(await fetchProducts());
      setCustomers(await fetchCustomers());
    };
    loadData();
  }, []);

  const handleAddToCart = () => {
    const product = products.find((p) => p.id === Number(selectedProduct));
    if (!product || quantity < 1) return;

    const exists = cart.find((item) => item.productId === product.id);
    if (exists) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { productId: product.id, productName: product.name, quantity },
      ]);
    }

    // Reset inputs
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleRemove = (productId: number) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || cart.length === 0) {
      MessageSwal.fire({
        icon: "warning",
        title: "Faltan datos",
        text: "Debe seleccionar un cliente y al menos un producto.",
      });
      return;
    }

    const payload: OrderPayload = {
      customerId: String(customer),
      totalAmount: calculateTotal(),
      products: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch(`${URL_API_SERVICE2}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      MessageSwal.fire({
        icon: "success",
        title: "Orden creada",
        text: "La orden fue registrada correctamente.",
      });

      // Limpiar formulario
      setCustomer("");
      setCart([]);
      setSelectedProduct("");
      setQuantity(1);
    } catch (error) {
      console.error(error);
      MessageSwal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se pudo crear la orden.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Crear Orden</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cliente */}
        <div>
          <label className="block text-sm font-medium mb-1">Cliente</label>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione un cliente</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Producto + cantidad */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Producto</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Seleccione un producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium mb-1">Cantidad</label>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Agregar
          </button>
        </div>

        {/* Tabla carrito */}
        {cart.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-6 mb-2">
              Productos en la orden:
            </h3>
            <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Producto</th>
                  <th className="px-3 py-2 text-left">Cantidad</th>
                  <th className="px-3 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.productId} className="border-t">
                    <td className="px-3 py-2">{item.productName}</td>
                    <td className="px-3 py-2">{item.quantity}</td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => handleRemove(item.productId)}
                        className="text-red-600 hover:underline"
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="text-right mt-4 font-semibold text-lg">
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>
        )}

        {/* Enviar orden */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          style={{ backgroundColor: "#465FFF" }}
        >
          Crear Orden
        </button>
      </form>
    </div>
  );
}
