import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Chat from "./Chat";
import Layout from "./components/Layout";
import Appointment from "./Appointment";
import { fetchUsers } from "./api/user-api";
import { getUsers } from "./slice/userSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await fetchUsers();
      dispatch(getUsers(users));
    };

    fetchUserList();
  }, []);

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to={"/chat"} />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
