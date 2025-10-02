import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ProductList from "../../components/products/ProductList";
/* import Button from "../../components/ui/button/Button"; */
import ModalAdd from "../../components/products/modalAdd";

export function Product() {
  return (
    <>
      <PageMeta
        title="React.js Products Dashboard | TailAdmin - Admin Dashboard Template"
        description="This is React.js Products Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Libros" />

      {/* <Button 
        startIcon={<i className="ri-add-line"></i>} 
        children="Crear Producto" 
        onClick={() => {}}
      /> */}

      {/* <Button startIcon={<i className="ri-add-line"></i>} onClick={() => {}}>
        ✚ Crear Producto
      </Button> */}

      <ModalAdd/>

      <div className="space-y-6">
        <ComponentCard title="Lista de Productos">
          <ProductList />
        </ComponentCard>
      </div>
    </>
  );
}
