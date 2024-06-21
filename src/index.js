import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

function App() {
  return <AppRouter />;
}

root.render(<App />);
