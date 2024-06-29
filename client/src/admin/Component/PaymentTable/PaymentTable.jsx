import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import Pagination from "../Pagination/Pagination";
import axios from "axios";

const HEADCELLS = [
    {
        id: "payment_id",
        numeric: true,
        label: "ID"
    },
    {
        id: "user_id",
        numeric: true,
        label: "User Id"
    },
    {
        id: "date",
        numeric: true,
        label: "Date"
    },
    {
        id: "method",
        numeric: false,
        label: "Method"
    },
    {
        id: "payment_amount",
        numeric: false,
        label: "Amount"
    },
    {
        id: "transaction_id",
        numeric: false,
        label: "Transaction Id"
    },
    {
        id: "status",
        numeric: true,
        label: "Status"
    }
];

const PaymentTable = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            const response = await axios.get(`http://localhost:7001/payment/get-payment-details`);
            const orderData = await response.data;
            setData(orderData);
        }

        fetchPayments();
    }, []);

    const memoizedOrders = useMemo(() => data, [data]);

    return (
        <>
            <TableContainer sx={{ maxHeight: 500, maxWidth : 1200, backgroundColor : "white", padding : "5px 10px" }}>
                <h2>Payment Table</h2>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                HEADCELLS?.map(head => (
                                    <TableCell key={head.id} sx={{ fontWeight : 'bold'}}>
                                        <TableSortLabel
                                            active={orderBy === head.id}
                                            direction={orderBy === head.id ? order : 'asc'}
                                        >
                                            {head.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            memoizedOrders?.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage).map(payment => (
                                <TableRow key={payment.PaymentId}>
                                    <TableCell>{payment.PaymentId}</TableCell>
                                    <TableCell>{payment.Payment_customer_fk}</TableCell>
                                    <TableCell>{payment.PaymentDate}</TableCell>
                                    <TableCell>{payment.PaymentMethod}</TableCell>
                                    <TableCell>₹{payment.Amount}</TableCell>
                                    <TableCell>{payment.TransactionId}</TableCell>
                                    <TableCell>{payment.Status}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            <Pagination
                count={data.length}
                rowsPerPage={recordsPerPage}
                page={currentPage}
                setPage={setCurrentPage}
                setRowsPerPage={setRecordsPerPage}
            />
            </TableContainer>
        </>
    )
}

export default PaymentTable