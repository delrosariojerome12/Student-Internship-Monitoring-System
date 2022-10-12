import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/css/main.css";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {store} from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
