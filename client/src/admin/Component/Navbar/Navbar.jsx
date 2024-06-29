import { AppBar, Typography, Badge } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

const Navbar = () => {
    const appBarDesign = {
        dispaly : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        padding : "17px 30px",
        zIndex : (theme) => theme.zIndex.drawer + 1
    }
    return(
        <>
            <AppBar color="primary" sx={appBarDesign} position="fixed">
                <Typography variant="h5">BookMart</Typography>
                <Badge badgeContent={2} color="secondary" sx={{ cursor : "pointer"}}>
                    <EmailIcon/>
                </Badge>
            </AppBar>
        </>
    )
}

export default Navbar;