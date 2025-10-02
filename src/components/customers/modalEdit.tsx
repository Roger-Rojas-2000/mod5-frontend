// components/modals/ModalEditCustomer.tsx
import { useState, useEffect } from "react";
import { Modal } from "../ui/modal/index";
import Button from "../ui/button/Button";

interface Customer {
  ci: string;
  name: string;
  last_name: string;
  number?: string;
}

interface ModalEditCustomerProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  onSave: (updatedCustomer: Customer) => void;
}

export const ModalEditCustomer = ({
  isOpen,
  onClose,
  customer,
  onSave,
}: ModalEditCustomerProps) => {
  const [form, setForm] = useState<Customer>({
    ci: "",
    name: "",
    last_name: "",
    number: "",
  });

  useEffect(() => {
    if (customer) {
      setForm(customer);
    }
  }, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form); // Enviar datos actualizados
    onClose();
  };

  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen={false}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Apellidos</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Número Ref.
            </label>
            <input
              type="text"
              name="number"
              value={form.number || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CI</label>
            <input
              type="text"
              name="ci"
              value={form.ci}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              readOnly // Opcional: para que el CI no se edite
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {/* <Button type="submit">Guardar Cambios</Button> */}
          </div>
        </form>
      </div>
    </Modal>
  );
};