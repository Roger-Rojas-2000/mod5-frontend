import { useState } from "react";
import axios from "axios";
import { Modal } from "../ui/modal/index";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert";
import { URL_API_SERVICE2 } from "../../config/config";

const ModalAdd = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    status: "1",
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveProduct = async () => {
    try {
      setLoading(true);
      // await axios.post("http://34.151.239.247:3000/products", form);
      await axios.post(`${URL_API_SERVICE2}/products`, form);
      // Mostrar alerta
      setShowAlert(true);
      // Ocultar alerta después de 3 segundos
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error guardando libros:", error.message);
        alert("Error al guardar el libros: " + error.message);
      } else {
        console.error("Error guardando libros:", error);
        alert("Error al guardar el libros");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    await saveProduct();
    setOpen(false);
    setForm({ name: "", price: "", description: "", status: "1" });
  };

  return (
    <>
      {showAlert && (
        <div className="mb-4">
          <Alert
            variant="success"
            title="Libro creado"
            message="El libros fue creado exitosamente."
          />
        </div>
      )}

      <Button
        onClick={() => setOpen(true)}
        startIcon={<span className="text-sm">➕</span>}
        size="sm"
        className="mb-4 text-amber-200"
      >
        Crear Libro
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} isFullscreen={false}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Libro</h2>

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
              <label className="block text-sm font-medium mb-1">Precio</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                rows={3}
              />
            </div>

            <input type="hidden" name="status" value={form.status} />

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
