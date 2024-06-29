import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `http://localhost:7001`;

export const fetchBooks = createAsyncThunk(
    "book/fetchBooks",
    async () => {
        const response = await axios.get(`${URL}/books`);
        return response.data;
    }
);

export const fetchCategories = createAsyncThunk(
    "book/fetchCategories",
    async () => {
        const response = await axios.get(`${URL}/category`);
        return response.data;
    }
)

export const fetchBookDetails = createAsyncThunk(
    "book/fetchBookDetails",
    async (ISBN) => {
        // const URL = `http://localhost:7001`;
        const response = await axios.get(`${URL}/books/${ISBN}`);
        return response.data;
    }
);

export const createNewBook = createAsyncThunk(
    "book/createNewBook",
    async (data) => {
        const response = await axios.post(`${URL}/books/new`, data);
        return response.data;
    }
);

export const updateBook = createAsyncThunk(
    "book/updateBook",
    async (data) => {
        const BookISBNNumber = data.BookISBNNumber;
        await axios.patch(`${URL}/books/update-book/${BookISBNNumber}`, data);
    }
)

export const deleteBook = createAsyncThunk(
    "book/deleteBook",
    async (isbn) => {
        const response = await axios.delete(`${URL}/books/delete-book/${isbn}`);
    }
)

export const searchBook = createAsyncThunk(
    "book/searchBook",
    async (word) => {
        const response = await axios.get(`${URL}/books/search/${word}`);
        return response.data;
    }
)

export const bookSlice = createSlice({
    name: "book",
    initialState: {
        bookdetails: [],
        categories : [],
        authors : [],
        publishers : [],
        bookinformation: {
            BookISBNNumber: "",
            BookName: "",
            AuthorName: "",
            BookPrice: 0,
            PublisherName: "",
            BookEdition: "",
            BookLanguage: "",
            BookImage: "",
            CategoryId: 0,
            CategoryName: ""
        },
        loading: false,
        error: ""
    },
    reducers: {
        browseBookDetails : (state, action) => {
            console.log(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.bookdetails = action.payload;
            state.error = "";
        });

        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.loading = false;
            state.bookdetails = [];
            state.error = action.error.message;
        });

        builder.addCase(fetchBookDetails.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.bookinformation = action.payload;
            state.error = "";
        });

        builder.addCase(fetchBookDetails.rejected, (state, action) => {
            state.loading = false;
            state.bookinformation = {};
            state.error = action.error.message;
        });

        builder.addCase(createNewBook.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(createNewBook.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(createNewBook.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchCategories.pending, (state) => { state.loading = true});

        builder.addCase(fetchCategories.fulfilled, (state,action) => {
            state.loading = false;
            state.categories = action.payload;
        });

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(searchBook.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(searchBook.fulfilled, (state,action) => {
            state.loading = false;
            state.bookdetails = action.payload;
            state.error = "";
        });

        builder.addCase(searchBook.rejected, (state,action) => {
            state.loading = false;
            state.bookdetails = [];
            state.error = action.error.message;
        });
    }
});

export const { browseBookDetails } = bookSlice.actions;
export default bookSlice.reducer;