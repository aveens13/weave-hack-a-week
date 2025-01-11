import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProjectTypes, setActiveProjectTypes] = useState([]);
  const [activeLanguages, setActiveLanguages] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const projectTypes = [
    'All',
    'AI Application',
    'Data Analysis',
    'Web Design',
    'Mobile App Development',
    'Game Development',
    'Cybersecurity',
  ];

  const languages = [
    'All',
    'Python',
    'JavaScript',
    'Java',
    'C++',
    'Ruby',
    'Go',
    'Swift',
  ];

  const filters = ['Dolby ATMOS', 'Mastering', 'Mixing', 'Studio Booking'];

  const handleProjectTypeClick = (type) => {
    if (type === 'All') {
      setActiveProjectTypes(['All']);
    } else {
      setActiveProjectTypes((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev.filter((item) => item !== 'All'), type]
      );
    }
  };

  const handleLanguageClick = (language) => {
    if (language === 'All') {
      setActiveLanguages(['All']);
    } else {
      setActiveLanguages((prev) =>
        prev.includes(language)
          ? prev.filter((item) => item !== language)
          : [...prev.filter((item) => item !== 'All'), language]
      );
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const handleClearAll = () => {
    setActiveProjectTypes([]);
    setActiveLanguages([]);
    setActiveFilters([]);
  };

  return (
    <div className='search-bar-container'>
      {/* Search Bar */}
      <div className='search-bar'>
        <div className='search-label-container'>
          <i className='fas fa-search search-icon'></i>
          <div className='search-label'>Search Projects</div>
        </div>
        <input
          type='text'
          className='search-input'
          placeholder='Search by name, tags, languages and more'
        />
        <div className='button-group'>
          <button
            className='filter-button'
            onClick={() => setIsModalOpen(true)}
          >
            <i className='fas fa-sliders-h'></i> Filters
          </button>
          <button className='search-button'>
            <i className='fas fa-search'></i>
          </button>
        </div>
      </div>

      {/* Filtering Items */}
      <div className='filter-items'>
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-item ${
              activeFilters.includes(filter) ? 'clicked' : ''
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h2>Filters</h2>
              <button
                className='close-button'
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className='modal-body'>
              {/* Project Types */}
              <div className='filter-section'>
                <h3>Project Types</h3>
                <div className='filter-items'>
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      className={`filter-item ${
                        activeProjectTypes.includes(type) ? 'clicked' : ''
                      }`}
                      onClick={() => handleProjectTypeClick(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className='filter-section'>
                <h3>Languages</h3>
                <div className='filter-items'>
                  {languages.map((language) => (
                    <button
                      key={language}
                      className={`filter-item ${
                        activeLanguages.includes(language) ? 'clicked' : ''
                      }`}
                      onClick={() => handleLanguageClick(language)}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='modal-footer'>
              <button className='clear-button' onClick={handleClearAll}>
                Clear all
              </button>
              <button
                className='apply-button'
                onClick={() => setIsModalOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
