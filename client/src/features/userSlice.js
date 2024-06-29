import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `http://localhost:7001`;
const JWT_TOKEN_KEY = "bookmart";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (data) => {
        console.log(data);
        const response = await axios.post(`${URL}/users/new`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (data) => {
        const response = await axios.post(`${URL}/users/login`, data);
        return response;
    }
);

export const getShippingDetails = createAsyncThunk(
    "user/getShippingDetails",
    async (id) => {
        const response = await axios.get(`${URL}/shippingDetails/user-address/${id}`);
        return response;
    }
)

export const saveShippingDetails = createAsyncThunk(
    "user/saveShippingDetails",
    async (data) => {
        const response = await axios.post(`${URL}/shippingDetails/save-address`, data);
        return response;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isLoggedIn: false,
        users: [],
        userDetails: {},
        response: "",
        error: "",
        cartBookDetails: [],
        totalPrice: 0,
        totalUnits: 0,
        shippingId : {},
        paymentDetails : {}
    },
    reducers: {
        logoutUser: (state) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.users = [];
            state.error = "";
            state.shippingId = {};
            state.paymentDetails = {};
            state.cartBookDetails = [];
            state.shippingDetails = {};
            state.paymentDetails = {};
            state.userDetails = {};
            state.totalPrice = 0;
            state.totalUnits = 0;
            state.response = "";
        },
        addToCart: (state, action) => {
            let ISBN = action.payload.BookISBNNumber;

            let flag = 1;
            let alredyExist = false;

            if(state.cartBookDetails !== []){
                state.cartBookDetails.map(book => {
                    if (book.BookISBNNumber == ISBN) {
                        flag = -1;
                    }
                })
            } else {
                flag = 1;
            }

            if (flag == -1)
                alredyExist = true;
            else
                alredyExist = false;

            if (!alredyExist) {
                state.cartBookDetails.push(action.payload);
            } else {
                state.cartBookDetails.map(book => {
                    // book.units += 1;
                    if (book.BookISBNNumber == ISBN) {
                        book.units += 1;
                    }
                });
            }

            state.totalPrice = 0;
            state.totalUnits = 0;
            state.cartBookDetails.map(book => {
                let price;
                if (book.units == 1) {
                    state.totalPrice += book.BookPrice;
                } else if (book.units > 1) {
                    price = book.BookPrice * book.units;
                    state.totalPrice += price;
                }
                state.totalUnits += book.units;
            })
        },
        removeFromCart: (state, action) => {
            let ISBN = action.payload;

            let array = new Array();
            array = state.cartBookDetails.filter((book) => (book.BookISBNNumber !== ISBN && book))
            state.cartBookDetails = array;

            state.totalPrice = 0;
            state.totalUnits = 0;
            state.cartBookDetails.map(book => {
                let price;
                if (book.units == 1) {
                    state.totalPrice += book.BookPrice;
                } else if (book.units > 1) {
                    price = book.BookPrice * book.units;
                    state.totalPrice += price;
                }
                state.totalUnits += book.units;
            })
        },
        incrementUnit: (state, action) => {
            let ISBN = action.payload;
            // console.log(ISBN);

            state.cartBookDetails.map(book => {
                if (book.BookISBNNumber == ISBN) {
                    book.units += 1;
                }
            })

            state.totalPrice = 0;
            state.totalUnits = 0;
            state.cartBookDetails.map(book => {
                let price;
                if (book.units == 1) {
                    state.totalPrice += book.BookPrice;
                } else if (book.units > 1) {
                    price = book.BookPrice * book.units;
                    state.totalPrice += price;
                }
                state.totalUnits += book.units;
            })
        },
        decrementUnit: (state, action) => {
            let ISBN = action.payload;
            // console.log(ISBN);

            state.cartBookDetails.map(book => {
                if (book.BookISBNNumber == ISBN) {
                    book.units -= 1;
                }
            })

            state.totalPrice = 0;
            state.totalUnits = 0;
            state.cartBookDetails.map(book => {
                let price;
                if (book.units == 1) {
                    state.totalPrice += book.BookPrice;
                } else if (book.units > 1) {
                    price = book.BookPrice * book.units;
                    state.totalPrice += price;
                }
                state.totalUnits += book.units;
            })
        },
        savePaymentDetails : (state,action) => {
            state.paymentDetails = action.payload;
        },
        setShippingId : (state, action) => {
            state.shippingId = action.payload;
        },
        clearCart : (state) => {
            state.cartBookDetails = [];
            state.totalPrice = 0;
            state.totalUnits = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            let msg = action.payload;
            state.response = msg.message;
        });

        builder.addCase(registerUser.rejected, (action) => {
            console.log(action.payload);
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.isLoggedIn = false;
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            let statusCode = action.payload.status;
           
            if(statusCode == 201){
                state.noUserFound = true;
            } else if(statusCode == 200){
                state.userDetails = action.payload.data; 
                state.isLoggedIn = true;
            }
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload.message;
            state.isLoggedIn = false;
        });

        builder.addCase(getShippingDetails.pending, (state) => {
            state.loading = true;
            state.shippingDetails = {};
        });

        builder.addCase(getShippingDetails.fulfilled, (state,action) => {
            state.loading = false;
            if(action.payload.status === 200)
                state.shippingDetails = action.payload.data;
            else    
                state.shippingDetails = {};
            state.error = "";
        });

        builder.addCase(getShippingDetails.rejected, (state,action) => {
            state.loading = false;
            state.shippingDetails = {};
            state.error = action.error.message;
        });

        builder.addCase(saveShippingDetails.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.shippingDetails = {};
        });

        builder.addCase(saveShippingDetails.fulfilled, (state,action) => {
            state.loading = false;
            state.shippingDetails = action.payload.data;
            state.error = "";
        });

        builder.addCase(saveShippingDetails.rejected, (state,action) => {
            state.loading = false;
            state.shippingDetails = {};
            state.error = action.error.message;
        })
    }
})

export const { logoutUser, addToCart, removeFromCart, incrementUnit, decrementUnit, savePaymentDetails, setShippingId, clearCart } = userSlice.actions;
export default userSlice.reducer;