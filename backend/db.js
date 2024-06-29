import mysql from "mysql";

//connect to database in mysql
export const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "bookmart",
});