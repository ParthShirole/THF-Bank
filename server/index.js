import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Router from "./routes/routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/', Router)

mongoose.connect("mongodb://localhost:27017/Forms-Practice")


app.listen(8000, () => {
    console.log("Server started on port 8000")
})