import { createRoot } from "react-dom/client";
import { App } from "./gui/App";

let element = document.getElementById("root");

if (element) {
  const root = createRoot(element);
  root.render(<App />);
}
// Render your React component instead
