import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import Applications from "./pages/Applications";
import ApplicationDetail from "./pages/ApplicationDetail";

function App(){

 return(

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Login/>} />

    <Route path="/dashboard" element={<Dashboard/>} />

    <Route path="/create-project" element={<CreateProject/>} />
    <Route path="/my-projects" element={<MyProjects/>} />

    <Route path="/applications" element={<Applications/>} />
    <Route path="/applications/:id" element={< ApplicationDetail />} />

   </Routes>

  </BrowserRouter>

 );

}

export default App;