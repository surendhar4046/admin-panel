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
  { id: 1, name: "🌹 Rose Bliss", price: 10, image: "https://m.media-amazon.com/images/I/71oKYkbMSBL._UF1000,1000_QL80_.jpg" },
  { id: 2, name: "🌼 Jasmine Bloom", price: 20, image: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?fm=jpg&q=60&w=3000" },
  { id: 3, name: "🌸 Lavender Mist", price: 30, image: "https://bellavitaorganic.com/cdn/shop/files/Fresh_100_ml.jpg?v=1728034537" },
  { id: 4, name: "🌻 Sunflower Glow", price: 40, image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg" },
  { id: 5, name: "🌷 Tulip Charm", price: 50, image: "https://cdn.pixabay.com/photo/2017/03/14/11/41/perfume-2142824_640.jpg" },
];

// --------- Styles ---------
const pageBackground = { minHeight: "100vh", padding: "20px", background: "linear-gradient(135deg, #fbe7f6, #e0f7fa, #f3f9d2)" };
const linkStyle = { padding: "12px", textDecoration: "none", color: "white", fontSize: "18px", cursor: "pointer" };
const cardStyle = { border: "1px solid #ccc", borderRadius: "10px", padding: "15px", width: "220px", textAlign: "center", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" };
const buttonStyle = (bg = "#004d4d") => ({ padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: bg, color: "white", cursor: "pointer" });

// --------- Layout Component ---------
function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#004d4d", color: "white", padding: "10px", display: "flex", alignItems: "center" }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: "22px", background: "none", border: "none", color: "white", cursor: "pointer", marginRight: "12px" }}>☰</button>
        <span style={{ fontWeight: "bold", fontSize: "22px" }}>Perfume Admin</span>
      </div>

      {menuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "220px", height: "100%", backgroundColor: "#004d4d", color: "white", paddingTop: "50px", display: "flex", flexDirection: "column", zIndex: 1000, boxShadow: "2px 0 5px rgba(0,0,0,0.3)" }}>
          {["about", "products", "order", "admin-details"].map((path) => (
            <Link key={path} to={`/${path}`} style={linkStyle} onClick={() => setMenuOpen(false)}>
              {path === "order" ? "Change Order" : path.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
          ))}
          <Link to="/" style={{ ...linkStyle, backgroundColor: "#006666", textAlign: "center" }} onClick={() => setMenuOpen(false)}>⬅ Back</Link>
        </div>
      )}

      <div style={pageBackground}>{children}</div>
    </div>
  );
}

