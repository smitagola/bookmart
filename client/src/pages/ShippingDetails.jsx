import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveShippingDetails, getShippingDetails, setShippingId } from "../features/userSlice";
import { SHIPPING_ERROR, SHIPPING_ERROR_TEXT } from "../constant/Constant";
import { TextField, Stack, Paper, Button, Radio, RadioGroup, Box, styled, FormControl, FormControlLabel, FormLabel, Select, MenuItem, InputLabel, Typography, useMediaQuery, useTheme, FormHelperText } from "@mui/material";

const ShippingDetails = () => {
    const theme = useTheme();
    const userData = useSelector(state => state.user.userDetails);
    const shippingDetails = useSelector(state => state.user.shippingDetails);
    const userId = userData.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mediumSize = useMediaQuery(theme.breakpoints.down('md'));

    const boxStyle = {
        margin: "0px 5px",
        width: "100%",
        maxWidth: "450px"
    }

    const WrapperDiv = styled(Box)(({ theme }) => ({
        margin: "0px 5px",
        width: "100%",
        maxWidth: "450px"
    }));

    // for shipping address is registered or not
    const [addressExists, setAddressExists] = useState(false);
    const [shippingData, setShippingData] = useState({
        FullName: "",
        Mobile: "",
        Pincode: 0,
        ResidentialDetails: "",
        Area: "",
        Landmark: "",
        City: "",
        State: ""
    });
    const [shippingError, setShippingError] = useState(SHIPPING_ERROR);
    const [shippingErrorText, setShippingErrorText] = useState(SHIPPING_ERROR_TEXT);

    let { FullName, Mobile, ResidentialDetails, Area, Landmark, City, State, Pincode } = shippingData;

    const { FullNameError, MobileError, ResidentialDetailsError, AreaError, LandmarkError, CityError, StateError, PincodeError } = shippingError;

    const { FullNameText, MobileText, ResidentialDetailsText, AreaText, LandmarkText, CityText, StateText, PincodeText } = shippingErrorText;
    console.log(userId)
    
    useEffect(() => {
        // Check if user shipping adress is stored in database or not and store than display it on form
        // dispatch(getShippingDetails(userId));
        setShippingData({ ...shippingData, UserId: userId })
        axios.get(`http://localhost:7001/shippingDetails/user-address/${userId}`)
            .then((res) => {
                if (res.data) {
                    let addressData = res.data;
                    setShippingData(addressData);
                    dispatch(setShippingId(addressData.ShippingId))
                    setAddressExists(true)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target;
        setShippingError({ ...shippingError, [`${name}Error`]: false });
        setShippingData({ ...shippingData, [name]: value })
    }

    const proceedToPayment = () => {
        if (FullName === "" && Mobile === "" && ResidentialDetails === "" && Area === "" && Landmark === "" && City === "" && State === "" && Pincode === 0) {
            setShippingError({
                firstNameError: true,
                lastNameError: true,
                genderError: true,
                emailError: true,
                flatNoError: true,
                societyNameError: true,
                streetNameError: true,
                pinCodeError: true,
                cityError: true,
                stateError: true
            })
        } else if (FullName === "") {
            setShippingError({ ...shippingError, FullNameError: true })
        } else if (Mobile === "") {
            setShippingError({ ...shippingError, MobileError: true })
        } else if (ResidentialDetails === "") {
            setShippingError({ ...shippingError, ResidentialDetailsError: true })
        } else if (Area === "") {
            setShippingError({ ...shippingError, AreaError: true })
        } else if (Landmark === "") {
            setShippingError({ ...shippingError, LandmarkError: true })
        } else if (City === "") {
            setShippingError({ ...shippingError, CityError: true })
        } else if (State === "") {
            setShippingError({ ...shippingError, StateError: true })
        } else if (Pincode === 0) {
            setShippingError({ ...shippingError, PincodeError: true })
        } else {
            // UserId = userId;
            let obj = {
                FullName,
                Mobile,
                ResidentialDetails,
                Area,
                Landmark,
                City,
                State,
                Pincode,
                userId
            }

            if (!addressExists) {
                dispatch(saveShippingDetails(obj));
            }
            navigate("/payment-options");
        }
    }

    return (
        <>
            <Paper sx={{ margin: "20px auto", width: "40%" }}>
                <Box sx={{ padding: "5px 30px" }}>
                    <Typography variant="h5" gutterBottom={true}>Shipping Details</Typography>
                    <Stack direction={"column"}>
                        <Box sx={boxStyle}>
                            <TextField
                                margin="dense"
                                size="normal"
                                label="Full Name"
                                variant="standard"
                                placeholder="John doe"
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                name="FullName"
                                value={FullName}
                                error={FullNameError}
                                onChange={handleChange}
                                helperText={FullNameError && FullNameText}
                                sx={{ width: "100%" }}
                            />

                            <TextField
                                margin="dense"
                                size="normal"
                                label="Mobile"
                                variant="standard"
                                placeholder="98752146324"
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                name="Mobile"
                                value={Mobile}
                                error={MobileError}
                                onChange={handleChange}
                                helperText={MobileError && MobileText}
                                sx={{ width: "100%" }}
                            />

                            <TextField
                                margin="dense"
                                size="normal"
                                label="Residential Details"
                                variant="standard"
                                placeholder="A-21, Sunrise Apartment"
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                name="ResidentialDetails"
                                value={ResidentialDetails}
                                error={ResidentialDetailsError}
                                onChange={handleChange}
                                helperText={ResidentialDetailsError && ResidentialDetailsText}
                                sx={{ width: "100%" }}
                            />

                            <TextField
                                margin="dense"
                                size="normal"
                                label="Area"
                                variant="standard"
                                placeholder="Vastral"
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                name="Area"
                                value={Area}
                                error={AreaError}
                                onChange={handleChange}
                                helperText={AreaError && AreaText}
                                sx={{ width: "100%" }}
                            />

                            <TextField
                                margin="dense"
                                size="normal"
                                label="Landmark"
                                variant="standard"
                                placeholder="Nr Tower"
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                name="Landmark"
                                value={Landmark}
                                error={LandmarkError}
                                onChange={handleChange}
                                helperText={LandmarkError && LandmarkText}
                                sx={{ width: "100%" }}
                            />

                            <TextField
                                margin="dense"
                                size="normal"
                                label="Pincode"
                                variant="standard"
                                placeholder="382418"
                                InputLabelProps={{ shrink: true }}
                                type="text"
                                name="Pincode"
                                value={Pincode}
                                error={PincodeError}
                                onChange={handleChange}
                                helperText={PincodeError && PincodeText}
                                sx={{ width: "100%" }}
                            />

                            <FormControl
                                variant="standard"
                                sx={{ width: "100%", mt: 1 }}
                            >
                                <InputLabel
                                    InputLabelProps={{ shrink: true }}
                                >
                                    State</InputLabel>

                                <Select
                                    name="State"
                                    value={State}
                                    error={StateError}
                                    helperText={StateError && StateText}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Gujrat">Gujrat</MenuItem>
                                </Select>
                                {
                                    (StateError && <FormHelperText sx={{ color: "#d32f2f" }}>{StateText}</FormHelperText>)
                                }
                            </FormControl>

                            <FormControl
                                variant="standard"
                                sx={{ width: "100%", mt: 1 }}

                            >
                                <InputLabel
                                    InputLabelProps={{ shrink: true }}
                                >
                                    City</InputLabel>

                                <Select
                                    name="City"
                                    value={City}
                                    error={CityError}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                                </Select>
                                {
                                    (CityError && <FormHelperText sx={{ color: "#d32f2f" }}>{CityText}</FormHelperText>)
                                }
                            </FormControl>
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ margin: "5px 0px 10px 18px", padding: 2 }}>
                    <Button variant="contained" sx={{ width: "250px" }} size="large" onClick={proceedToPayment}>Proceed to payment</Button>
                </Box>
            </Paper>
        </>
    )
}

export default ShippingDetails;