import { useEffect, useState } from "react";
import { Typography, TextField, Link, Box, Button, Stack, Container } from "@mui/material";

const ResetPassword = () => {

    const parentContainer = {
        backgroundColor : "#F2F3F8",
        padding : "5px",
        margin : "10px auto",
        width : "33%",
        height : "100%"
    }
    return (
        <>
            <Container sx={parentContainer}>
                <Box>
                    <Typography variant="h5" sx={{ textAlign : "center"}}>Reset Password</Typography>
                    <Typography sx={{ textAlign : "center"}}>Enter your email to reset your password.</Typography>
                </Box>

                <Box sx={{ backgroundColor : "white", padding : "20px", marginTop : "10px"}}>
                    <Stack>
                        <Typography>Email</Typography>
                        <TextField variant="outlined" placeholder="Enter your email" size="small"/>
                        <Button variant="contained" sx={{ width : "200px", contentAlign : "center", margin : "10px auto"}}>Reset Password</Button>
                    </Stack>
                </Box>
                <Link>Login</Link>
            </Container>
        </>
    )
}

export default ResetPassword;