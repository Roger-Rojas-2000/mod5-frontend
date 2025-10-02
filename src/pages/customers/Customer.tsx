import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { HeaderCustomer } from "./HeaderCustomer";
import { useEffect, useState } from "react";
import { URL_API_SERVICE1 } from "../../config/config";
import { MessageSwal } from "../../components/modal/MessageSwal";
import { Modal } from "../../components/ui/modal/index";
import Button from "../../components/ui/button/Button";
import axios from "axios";

interface Customer {
  id: number;
  ci: string;
  name: string;
  last_name: string;
  email: string;
  number?: string;
}

interface ResponseApiService1<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export function Customer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${URL_API_SERVICE1}/customers`);
      const data: ResponseApiService1<Customer[]> = await response.json();
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

  const handleEdit = (id: number) => {
    const selected = customers.find((c) => Number(c.id) === id);
    if (selected) {
      setEditCustomer(selected);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (ci: number) => {
    alert(`Eliminar producto con id: ${ci}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editCustomer) return;
    const { name, value } = e.target;
    setEditCustomer({ ...editCustomer, [name]: value });
  };

  // const handleSave = () => {
  //   console.log("Guardando cliente:", editCustomer);
  //   setIsModalOpen(false);
  // };
  const handleSave = async () => {
    if (!editCustomer) return;

    try {
      const response = await axios.put(
        `${URL_API_SERVICE1}/customers/${editCustomer.id}`,
        editCustomer
      );

      if (response.status === 200) {
        MessageSwal.fire({
          icon: "success",
          title: "¡Cliente actualizado!",
          text: "Los datos del cliente se han guardado correctamente.",
        });

        // Refrescar datos
        const updatedCustomers = await fetchCustomers();
        setCustomers(updatedCustomers);

        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      MessageSwal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se pudo actualizar el cliente.",
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    getData();
  }, []);

  const columns: MRT_ColumnDef<Customer, string>[] = [
    {
      accessorKey: "ci",
      header: "CI",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "last_name",
      header: "Apellidos",
    },
    {
      accessorKey: "email",
      header: "correo",
    },
    {
      accessorKey: "number",
      header: "Número Ref.",
    },
    {
      header: "Opciones",
      Cell: ({ row }) => (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handleEdit(Number(row.original.id))}
            className="text-blue-600 hover:text-blue-800 font-semibold"
            aria-label={`Editar cliente ${row.original.name}`}
          >
            ✏️
          </button>
          <button
            onClick={() => handleDelete(Number(row.original.ci))}
            className="text-red-600 hover:text-red-800 font-semibold"
            aria-label={`Eliminar cliente ${row.original.name}`}
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageMeta
        title="React.js Customers Dashboard | TailAdmin - Admin Dashboard Template"
        description="This is React.js Customers Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Clientes presentación" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <HeaderCustomer />
        <div className="space-y-6">
          <MaterialReactTable
            columns={columns}
            data={customers}
            localization={MRT_Localization_ES}
          />
        </div>
      </div>

      {/* Modal de edición */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFullscreen={false}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
          {editCustomer && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editCustomer.name}
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
                  value={editCustomer.last_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">correo</label>
                <input
                  type="text"
                  name="email"
                  value={editCustomer.email}
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
                  value={editCustomer.number || ""}
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
      </Modal>
    </>
  );
}
