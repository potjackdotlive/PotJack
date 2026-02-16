import { Buffer } from "buffer";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "styles/styles.css";
import "styles/variables.css";
import "styles/tokens.css";
import "./index.css";
import App from "./App";

window.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
