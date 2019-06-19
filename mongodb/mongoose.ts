import mongoose from "mongoose";


mongoose.connect("mongodb://localhost/mydatabase");

let _model = mongoose.Model