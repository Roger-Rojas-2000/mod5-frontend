import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { HeaderOrder } from "./HeaderOrder";
import { useEffect, useState } from "react";
import { URL_API_SERVICE2 } from "../../config/config";
import { MessageSwal } from "../../components/modal/MessageSwal";
//import { Modal } from "../../components/ui/modal/index";

interface OrderProduct {
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  OrderProduct: OrderProduct;
}

interface Customer {
  id: number;
  name: string;
}

interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  customer_id: number;
  customer: Customer;
  products: Product[];
}

interface ResponseApiService2<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${URL_API_SERVICE2}/orders`);
      const data: ResponseApiService2<Order[]> = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      return data.data;
    } catch (error) {
      console.error(error);
      MessageSwal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Ha ocurrido un error!",
      });
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    getData();
  }, []);

  function handleDetail(order: Order) {
    console.log(order);
  }

  const columns: MRT_ColumnDef<Order, string>[] = [
    {
      accessorKey: "orderDate",
      header: "Fecha",
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
    },
    {
      accessorFn: (order) => order.customer.name,
      header: "Cliente",
    },
    {
      header: "Opciones",
      Cell: ({ row }) => (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handleDetail(row.original)}
            className="text-blue-600 hover:text-blue-800 font-semibold"
            aria-label={`Detalle ${row.original.customer.name}`}
          >
            Detalle
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageMeta
        title="React.js Orders Dashboard | TailAdmin - Admin Dashboard Template"
        description="This is React.js Orders Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Ordenes" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <HeaderOrder />

        <div className="space-y-6">
          <MaterialReactTable
            columns={columns}
            data={orders}
            localization={MRT_Localization_ES}
          />
        </div>
      </div>

      {/* Modal para le detalle */}
      {/*<Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFullscreen={false}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
          {editOrder && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editOrder.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={editOrder.last_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Número Ref.
                </label>
                <input
                  type="text"
                  name="number"
                  value={editOrder.number || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Guardar</Button>
              </div>
            </form>
          )}
        </div>
      </Modal> */}
    </>
  );
}
