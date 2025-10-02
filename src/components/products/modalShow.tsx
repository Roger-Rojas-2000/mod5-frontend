// ModalView.tsx
import { Modal } from "../ui/modal/index";
import Button from "../ui/button/Button";

interface ModalShow {
  book: {
    name: string;
    price: number;
    description: string;

    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ModalShow = ({ book, isOpen, onClose }: ModalShow) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen={false}>
      <div className="p-6 ">
        <h2 className="text-xl font-semibold mb-4">Detalles del Producto</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Nombre:</span> {book.name}
          </div>
          <div>
            <span className="font-medium">Precio:</span>{" "}
            {book.price.toLocaleString("es-BO", {
              style: "currency",
              currency: "BOB",
            })}
          </div>
          <div>
            <span className="font-medium">Descripción:</span>{" "}
            {book.description || "Sin descripción"}
          </div>
          <div>
            <span className="font-medium">Estado:</span>{" "}
            {book.status === "1"
              ? "Disponible"
              : book.status === "0"
              ? "Inactivo"
              : book.status}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShow;
