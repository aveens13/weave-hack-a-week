import React from 'react';
import './projects.css';

const data = [
  {
    title: 'Weave',
    projectTags: 'Web Dev',
    languages: ['javascript', 'html/css'],
  },
  {
    title: 'Avinav',
    projectTags: 'Web Dev',
    languages: ['javascript', 'html/css'],
  },
  {
    title: 'Sulav',
    projectTags: 'Web Dev',
    languages: ['javascript', 'html/css'],
  },
  {
    title: 'Ankit',
    projectTags: 'Web Dev',
    languages: ['javascript', 'html/css'],
  },
];

const projects = () => {
  return (
    <>
      <div className='projects-container'>
        {data.map((project) => {
          const { title, projectTags, languages } = project;
          return (
            <div className='individual-project'>
              <div className='project-info'>
                <h4 className='project-section-tags'>{projectTags}</h4>
                <h1 className='project-section-title'>{title}</h1>
                <h4 className='project-date'>2001-01-01</h4>
              </div>
              <div className='project-section-languages'>
                {languages.map((language) => {
                  return (
                    <li>
                      <span>{language} </span>
                    </li>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default projects;
