import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import "./stylenull.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
