import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductbynameQuery,
} from "../redux/productApi";

function DeleteProduct() {
  const { id } = useParams();
  const { data: product, isFetching } = useGetProductbynameQuery(id);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const result = confirm("Are you sure you want to delete this product?");
    if (result) {
      await deleteProduct(id);
      alert("Product deleted");
      window.location.href = "/shop";
    }
  };

  if (isFetching)
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );

  return (
    <div>
      <div className="container p-0">
        <div className="row justify-content-between align-items-center mb-4">
          <h1 className="h3 text-gray-800 col m-0">Chi Tiết Sản Phẩm</h1>
          <Link className="col-auto m-0" to={"/shop"}>
            <button className="btn btn-success ">Danh Sách</button>
          </Link>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Tên Sản Phẩm : &nbsp;&nbsp;&nbsp;&nbsp; </td>
              <td>{product.name}</td>
            </tr>
            <tr>
              <td>Giá(đ) :&nbsp;&nbsp;&nbsp;&nbsp; </td>
              <td>{product.price}</td>
            </tr>
            <tr>
              <td>Tồn Kho :&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>{product.stock}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <hr />
              </td>
            </tr>
            <tr>
              <td>Mô Tả &nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>{product.description}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-danger my-4" onClick={handleDelete}>
          Xóa
        </button>
        <Link to={"/shop"} className=" m-4">
          <button className="btn btn-success">Hủy </button>
        </Link>{" "}
      </div>
    </div>
  );
}

export default DeleteProduct;
