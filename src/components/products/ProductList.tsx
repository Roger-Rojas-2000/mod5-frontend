import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalShow from "./modalShow";
import { URL_API_SERVICE2 } from "../../config/config";

interface Book {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Book | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL_API_SERVICE2}/products`)
      .then((response) => {
        // Verificamos si la respuesta es un array directamente o viene dentro de una propiedad
        const data = response.data.data;
        const libros = Array.isArray(data)
          ? data
          : Array.isArray(data.books)
          ? data.books
          : [];

        setBooks(libros);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener libros:", error.message);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id: number) => {
    alert(`Editar producto con id: ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar producto con id: ${id}`);
  };

  const handleView = (id: number) => {
    const product = books.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setViewModalOpen(true);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Id
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Nombre del Producto
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Descripción
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Estado
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-xs dark:text-gray-400"
              >
                Precio
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-xs dark:text-gray-400"
              >
                Opciones
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <TableRow>
                <TableCell className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  Cargando libros...
                </TableCell>
              </TableRow>
            ) : books.length === 0 ? (
              <TableRow>
                <TableCell className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  No hay libros disponibles.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-sm dark:text-white/90">
                      {book.id}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-sm dark:text-gray-400">
                    {book.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-sm dark:text-gray-400">
                    {book.description}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        book.status == "1"
                          ? "success"
                          : book.status == "0"
                          ? "warning"
                          : "error"
                      }
                    >
                      {book.status == "1"
                        ? "Activo"
                        : book.status == "0"
                        ? "Inactivo"
                        : "Desconocido"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-sm dark:text-gray-400">
                    {book.price.toLocaleString("es-BO", {
                      style: "currency",
                      currency: "BOB",
                    })}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                      aria-label={`Editar producto ${book.name}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                      aria-label={`Eliminar producto ${book.name}`}
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => handleView(book.id)}
                      className="text-green-600 hover:text-green-800 font-semibold"
                      aria-label={`Ver producto ${book.name}`}
                    >
                      👁️
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {selectedProduct && (
        <ModalShow
          book={selectedProduct}
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
        />
      )}
    </div>
  );
}
