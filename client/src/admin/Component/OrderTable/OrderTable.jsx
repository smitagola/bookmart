import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';

const HEADCELLS = [
    {
        id: "order_id",
        numeric: true,
        label: "Order ID"
    },
    {
        id: "customer_name",
        numeric: false,
        label: "Name"
    },
    {
        id: "order_date",
        numeric: true,
        label: "Date"
    },
    {
        id: "total_amount",
        numeric: true,
        label: "Total"
    },
    {
        id: "book_name",
        numeric: false,
        label: "Name"
    },
    {
        id : "book_price",
        numeric : true,
        label:"Price"
    },
    {
        id : "book_quantity",
        numeric : true,
        label : "Quantity"
    },
    {
        id : "payment_method",
        numeric : false,
        label : "Payment Method"
    },
    {
        id : "amount",
        numeric : false,
        label : "Amount"
    },
    {
        id : "payment_status",
        numeric : false,
        label : "Status"
    }
];

const DATA = [
    {
        order_id: 12345,
        customer_name: "John Doe",
        book_name: "Elon Musk",
        numberOfBooks: 5,
        total_amount: 1000
    },
    {
        order_id: 18763,
        customer_name: "Akash Patel",
        book_name: "Steve Jobs",
        numberOfBooks: 2,
        total_amount: 500.63
    },
    {
        order_id: 56724,
        customer_name: "John weak",
        book_name: "Story of Ratan Tata",
        numberOfBooks: 1,
        total_amount: 300
    },
    {
        order_id: 19876,
        customer_name: "How to win friends and influence people",
        book_name: "Dale Carnigi",
        numberOfBooks: 2,
        total_amount: 200.98
    },
    {
        order_id: 23497,
        customer_name: "Meet Panchal",
        book_name: "Elon Musk",
        numberOfBooks: 5,
        total_amount: 1000
    }
];

const OrderTable = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`http://localhost:7001/order/order-details`);
            const orderData = await response.data;
            setData(orderData);
        }

        fetchOrders();
    }, []);

    const memoizedOrders = useMemo(() => data, [data]);

    return (
        <>
            <TableContainer sx={{ maxHeight: 500, maxWidth: 1300, backgroundColor : 'white', padding : "10px 5px" }}>
                <h2>Order Table</h2>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                HEADCELLS?.map(head => (
                                    <TableCell key={head.id} sx={{ fontWeight: 'bold' }}>
                                        <TableSortLabel
                                            active={orderBy === head.id}
                                            direction={orderBy === head.id ? order : 'asc'}
                                        >
                                            {head.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                            }
                            {/* <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            memoizedOrders?.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage).map(order_record => {
                                let { OrderId, Name, OrderDate, TotalAmount, BookName, BookPrice, Quantity, PaymentMethod, Amount, Status } = order_record
                                return (
                                    <TableRow key={OrderId}>
                                        <TableCell>{OrderId}</TableCell>
                                        <TableCell>{Name}</TableCell>
                                        <TableCell>{OrderDate}</TableCell>
                                        <TableCell>{TotalAmount}</TableCell>
                                        <TableCell>{BookName}</TableCell>
                                        <TableCell>{BookPrice}</TableCell>
                                        <TableCell>{Quantity}</TableCell>
                                        <TableCell>{PaymentMethod}</TableCell>
                                        <TableCell>{Amount}</TableCell>
                                        <TableCell>{Status}</TableCell>
                                        {/* <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton>
                                                    <EditIcon sx={{ color: "dodgerblue" }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete">
                                                <IconButton>
                                                    <DeleteIcon sx={{ color: "red" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell> */}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={data.length}
                rowsPerPage={recordsPerPage}
                page={currentPage}
                setPage={setCurrentPage}
                setRowsPerPage={setRecordsPerPage}
            />
        </>
    )
}

export default OrderTable