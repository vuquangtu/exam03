import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductbynameQuery,
  useUpdateProductMutation,
} from "../redux/productApi";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên Sản Phẩm không được để trống"),
  price: Yup.number()
    .typeError("Giá(đ) phải là một số")
    .required("Giá(đ) không được để trống"),
  stock: Yup.number()
    .typeError("Tồn Kho phải là một số")
    .required("Tồn Kho không được để trống"),
  description: Yup.string().required("Mô Tả Sản Phẩm không được để trống"),
});

function UpdateProduct() {
  const { id } = useParams();

  const { data: fetchedProduct, isFetching } = useGetProductbynameQuery(id);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (fetchedProduct) {
      setProduct({ ...fetchedProduct });
    }
  }, [fetchedProduct]);

  const formik = useFormik({
    enableReinitialize: true,
    //
    initialValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm("Are you sure you want to update this product?");
      if (result) {
        await updateProduct({ id: values.id, product: values });
        alert("product updated successfully");
        window.location.href = "/shop";
      }
    },
  });

  if (isFetching)
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );

  return (
    <div className="container p-0">
      <div className="row justify-content-between align-items-center mb-4">
        <h1 className="h3 text-gray-800 col m-0">Thêm Sản Phẩm</h1>
      </div>
      <table width={"100%"}>
        <tbody>
          <tr>
            <td>Tên Sản Phẩm :</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Tên Sản Phẩm"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Giá(đ):</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Giá(đ)"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              {formik.errors.price && (
                <div className="text-danger">{formik.errors.price}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Tồn Kho:</td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Tồn Kho"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
              />
              {formik.errors.stock && (
                <div className="text-danger">{formik.errors.stock}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Mô Tả Sản Phẩm:</td>
          </tr>
          <tr>
            <td>
              <textarea
                className="form-control"
                placeholder="Mô Tả Sản Phẩm"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success my-4" onClick={formik.handleSubmit}>
        Cập Nhật
      </button>

      <Link to="/shop" className="m-4">
        <button className="btn btn-success">Hủy</button>
      </Link>
    </div>
  );
}

export default UpdateProduct;
