import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./Chat";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
