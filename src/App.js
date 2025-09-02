import React from "react";
import Dashboard from "./Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = React.useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!showDashboard ? (
        <>
          <h1>Welcome</h1>
          <button onClick={() => setShowDashboard(true)}>
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
