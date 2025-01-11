import React, { useState } from 'react';
import './Explore.css';
import image from '../../assets/image.jpg';
import SearchBar from './SearchBar/SearchBar';
import ProjectCard from './ProjectCard/ProjectCard';

export default function ExplorePage() {
  const [projects, setProjects] = useState([
    {
      projectId: 1,
      projectTitle: 'AI-Powered Chatbot',
      tags: ['AI', 'Chatbot'],
      languages: ['Python', 'JavaScript'],
      members: [{ name: 'Alice' }, { name: 'Bob' }],
      image: '../../../public/8.avif',
      liked: true,
      likeCount: 5,
    },
    {
      projectId: 2,
      projectTitle: 'E-Commerce Platform',
      tags: ['Web', 'E-Commerce'],
      languages: ['React', 'Node.js'],
      members: [{ name: 'Charlie' }, { name: 'Dave' }],
      image: '../../../public/7.avif',
      liked: false,
      likeCount: 2,
    },
    {
      projectId: 3,
      projectTitle: 'Data Visualization Tool',
      tags: ['Data Science', 'Visualization'],
      languages: ['D3.js', 'Python'],
      members: [{ name: 'Eve' }, { name: 'Frank' }],
      image: '../../../public/6.avif',
      liked: true,
      likeCount: 3,
    },
    {
      projectId: 4,
      projectTitle: 'Mobile Fitness App',
      tags: ['Mobile', 'Fitness'],
      languages: ['Flutter', 'Dart'],
      members: [{ name: 'Grace' }, { name: 'Hank' }],
      image: '../../../public/5.jpg',
      liked: false,
      likeCount: 0,
    },
    {
      projectId: 5,
      projectTitle: 'Machine Learning Model',
      tags: ['AI', 'ML'],
      languages: ['Python', 'TensorFlow'],
      members: [{ name: 'Ivy' }],
      image: '../../../public/4.avif',
      liked: true,
      likeCount: 10,
    },
    {
      projectId: 6,
      projectTitle:
        'Portfolio Website For Aspiring Candidates of The Year of March in the Winter',
      tags: ['Web', 'Portfolio'],
      languages: ['HTML', 'CSS', 'JavaScript'],
      members: [{ name: 'John' }],
      image: '../../../public/3.jpg',
      liked: false,
      likeCount: 1,
    },
    {
      projectId: 7,
      projectTitle: 'Game Development',
      tags: ['Gaming', 'Unity'],
      languages: ['C#'],
      members: [{ name: 'Sam' }, { name: 'Chris' }],
      image: '../../../public/2.jpg',
      liked: true,
      likeCount: 8,
    },
    {
      projectId: 8,
      projectTitle: 'Finance Tracker',
      tags: ['Finance', 'Tools'],
      languages: ['Java', 'Spring'],
      members: [{ name: 'Anna' }],
      image: '../../../public/1.jpg',
      liked: false,
      likeCount: 0,
    },
  ]);

  const handleLikeToggle = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.projectId === projectId
          ? {
              ...project,
              liked: !project.liked,
              likeCount: project.liked
                ? project.likeCount - 1
                : project.likeCount + 1,
            }
          : project
      )
    );
  };

  const likedProjects = projects.filter((project) => project.liked);

  // Group projects by their first tag
  const groupedProjects = projects.reduce((groups, project) => {
    const groupKey = project.tags[0]; // First tag as key
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(project);
    return groups;
  }, {});

  return (
    <div className='explore-container'>
      <div className='explore-section-hero'>
        <h3 className='explore-title'>Explore Projects</h3>
        <p className='explore-subtitle'>
          Discover innovative projects created by talented developers and
          students.
        </p>
        <SearchBar />
      </div>

      {likedProjects.length > 0 && (
        <div className='liked-projects-section'>
          <h4 className='projects-heading'>Liked Projects</h4>
          <div className='projects-grid'>
            {likedProjects.map((project) => (
              <ProjectCard
                key={project.projectId}
                tags={project.tags}
                languages={project.languages}
                title={project.projectTitle}
                authors={project.members.map((member) => member.name)}
                posterUrl={project.image ? project.image : image}
                onLikeToggle={() => handleLikeToggle(project.projectId)}
                liked={project.liked}
                likeCount={project.likeCount}
              />
            ))}
          </div>
        </div>
      )}

      {Object.keys(groupedProjects).map((tag) => (
        <div key={tag} className='projects-section'>
          <h4 className='projects-heading'>{tag} Projects</h4>
          <div className='projects-grid'>
            {groupedProjects[tag].map((project) => (
              <ProjectCard
                key={project.projectId}
                tags={project.tags}
                languages={project.languages}
                title={project.projectTitle}
                authors={project.members.map((member) => member.name)}
                posterUrl={project.image ? project.image : image}
                onLikeToggle={() => handleLikeToggle(project.projectId)}
                liked={project.liked}
                likeCount={project.likeCount}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
