import React, { useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!showDashboard ? (
        <>
          <h1>Welcome</h1>
          <button
            style={{ marginTop: "20px", padding: "10px 20px" }}
            onClick={() => setShowDashboard(true)}
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
