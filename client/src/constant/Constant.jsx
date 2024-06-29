export const BOOK_CATEGORY = [
    { key: "All", value: "", id: 1 },
    { key: "Action and Adventure", value: "Action and Adventure", id: 2 },
    { key: "Biography", value: "Biography", id: 3 },
    { key: "Business/Economics", value: "Business", id: 4 },
    { key: "Classic", value: "Classic", id: 5 },
    { key: "Coding", value: "Coding", id: 6 },
    { key: "Computer&Internet", value: "Computer&Internet", id: 7 },
    { key: "Crime", value: "Crime", id: 8 },
    { key: "Drama", value: "Drama", id: 9 },
    { key: "History", value: "History", id: 10 },
    { key: "Novels", value: "Novels", id: 11 },
    { key: "Poems", value: "Poems", id: 12 },
    { key: "Self-Improvement", value: "Self-Improvement", id: 13 },
    { key: "Romance", value: "Romance", id: 14 }
];

export const BOOK_AUTHOR = [
    { key: "Chetan Bhagat", id: 1 },
    { key: "Mark Manson", id: 2 },
    { key: "Walter Isaacon", id: 3 },
    { key: "Karan Bajaj", id: 4 },
    { key: "Matthew Pollard", id: 5 },
    { key: "Leil Lowndndes", id: 6 },
];

export const BOOK_PUBLISHER = [
    { key: "McGrowHill", id: 1 },
    { key: "Php", id: 2 },
    { key: "Jaico Publishing House", id: 3 },
    { key: "Westland Publications", id: 4 },
    { key: "Roli Books", id: 5 },
]



export const SHIPPING_ERROR = {
    FullNameError : false,
    MobileError : false,
    ResidentialDetailsError : false,
    AreaError : false,
    LandmarkError : false,
    CityError : false,
    StateError : false,
    PincodeError : false
}

export const SHIPPING_ERROR_TEXT = {
    FullNameText: "Please enter your name",
    MobileText: "Please enter your mobile",
    ResidentialDetailsText: "Please enter your residential details",
    AreaText: "Please enter your area",
    LandmarkText: "Please enter your landmark",
    CityText: "Please select your city",
    StateText: "Please select your state",
    PincodeText : "Please enter your pincode"
}

export const BOOK_DETAILS_ERROR = {
    bookISBNNumber: false,
    bookName: false,
    bookPrice: false,
    authorName: false,
    publisherName: false,
    bookEdition: false,
    bookLanguage: false,
    bookImage: false,
    category: false
}

export const BOOK_DETAILS_ERRORTEXT = {
    BookISBNNumberText: "Please enter Book ISBN number",
    BookNameText: "Please enter book name",
    BookPriceText: "Please enter book price",
    AuthorNameText: "Please enter author name",
    BookEditionText: "Please enter book edition",
    BookLanguageText: "Please enter book language",
    BookImageText: "Please enter book image url",
    CategoryText: "Please select book category",
    PublisherText: "Please enter publisher name"
}