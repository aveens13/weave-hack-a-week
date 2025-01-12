import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader/profile';
import Heatmap from './Heatmap/heatmap';
import './profilepage.css';
import PopularRepoPage from './PopularRepositories/PopularRepositories'
import LanguageProgressBar from "./LanguageBar/LanguageProgressBar"; // Import the Language component
import initialLanguages from "./LanguageBar/data"; // Import the initial data

function Profile() {
  const [languages, setLanguages] = useState(initialLanguages);


  return (
    <>
      
      <div className="profile-container">
        <ProfileHeader />
      </div>
      
        <div className="heatmap-language-container"> 
          <div class="heatmap-container">
            <Heatmap />
          </div>

          <div className='language-container'>
            <LanguageProgressBar languages={languages} />
          </div>
        </div>

        <div className="repo"> 
              <PopularRepoPage /> 
          </div>      
          
        
        
      
    </>
  );
}

export default Profile;