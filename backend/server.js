const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (use your own MongoDB Atlas URI)
mongoose.connect("mongodb://localhost:27017/perfumes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
