import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Introduction from "./pages/Introduction";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}
