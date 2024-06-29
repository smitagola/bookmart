import FooterStyle from "./Footer.module.css";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Divider, Grid, Typography, Stack, IconButton, Link, useTheme, useMediaQuery, styled } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const theme = useTheme();
  const location = useLocation();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const buttonStyle = {
    color: "white",
    '&:hover': { color: "dodgerblue" }
  }

  const LinkText = styled(Typography)(({ theme }) => ({
    textDecoration: "none",
    color: "dodgerblue"
  }));

  const LinkStyle = {
    textDecoration: "none"
  }


  if (location.pathname == "/admin/dashboard" || location.pathname == "/admin/inventory-table" || location.pathname == "/admin/new-product" || location.pathname == "/admin/customer-table" || location.pathname == "/admin/payment-table" || location.pathname == "/admin/order-table" || location.pathname == "/admin/" || location.pathname == "/admin/new-category" || location.pathname == "/admin" || location.pathname == "/login" || location.pathname == "/signUp") {
    return (<></>)
  } else {
    return (
      <>
        <Box sx={{ backgroundColor: "#3c3d41", padding: "20px", position: "static", width: "97%", bottom: 0, color: "white" }}>
          <Box className={isMatch ? FooterStyle.footerMainContainerMedium : FooterStyle.footerMainContainer}>

            <Stack className={FooterStyle.companyDetails}>
              <Typography variant="h6">BookMart</Typography>
              <Typography sx={{ color: "dodgerblue" }}>
                We are the best provide for selling a book online over the internet our frist aim is to provide a best service to our customers so it is a platform for a customer who want to buy any books.Bookmart is online e-commerce website for selling a books.
              </Typography>
              <Stack sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
                <Link href="https://www.facebook.com/" target="_blank" >
                  <FacebookIcon sx={buttonStyle} />
                </Link>

                <Link href="https://www.twitter.com/" target="_blank">
                  <TwitterIcon sx={buttonStyle} />
                </Link>

                <Link href="https://in.linkedin.com/" target="_blank">
                  <LinkedInIcon sx={buttonStyle} />
                </Link>

                <Link href="https://www.instagram.com/" target="_blank">
                  <InstagramIcon sx={buttonStyle} />
                </Link>

              </Stack>
            </Stack>

            <Stack className={FooterStyle.category}>
              <Typography variant={"h5"}>Categories</Typography>

              <Stack gap={2}>
                <RouterLink to={"/"} style={LinkStyle}>
                  <LinkText>Home</LinkText>
                </RouterLink>

                <RouterLink to={"/books"} style={LinkStyle}>
                  <LinkText>Books</LinkText>
                </RouterLink>

                <RouterLink to="/contact" style={LinkStyle}>
                  <LinkText>Contact</LinkText>
                </RouterLink>
              </Stack>
            </Stack>

            <Stack className={FooterStyle.companySection}>
              <Typography variant={"h5"}>Company</Typography>

              <Stack>
                <LinkText>About Us</LinkText>
              </Stack>
            </Stack>

            <Stack className={FooterStyle.helpSection}>
              <Typography variant={'h5'}>Help?</Typography>
              <LinkText>FAQ</LinkText>
              <LinkText>Privacy</LinkText>
              <LinkText>Terms & Conditions</LinkText>
            </Stack>

            <Stack className={FooterStyle.contactSection}>
              <Typography variant={'h5'}>Contact</Typography>
              <Typography>Toll free : +079 12345 67890</Typography>
              <Typography>Email : bookmart@gmail.com</Typography>
            </Stack>
          </Box>

          <Stack>
            <Divider sx={{ margin: "10px", color: "#e8e8e8" }} />
            <Typography sx={{ textAlign: "center" }}>Copyright 2022 BookMart. All Rights Reserved</Typography>
          </Stack>

        </Box>
      </>
    )
  }

}

export default Footer