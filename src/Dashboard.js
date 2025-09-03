import React, { useState } from "react";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Initial perfumes
  const [perfumes, setPerfumes] = useState([
    { 
      id: 1, 
      name: "🌹 Rose Bliss", 
      price: 10, 
      image: "https://media.gettyimages.com/id/637623730/photo/still-life-womens-perfume-in-beautiful-bottle-on-beads.jpg?s=612x612&w=gi&k=20&c=lH2bKkdmbHBp_HTQ4l7ZYQ_Jdor5ushZTb9M0fN1Lms=" 
    },
    { 
      id: 2, 
      name: "🌼 Jasmine Bloom", 
      price: 20, 
      image: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?fm=jpg&q=60&w=3000" 
    },
    { 
      id: 3, 
      name: "🌸 Lavender Mist", 
      price: 30, 
      image: "https://bellavitaorganic.com/cdn/shop/files/Fresh_100_ml.jpg?v=1728034537&width=1000" 
    },
    { 
      id: 4, 
      name: "🌻 Sunflower Glow", 
      price: 40, 
      image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?cs=srgb&dl=pexels-valeriya-1961792.jpg&fm=jpg" 
    },
    { 
      id: 5, 
      name: "🌷 Tulip Charm", 
      price: 50, 
      image: "https://cdn.pixabay.com/photo/2017/03/14/11/41/perfume-2142824_640.jpg" 
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");

  // Handle Login
  const handleLogin = () => {
    if (username === "Thinkerdyne" && password === "12345678") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password!");
    }
  };

  // Edit perfume details
  const handleEdit = (perfume) => {
    setEditingId(perfume.id);
    setNewName(perfume.name);
    setNewPrice(perfume.price);
    setNewImage(perfume.image);
  };

  const handleSave = (id) => {
    setPerfumes(
      perfumes.map((p) =>
        p.id === id ? { ...p, name: newName, price: newPrice, image: newImage } : p
      )
    );
    setEditingId(null);
    setNewName("");
    setNewPrice("");
    setNewImage("");
  };

  const handleDelete = (id) => {
    setPerfumes(perfumes.filter((p) => p.id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // After login → show perfumes
  if (loggedIn) {
    return (
      <div style={{ backgroundColor: "#fdf6f0", minHeight: "100vh", padding: "30px" }}>
        <h2 style={{ textAlign: "center" }}>Welcome to Admin Panel</h2>
        <h3 style={{ textAlign: "center" }}>Manage Perfumes</h3>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              style={{
                border: "2px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                width: "250px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              {editingId === perfume.id ? (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                  <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {newImage && (
                      <img
                        src={newImage}
                        alt="preview"
                        style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }}
                      />
                    )}
                  </div>
                  <button onClick={() => handleSave(perfume.id)}>Save</button>
                </>
              ) : (
                <>
                  <h4>{perfume.name}</h4>
                  <p style={{ fontWeight: "bold" }}>Price: ₹{perfume.price}</p>
                  {perfume.image ? (
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                  <br />
                  <button onClick={() => handleEdit(perfume)} style={{ margin: "5px" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(perfume.id)} style={{ margin: "5px" }}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // LoginPage
  return (
    <div style={{ backgroundColor: "#fef9f4", minHeight: "100vh", textAlign: "center", paddingTop: "100px" }}>
      <h2>Admin Login</h2>
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

export default Dashboard;
