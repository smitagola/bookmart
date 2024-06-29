import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Avatar, Badge, Toolbar, IconButton, Typography, Stack, TextField, Menu, MenuItem, ListItemIcon, useMediaQuery, useTheme } from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Cart } from "../../pages";
import Navstyle from "./Navbar.module.css";
import { logoutUser } from "../../features/userSlice";
import { LoggedIn } from "../../App";

const Navbar = () => {
    const isLogin = useContext(LoggedIn);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [cartDrawer, setCartDrawer] = useState(false);
    const [userName, setUserName] = useState("Hello User");
    const theme = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const totalUnits = useSelector(state => state.user.totalUnits);
    const userData = useSelector(state => state.user.userDetails);
    const name = userData.username;
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logoutUser());
        navigate("/login");
    }

    useEffect(() => {
        (isLogin) ? setUserName(name) : setUserName("Hello User")
    }, [isLogin])

    const open = () => { setOpenDrawer(true) }
    const close = () => { setOpenDrawer(false) }
    const openCart = () => { setCartDrawer(true) }
    const closeCart = () => { setCartDrawer(false) }

    const tablist = [
        { path: "/", value: "Home" },
        { path: "/books", value: "Books" },
        { path: "/contact", value: "Contact" }
    ]
    const navbarStyle = {
        display: "flex"
    }

    const LinkContainer = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
        // color : "white"
    }

    const TextFieldStyle = {
        width: "400px",
        backgroundColor: "white",
        border: "none",
        outline: "none",
        "&:focus": {
            border: "none",
            outline: 0
        }
    }

    if (location.pathname == "/signUp" || location.pathname == "/login") {
        return (<></>);
    } else {
        return (
            <>
                <AppBar position="sticky" color="inherit" sx={{ widht: "100%", backgroundColor: "#232f3e", color: "white" }}>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <Toolbar>
                            <Typography variant="h5">BookMart</Typography>
                        </Toolbar>

                        <Stack sx={LinkContainer}>
                            {
                                tablist.map((tab, index) => (
                                    <Link key={index} to={tab.path} className={Navstyle.link}>
                                        <Typography>{tab.value}</Typography>
                                    </Link>
                                ))
                            }

                            {/* <Link to="/cart" className={Navstyle.link}> */}
                            <IconButton onClick={() => openCart()}>
                                <Badge color="secondary" badgeContent={totalUnits}>
                                    <ShoppingCartIcon fontSize="large" className={Navstyle.icon} />
                                </Badge>
                            </IconButton>

                            {
                                isLogin ? (<>
                                    <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "none" }}>
                                        <IconButton sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={handleClick}>
                                            <AccountCircleIcon /><Typography>{userName}</Typography>
                                        </IconButton>
                                    </Stack>

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={openMenu}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={() => navigate("/myaccount")}>
                                            <Avatar /> My account
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon onClick={handleLogOut}>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>) : (<>
                                    <Link to={"/login"} className={Navstyle.link}>
                                        <Typography>Sign In</Typography>
                                    </Link>

                                    <Link to={"/signUp"} className={Navstyle.link}>
                                        <Typography>Sign Up</Typography>
                                    </Link>
                                </>)
                            }

                        </Stack>
                    </Stack>
                </AppBar>
                <Cart open={cartDrawer} close={closeCart} />
            </>
        )
    }

}

export default Navbar;