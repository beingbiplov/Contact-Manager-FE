import React from "react";
import { Provider } from "react-redux";

import "./styles/app.css";
import "./components/styles/style.css";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./redux/store/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
