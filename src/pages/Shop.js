import React from "react";
import { useGetProductsbynameQuery } from "../redux/productApi";
import { Link } from "react-router-dom";

function Shop() {
  const { data, isFetching } = useGetProductsbynameQuery();

  if (isFetching)
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );

  return (
    <div className="card-body">
      <div className="table-responsive">
        <div className="container ">
          <div className="row justify-content-between align-items-center my-4">
            <h1 className="h3 text-gray-800 col m-0">Danh Sách Sản Phẩm</h1>
            <Link to={`/product/addproduct`} className="col-auto m-0">
              <button className="btn btn-success ">Thêm Sản Phẩm</button>
            </Link>
          </div>
        </div>
        <table className="table table-bordered" id="dataTable" width="100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá(đ)</th>
              <th>Tồn Kho</th>
            </tr>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={`/product/${item.id}`}>{item.name}</a>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Link to={`/product/update/${item.id}`}>
                        <button className="btn btn-success mx-2">
                          Cập Nhật
                        </button>
                      </Link>
                      <Link to={`/product/delete/${item.id}`}>
                        <button className="btn btn-danger">Xóa</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </thead>

          <tbody id="employeesData"></tbody>
        </table>
      </div>
    </div>
  );
}

export default Shop;
