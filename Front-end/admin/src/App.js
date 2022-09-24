import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Pages } from "./pages/Pages";

function App() {
  return (
    <div style={{ backgroundColor: "#fafafa" }}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
