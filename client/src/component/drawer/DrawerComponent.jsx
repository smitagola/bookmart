import React, { useState } from 'react';
import { Drawer, Badge, List, ListItemText, Typography, IconButton, Stack, Box, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import Navstyle from "../navbar/Navbar.module.css";

const DrawerComponent = (props) => {
    let { open, close, openDrawer } = props;
    const tablist = [
        { path: "/", value: "Home" },
        { path: "/books", value: "Books" },
        { path: "/contact", value: "Contact" }
    ]

    const boxStyle = {
        marginTop: "5px",
        width: 240,
        contentAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
    }

    return (
        <>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => close()}
                sx={{ marginTop: "10px", width: 2400 }}
                transitionDuration={300}
            >

                <Box sx={boxStyle}>
                    <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        <Typography>User Name</Typography>
                    </Stack>
                    <List>
                        {
                            tablist.map((tab, index) => (
                                <ListItemText key={index} onClick={() => close()} >
                                    <Link to={tab.path} sx={{ textDecoration : "none", color : "#ccc"}}>
                                        <Typography>{tab.value}</Typography>
                                    </Link>
                                </ListItemText>
                            ))
                        }


                        <Link to="/cart" >
                            <IconButton>
                                <Badge color="primary" badgeContent={1}>
                                    <ShoppingCartIcon fontSize="large"   />
                                </Badge>
                            </IconButton>
                        </Link>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default DrawerComponent;