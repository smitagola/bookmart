import React from 'react';
import "./Home.css";
import banner from "../../biography/2022091535815.jpg";
import { Link } from 'react-router-dom';
import { Box, Typography, Stack, useTheme, useMediaQuery, Button } from "@mui/material";
import { DetailsCard } from '../../component';
import ElonMusk from "../../biography/Elon Musk How the Billionaire CEO of SpaceX and Tesla is Shaping our Future.jpg";


const Home = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const recommendasionHeader = {
    margin: "1px 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }

  const bookRecommendeation = {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    // justifyContent: "space-evenly",
  }

  const responsiveBookRecommendation = {
    display: "flex",
    flexShrink: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 2,
  }

  return (
    <>
      <div style={{ padding : "5px"}}>
        <div className='bannerContainer'>
          <img src={banner} style={{ width: "80%", height: 350, marginLeft: "120px", marginTop: "20px" }} />
        </div>

        {/* <div style={{ marginTop: 10 }}>
          <Stack sx={{ margin: 3, padding: 2 }} direction="column" gap={2}>
            <Typography variant="h5" sx={{ textTransformantion: "capitalize", textAlign: "center" }}>Recommended</Typography>

            <Stack direction={isMatch ? "column" : "row"} gap={2} sx={isMatch && { margin: "auto" }}>
              <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/81KAg5fnOhL.jpg"} />
              <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={ElonMusk} />
              <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={ElonMusk} />
              <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={ElonMusk} />
              <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={ElonMusk} />
            </Stack>
          </Stack>
        </div> */}

        <Stack sx={{ p : 2, m : 3}} gap={2}>
          <Typography variant="h5">Famous Categories</Typography>

          <Stack direction="row" gap={2} >
            <DetailsCard bookname={"Elon Musk"} bookprice={"300"} bookauthor={"Meet Panchal"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/81KAg5fnOhL.jpg"} />
            <DetailsCard bookname={"Steve Jobs"} bookprice={"267.89"} bookauthor={"Walter Isaacon"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/41n1edvVlLL.jpg"} />
            <DetailsCard bookname={"The Freedom Manifesto"} bookprice={"500"} bookauthor={"Karan Bajaj"} bookcategory={"biography"} img={"https://m.media-amazon.com/images/I/6150aRkZ-gL.jpg"} />
            <DetailsCard bookname={"The Introverts Edge"} bookprice={"373"} bookauthor={"Matthew Pollard"} bookcategory={"Self-Improvement"} img={"https://m.media-amazon.com/images/I/81t1k8agEXS.jpg"} />
            <DetailsCard bookname={"How to talk to anyone"} bookprice={"300"} bookauthor={"Leil Lowndndes"} bookcategory={"Self-Improvement"} img={"https://m.media-amazon.com/images/I/61MLInWDeJL.jpg"} />
          </Stack>
        </Stack>
      </div>
    </>
  )
}

export default Home;