import React, { useReducer } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { context } from "./context/context";
import { InitialState, reducer } from "./reducer/UserReducer";
import "./App.css";

function App() {
  const [values, setValue] = useReducer(reducer, InitialState);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <context.Provider value={{ valuesctx: values, dispatch: setValue }}>
          <Navbar />
        </context.Provider>
      </Router>
    </div>
  );
}

export default App;
