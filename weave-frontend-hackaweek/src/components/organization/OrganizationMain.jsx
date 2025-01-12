import SideNav from '../sidenav';
import ExplorePage from '../Explore/Explore';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profilepage from '../Profile/profilepage';
import Organization from './Organization';

function OrganizationMain() {
  // const navigate = useNavigate();

  return (
    <div className='user'>
      <BrowserRouter>
        <div className='sidenav'>
          <SideNav className='side_nav' />
        </div>
        <div className='rest-user'>
          {/* <TopNav /> */}
          <Routes>
            <Route path='/' element={<Organization />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/profile' element={<Profilepage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default OrganizationMain;
