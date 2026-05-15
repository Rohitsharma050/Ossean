import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Introduction from "./pages/Introduction";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer, toast } from 'react-toastify';
import Trending from "./pages/Trending";
import Discover from "./pages/Discover";
import Feature from "./pages/Feature";
import Bug from "./pages/Bug";
import GsocOrg from "./pages/GsocOrg";

import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient();

export default function App() {

  
  return (
    <div>
      <QueryClientProvider client={queryClient}>

    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/GsocOrg" element={<GsocOrg/>}/>
        <Route path="/feature" element={<Feature/>} />
        <Route path="/bug" element={<Bug/>} />

      </Route> 
    </Routes>
      </QueryClientProvider>
    </div>
  );
}
