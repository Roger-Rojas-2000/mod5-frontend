import { useState } from "react";
import axios from "axios";
import { Modal } from "../ui/modal/index";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import { URL_API_SERVICE1 } from "../../config/config";

const ModalAdd = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    number: "",
    ci: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveCustomer = async () => {
    try {
      setLoading(true);
      await axios.post( `${URL_API_SERVICE1}/customers`, form);
      // Mostrar alerta
      setShowAlert(true);
      // Ocultar alerta después de 3 segundos
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error guardando el cliente:", error.message);
        alert("Error al guardar el cliente: " + error.message);
      } else {
        console.error("Error guardando cliente:", error);
        alert("Error al guardar el cliente");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.last_name || !form.number || !form.ci) {
      alert("Nombre, apellido, número y cédula son obligatorios");
      return;
    }

    await saveCustomer();
    setOpen(false);
    setForm({ name: "", last_name: "", number: "", ci: "" });
  };

  return (
    <>
      {showAlert && (
        <div className="mb-4">
          <Alert
            variant="success"
            title="Cliente creado"
            message="El cliente fue creado exitosamente."
          />
        </div>
      )}

      <Button onClick={() => setOpen(true)} startIcon={<span>➕</span>}>
        Registrar Cliente
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} isFullscreen={false}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Cliente</h2>

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
              <label className="block text-sm font-medium mb-1">Numero</label>
              <input
                type="text"
                name="number"
                value={form.number}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">C.I.</label>
              <input
                type="text"
                name="ci"
                value={form.ci}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                required
              />
            </div>
    

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalAdd;
