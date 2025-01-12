import React from "react";
import "./Language.css";

const LanguageProgressBar = ({ languages }) => {
  return (
    <div className="progress-bar-container">
      <h3>Languages</h3>
      {languages.map((language, index) => (
        <div key={index} className="language-item">
          <div className="language-header">
            <span>{language.name}</span>
            <span>{language.percentage}%</span>
          </div>
          <div className="progress-bar-background">
            <div
              className="progress-bar-fill"
              style={{
                width: `${language.percentage}%`,
                backgroundColor: language.color,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LanguageProgressBar;
