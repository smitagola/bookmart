import { useState } from 'react';
import { CustomerTable, OrderTable, PaymentTable, ProductTable, Dashboard, ProductForm } from "./Component";
import { Box, AppBar, Toolbar, Typography, styled, useTheme, Hidden, IconButton, CircularProgress } from "@mui/material";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Component/SideBar/Sidebar';

const drawerWidth = 200;
const AdminPanel = () => {
  const navigate = useNavigate();
  const loading = useSelector(state => state.book.loading);
  const [open, setOpen] = useState(false);
  const [isbnNumber, setIsbnNumber] = useState(0);
  const theme = useTheme();
  const setBookIsbn = (isbn) => { setIsbnNumber(isbn); navigate("new-product"); }
  const removeIsbn = () => { setIsbnNumber(0) }


  const BoxComponent = {
    padding: "50px 39px",
    background: "#f5f5f5",
    width: "100%",
    height: "1000%"
  }

  return (
    <>
      <Box sx={{ height: "100%", display: "flex" }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" noWrap component="div">BookMart</Typography>

            <Hidden mdUp={true}>
              <IconButton sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>

        <Sidebar />

        {
          loading ? (<><CircularProgress sx={{ margin: "30px auto" }} /></>) : (
            <>
              <Box sx={BoxComponent}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="inventory-table" element={<ProductTable setBookIsbn={setBookIsbn} />} />
                  <Route path="new-product" element={<ProductForm isbnNumber={isbnNumber} resetIsbn={removeIsbn} />} />
                  <Route path="customer-table" element={<CustomerTable />} />
                  <Route path="payment-table" element={<PaymentTable />} />
                  <Route path="order-table" element={<OrderTable />} />
                </Routes>
              </Box>
            </>
          )
        }

      </Box>
    </>
  )
}

export default AdminPanel