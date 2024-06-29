import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Button, IconButton, Tooltip, Box } from "@mui/material";
import Pagination from '../Pagination/Pagination';

const columns = [
    { field: 'userid', headerName: 'UserID', width: 80 },
    { field: 'fullname', headerName: 'FullName', width: 150 },
    { field: 'mobile', headerName: 'Mobile', width: 230 },
    { field: 'pincode', headerName: 'Pincode', width: 100 },
    { field: 'residentialdetails', headerName: 'ResidentialDetails', width: 250 },
    { field: 'area', headerName: 'Area', width: 170 },
    { field: 'city', headerName: 'City', width: 140 },
    { field: 'state', headerName: 'State', width: 110 },
];

const rows = [
    { id: 11001, name: "Meet", mail: "7046258779", gender: "382516", streetname: "B-202, sona hi sona", nearplace: "200ft. S.P.Ring Road", city: "Ahmedabad", state: "Gujrat" },
    { id: 11002, name: "Smit", mail: "8745964851", gender: "382417", streetname: "B-202, sona hi sona", nearplace: "200ft. S.P.Ring Road", city: "Ahmedabad", state: "Gujrat" },
    { id: 11003, name: "Harshul", mail: "7895261547", gender: "380025", streetname: "Panchavati", nearplace: "Navrangpura", city: "Ahmedabad", state: "Gujrat" },
    { id: 11004, name: "musharraf", mail: "9187456908", gender: "381417", streetname: "Panchavati", nearplace: "Navrangpura", city: "Ahmedabad", state: "Gujrat" },
    { id: 11005, name: "Hiren Patel", mail: "8845197463", gender: "382419", streetname: "nikol", nearplace: "nikol", city: "Ahmedabad", state: "Gujrat" },
    
];

const CustomerTable = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    return (
        <>
            <Box sx={{ boxShadow: "1px 2px 5px lightgray" }}>
                <TableContainer sx={{ height: 400, maxWidth: 1300, backgroundColor: "white", padding : "10px" }}>
                <h2>Customer Table</h2>
                    <Table sx={{ borderRadius: 10 }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                {
                                    columns?.map(column => {
                                        let { field, headerName } = column;
                                        return (
                                            <TableCell key={field} sx={{ fontWeight: 'bold' }}>
                                                <TableSortLabel
                                                // active={orderBy === head.id}
                                                // direction={orderBy === head.id ? order : 'asc'}
                                                >
                                                    {headerName}
                                                </TableSortLabel>
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                rows?.slice(currentPage * recordsPerPage, currentPage * recordsPerPage + recordsPerPage).map(row => {
                                    let { id, name, mail, gender, streetname, nearplace, city, state } = row;
                                    return (
                                        <TableRow key={id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{mail}</TableCell>
                                            <TableCell>{gender}</TableCell>
                                            <TableCell>{streetname}</TableCell>
                                            <TableCell>{nearplace}</TableCell>
                                            <TableCell>{city}</TableCell>
                                            <TableCell>{state}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination
                    count={rows.length}
                    rowsPerPage={recordsPerPage}
                    page={currentPage}
                    setPage={setCurrentPage}
                    setRowsPerPage={setRecordsPerPage}
                />
            </Box>
        </>
    )
}

export default CustomerTable;