import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartBookDetails: [],
        totalPrice: 0,
        totalUnits: 0
    },
    reducers: {
        addToCart: (state, action) => {
            let ISBN = action.payload.BookISBNNumber;

            let flag = 1;
            let alredyExist = false;
            state.cartBookDetails.map(book => {
                if (book.BookISBNNumber == ISBN) {
                    flag = -1;
                }
            })

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
            });
            console.log(state.cartBookDetails)
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
         
            state.cartBookDetails.map(book => {
                if (book.BookISBNNumber == ISBN) {
                    if(book.units !== 0)
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
        }
    }
});

export const { addToCart, removeFromCart, incrementUnit, decrementUnit } = cartSlice.actions;
export default cartSlice.reducer;