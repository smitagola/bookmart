import React, { useState } from 'react';
import { Drawer, ListItem, ListItemIcon, ListItemButton, ListItemText, List, Toolbar, Collapse, styled, Box, useTheme } from '@mui/material';
import CustomerTable from '../CustomerTable/CustomerTable';
import OrderTable from '../OrderTable/OrderTable';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PaymentTable from '../PaymentTable/PaymentTable';
import ProductForm from '../ProductForm/ProductForm';
import ProductTable from '../ProductTable/ProductTable';
import Dashboard from '../Dashboard/Dashboard';
import NewCategory from '../NewCategory/NewCategory';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink, useNavigate } from 'react-router-dom';
import TableViewIcon from '@mui/icons-material/TableView';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

const drawerWidth = 220;
const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const handleClick = () => { setOpen(!open) }
    const navigate = useNavigate();

    const PanelButton = styled(ListItemButton)(({ theme }) => ({
        '&:hover': {
            '& > *, &:active > *': {
                color: "dodgerblue"
            }
        }
    }));

    const sideBarItem = [
        { name: "Dashboard", multicomponent: false, icon: <DashboardIcon />, path : "dashboard" , component: <Dashboard />, id: 1 },
        {
            name: "Inventory", multicomponent: true, icon: <InventoryIcon />, subcomponents: [
                { subcomponentname: "Inventory Table", subcomponenticon: <TableViewIcon />, path : "inventory-table" , subcomponent: <ProductTable />, id: 1 },
                { subcomponentname: "New Product", subcomponenticon: <DynamicFormIcon />, path : "new-product", subcomponent: <ProductForm />, id: 2 },
                // { subcomponentname : "New Category", subcomponenticon : <AddBoxIcon/>, path : "new-category", subcomponent : <NewCategory />, id : 3}
            ], id: 2
        },
        { name: "Orders", multicomponent: false, icon: <PeopleIcon />, path : "order-table" ,component: <OrderTable />, id: 3 },
        { name: "Payments", multicomponent: false, icon: <PaymentIcon />, path : "payment-table", component: <PaymentTable />, id: 4 }
    ]
    return (
        <>
            <Drawer
                {...theme.breakpoints.down("md") ? {anchor : "left"} : {variant : "permanent"}}
                variant='permanent'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
                open={true}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List sx={{ display: 'flex', justifyContent: "left", alignItems: "start", flexDirection: "column", gap: 1 }} dense={false}>
                        {
                            sideBarItem?.map((item) => {
                                if (item.multicomponent) {
                                    return (
                                        <>
                                            <PanelButton selected={false} key={item.id} onClick={handleClick} >
                                                <ListItemIcon>{item.icon}</ListItemIcon>
                                                <ListItemText>{item.name}</ListItemText>
                                                {open ? <ExpandLess /> : <ExpandMore />}
                                            </PanelButton>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                {
                                                    item.subcomponents?.map(subcomponent => {
                                                        return (
                                                            <>
                                                                <List  disablePadding>
                                                                    <ListItem sx={{ textDecoration : "none", color : "black"}} component={NavLink} to={subcomponent.path}>
                                                                        <PanelButton  key={subcomponent.id} sx={{ pl: 0 }}>
                                                                            <ListItemIcon>{subcomponent.subcomponenticon}</ListItemIcon>
                                                                            <ListItemText>{subcomponent.subcomponentname}</ListItemText>
                                                                        </PanelButton>
                                                                    </ListItem>
                                                                </List>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Collapse>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <PanelButton component={NavLink} to={item.path} selected={false} key={item.id}>
                                                <ListItemIcon>{item.icon}</ListItemIcon>
                                                <ListItemText>{item.name}</ListItemText>
                                            </PanelButton>
                                        </>
                                    )
                                }
                            })
                        }

                        <PanelButton>
                            <ListItemIcon><LogoutIcon/></ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </PanelButton>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Sidebar