import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

// --------- Sample Perfume Data ---------
const initialPerfumes = [
  {
    id: 1,
    name: "🌹 Rose Bliss",
    price: 10,
    image:
      "https://m.media-amazon.com/images/I/71oKYkbMSBL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "🌼 Jasmine Bloom",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1593487568720-92097fb460fb?fm=jpg&q=60&w=3000",
  },
  {
    id: 3,
    name: "🌸 Lavender Mist",
    price: 30,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Fresh_100_ml.jpg?v=1728034537",
  },
  {
    id: 4,
    name: "🌻 Sunflower Glow",
    price: 40,
    image:
      "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg",
  },
  {
    id: 5,
    name: "🌷 Tulip Charm",
    price: 50,
    image:
      "https://cdn.pixabay.com/photo/2017/03/14/11/41/perfume-2142824_640.jpg",
  },
];

// --------- Styles ---------
const pageBackground = {
  minHeight: "100vh",
  padding: "20px",
  background: "linear-gradient(135deg, #fbe7f6, #e0f7fa, #f3f9d2)",
};

const linkStyle = {
  padding: "12px",
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
};

// --------- Layout with Sidebar ---------
function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: "#004d4d",
          color: "white",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            fontSize: "22px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginRight: "12px",
          }}
        >
          ☰
        </button>
        <span style={{ fontWeight: "bold", fontSize: "22px" }}>Perfume Admin</span>
      </div>

      {/* Sidebar */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "220px",
            height: "100%",
            backgroundColor: "#004d4d",
            color: "white",
            paddingTop: "50px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
          }}
        >
          <Link to="/about" style={linkStyle} onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/products" style={linkStyle} onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/order" style={linkStyle} onClick={() => setMenuOpen(false)}>
            Change Order
          </Link>
          <Link
            to="/"
            style={{ ...linkStyle, backgroundColor: "#006666", textAlign: "center" }}
            onClick={() => setMenuOpen(false)}
          >
            ⬅ Back
          </Link>
        </div>
      )}

      {/* Page Content */}
      <div style={pageBackground}>{children}</div>
    </div>
  );
}

// --------- Login Page ---------
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "Thinkerdyne" && password === "12345678") {
      onLogin();
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div style={{ ...pageBackground, textAlign: "center", paddingTop: "100px" }}>
      <h1>Admin Login</h1>
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ margin: "10px" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

// --------- About Page ---------
function About() {
  return (
    <Layout>
      <h1>About Perfume Vending Machine</h1>
      <p>
        This project is a demo admin panel for managing perfumes in a vending
        machine. You can view, edit, reorder, and manage your products here.
      </p>
    </Layout>
  );
}

// --------- Products Page ---------
function Products({ perfumes }) {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Perfume Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {perfumes.map((perfume, index) => (
          <div
            key={perfume.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "220px",
              textAlign: "center",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              {index + 1}. {perfume.name}
            </h3>
            <p>
              <b>Price: ₹{perfume.price}</b>
            </p>
            <img
              src={perfume.image}
              alt={perfume.name}
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
            <br />
            <button
              onClick={() => navigate(`/edit/${perfume.id}`)}
              style={{ marginTop: "10px", cursor: "pointer" }}
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// --------- Edit Page ---------
function EditProduct({ perfumes, setPerfumes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const perfume = perfumes.find((p) => p.id === parseInt(id));
  const [newName, setNewName] = useState(perfume ? perfume.name : "");
  const [newPrice, setNewPrice] = useState(perfume ? perfume.price : "");
  const [newImage, setNewImage] = useState(perfume ? perfume.image : "");

  if (!perfume) {
    navigate("/products");
    return null;
  }

  const handleSave = () => {
    setPerfumes(
      perfumes.map((p) =>
        p.id === perfume.id
          ? { ...p, name: newName, price: newPrice, image: newImage }
          : p
      )
    );
    navigate("/products");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>✏️ Edit Product</h1>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img
          src={newImage}
          alt="preview"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "12px",
            marginBottom: "20px",
            objectFit: "cover",
          }}
        />

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Product Name
          </label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Price (₹)
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Change Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#004d4d",
            color: "white",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          💾 Save
        </button>
        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#777",
            color: "white",
            cursor: "pointer",
          }}
        >
          ⬅ Back
        </button>
      </div>
    </Layout>
  );
}

// --------- Change Order Page ---------
function ChangeOrder({ perfumes, setPerfumes }) {
  const handleMove = (index, direction) => {
    const newPerfumes = [...perfumes];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= perfumes.length) return;
    [newPerfumes[index], newPerfumes[targetIndex]] = [
      newPerfumes[targetIndex],
      newPerfumes[index],
    ];
    setPerfumes(newPerfumes);
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Change Product Order</h1>
      <div style={{ maxWidth: "500px", margin: "20px auto" }}>
        {perfumes.map((p, index) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #aaa",
              borderRadius: "10px",
              padding: "10px 15px",
              marginBottom: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>
              {index + 1}.
            </span>
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "15px",
                }}
              />
              <span>{p.name}</span>
            </div>
            <div>
              <button
                onClick={() => handleMove(index, -1)}
                style={{ marginRight: "5px" }}
              >
                ⬆
              </button>
              <button onClick={() => handleMove(index, 1)}>⬇</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// --------- Main App ---------
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [perfumes, setPerfumes] = useState(initialPerfumes);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products perfumes={perfumes} />} />
        <Route
          path="/edit/:id"
          element={<EditProduct perfumes={perfumes} setPerfumes={setPerfumes} />}
        />
        <Route
          path="/order"
          element={<ChangeOrder perfumes={perfumes} setPerfumes={setPerfumes} />}
        />
      </Routes>
    </Router>
  );
}
