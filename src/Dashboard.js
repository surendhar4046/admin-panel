import React, { useState } from "react";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Initial perfumes (5 images, prices 10,20,30,40,50)
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
    image: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D" 
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
    price: 4440, 
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
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h2>Welcome to Admin Panel</h2>
        <h3>Manage Perfumes</h3>

        {perfumes.map((perfume) => (
          <div
            key={perfume.id}
            style={{
              border: "1px solid gray",
              margin: "10px auto",
              padding: "10px",
              width: "300px",
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
                      style={{ width: "80px", marginTop: "10px" }}
                    />
                  )}
                </div>
                <button onClick={() => handleSave(perfume.id)}>Save</button>
              </>
            ) : (
              <>
                <h4>{perfume.name}</h4>
                <p>Price: ₹{perfume.price}</p>
                {perfume.image ? (
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    style={{ width: "80px" }}
                  />
                ) : (
                  <p>No Image</p>
                )}
                <br />
                <button onClick={() => handleEdit(perfume)}>Edit</button>
                <button onClick={() => handleDelete(perfume.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Login Page
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
