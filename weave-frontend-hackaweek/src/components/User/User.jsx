
import TopNav from "../topnav";
import SideNav from "../sidenav";
import Home from "../home";
import ExplorePage from "../Explore/Explore";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Project from "../ProjectHome/Project";
import "./user.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import Profile from '../Profile/profilepage';


function User() {
  // console.table(getmonth(3));
  const [projectId, setProjectId] = useState();
  // const navigate = useNavigate();

  function handleProject(id) {
    setProjectId(id);
  }

  const handlePin = (id) => {
    setProjectId(id);
    // navigate("/project");
  };
  return (
    <div className='user'>
      <BrowserRouter>

        <QueryClientProvider client={queryClient}>
          <div className="sidenav">
            <SideNav className="side_nav" handlePin={handlePin} />
          </div>
          <div className="rest-user">
            {/* <TopNav /> */}
            <Routes>
              <Route
                path="/"
                element={<Home className="home" handleClick={handleProject} />}
              />
              <Route
                path="/project"
                element={<Project projectId={projectId} />}
              />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default User;