// --------- Login Component ---------
function Login({ onLogin, username, password }) {
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () =>
    inputUser === username && inputPass === password
      ? onLogin()
      : setError("Invalid username or password!");

  // Smaller input style for login
  const loginInputStyle = { width: "300px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" };

  return (
    <div style={{ ...pageBackground, textAlign: "center", paddingTop: "100px" }}>
      <h1>Admin Login</h1>
      <input
        style={{ margin: "10px", ...loginInputStyle }}
        placeholder="Username"
        value={inputUser}
        onChange={e => setInputUser(e.target.value)}
      />
      <input
        style={{ margin: "10px", ...loginInputStyle }}
        type="password"
        placeholder="Password"
        value={inputPass}
        onChange={e => setInputPass(e.target.value)}
      />
      <div>
        <button onClick={handleLogin} style={buttonStyle()}>
          Login
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

// --------- Admin Details Component ---------
function AdminDetails({ username, setUsername, password, setPassword }) {
  const [newUser, setNewUser] = useState(username);
  const [newPass, setNewPass] = useState(password);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    setUsername(newUser);
    setPassword(newPass);
    setMessage("✅ Admin details updated successfully!");
  };

  return (
    <Layout>
      <h1>Admin Details</h1>
      <div style={{ maxWidth: "400px", margin: "0 auto", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
          <input style={inputStyle} value={newUser} onChange={e => setNewUser(e.target.value)} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input style={inputStyle} type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
        </div>
        <button onClick={handleSave} style={buttonStyle()}>💾 Save</button>
        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      </div>
    </Layout>
  );
}

// --------- About Component ---------
function About() {
  return (
    <Layout>
      <h1>About Perfume Vending Machine</h1>
      <p>This project is a demo admin panel for managing perfumes in a vending machine. You can view, edit, reorder, and manage your products here.</p>
    </Layout>
  );
}

// --------- Products Component ---------
function Products({ perfumes }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Perfume Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {perfumes.map((perfume, i) => (
          <div key={perfume.id} style={cardStyle}>
            <h3>{i + 1}. {perfume.name}</h3>
            <p><b>Price: ₹{perfume.price}</b></p>
            <img src={perfume.image} alt={perfume.name} style={{ width: "180px", height: "180px", borderRadius: "10px", objectFit: "cover" }} />
            <br />
            <button onClick={() => navigate(`/edit/${perfume.id}`)} style={{ marginTop: "10px", cursor: "pointer" }}>✏️ Edit</button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// --------- EditProduct Component ---------
function EditProduct({ perfumes, setPerfumes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const perfume = perfumes.find(p => p.id === parseInt(id));
  const [newName, setNewName] = useState(perfume?.name || "");
  const [newPrice, setNewPrice] = useState(perfume?.price || "");
  const [newImage, setNewImage] = useState(perfume?.image || "");

  if (!perfume) { navigate("/products"); return null; }

  const handleSave = () => {
    setPerfumes(perfumes.map(p => p.id === perfume.id ? { ...p, name: newName, price: newPrice, image: newImage } : p));
    navigate("/products");
  };

  const handleImageChange = e => {
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
      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", borderRadius: "12px", backgroundColor: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <img src={newImage} alt="preview" style={{ width: "250px", height: "250px", borderRadius: "12px", marginBottom: "20px", objectFit: "cover" }} />
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Product Name</label>
          <input style={inputStyle} value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Price (₹)</label>
          <input style={inputStyle} type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Change Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button onClick={handleSave} style={buttonStyle()}>💾 Save</button>
        <button onClick={() => navigate("/products")} style={buttonStyle("#777")}>⬅ Back</button>
      </div>
    </Layout>
  );
}

// --------- ChangeOrder Component ---------
function ChangeOrder({ perfumes, setPerfumes }) {
  const handleMove = (i, dir) => {
    const newPerfumes = [...perfumes];
    const target = i + dir;
    if (target < 0 || target >= perfumes.length) return;
    [newPerfumes[i], newPerfumes[target]] = [newPerfumes[target], newPerfumes[i]];
    setPerfumes(newPerfumes);
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>Change Product Order</h1>
      <div style={{ maxWidth: "500px", margin: "20px auto" }}>
        {perfumes.map((p, i) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #aaa", borderRadius: "10px", padding: "10px 15px", marginBottom: "12px", backgroundColor: "#fff", boxShadow: "0 3px 6px rgba(0,0,0,0.1)" }}>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>{i + 1}.</span>
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <img src={p.image} alt={p.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "15px" }} />
              <span>{p.name}</span>
            </div>
            <div>
              <button onClick={() => handleMove(i, -1)} style={{ marginRight: "5px" }}>⬆</button>
              <button onClick={() => handleMove(i, 1)}>⬇</button>
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
  const [username, setUsername] = useState("Thinkerdyne");
  const [password, setPassword] = useState("12345678");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} username={username} password={password} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products perfumes={perfumes} />} />
        <Route path="/edit/:id" element={<EditProduct perfumes={perfumes} setPerfumes={setPerfumes} />} />
        <Route path="/order" element={<ChangeOrder perfumes={perfumes} setPerfumes={setPerfumes} />} />
        <Route path="/admin-details" element={<AdminDetails username={username} setUsername={setUsername} password={password} setPassword={setPassword} />} />
      </Routes>
    </Router>
  );
}
