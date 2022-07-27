import React, { useEffect, useState } from 'react'
import DataTable from '../DataTable/DataTable';
import "./datatable.scss";
import { Link } from 'react-router-dom';
const columns = [
    {
        field: 'name',
        headerName: 'Nombre',
        width: 300,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.image} alt="avatar" />
                    {params.row.name}
                </div>
            );
        },
    },
    { field: 'price', headerName: 'Precio', width: 120 },
    { field: 'stock', headerName: 'Stock', width: 120 },
    { field: 'sales', headerName: 'Ventas', width: 120, }
];

const userTableStyles = {
    height: '650px',
};

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({})
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState("")
    const [order, setOrder] = useState({ field: "", sort: "" })

    useEffect(() => {
        fetch(`http://localhost:3001/products/?limit=${pageSize}&page=${page}&name=${filter}&sort=${order.field}&order=${order.sort}`)
            .then((response) => response.json())
            .then((json) => {
                let { products, data } = json
                setProducts(products)
                setData(data)
            })
            .catch((e) => console.log(e))
    }, [page, pageSize, filter, order]);
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Products
                <Link to="/products/new" className="link">
                    Add New
                </Link>
            </div>
            <DataTable
                setFilter={setFilter}
                rows={products}
                columns={columns}
                loading={!products.length}
                sx={userTableStyles}
                setPage={setPage}
                setPageSize={setPageSize}
                page={page}
                pageSize={pageSize}
                rowCount={data.totalProducts}
                setOrder={setOrder}
            />
        </div>

    );
}







