const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/perfumeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// ✅ Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

// ✅ Get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Add new product
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// ✅ Update product
app.put("/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// ✅ Delete product
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
