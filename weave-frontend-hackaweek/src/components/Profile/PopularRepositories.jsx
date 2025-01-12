import ProjectCard from "../Explore/ProjectCard/ProjectCard";
import React, { useState } from "react";
import "./PopularRepositories.css";
import image from "../../assets/image.jpg";

// import image from "../../../assets/profile.jpeg"
export default function PopularRepoPage() {
  console.log(image);
  const [projects, setProjects] = useState([
    {
      projectId: 1,
      projectTitle: "AI-Powered Chatbot",
      tags: ["AI", "Chatbot"],
      languages: ["Python", "JavaScript"],
      members: [{ name: "Alice" }, { name: "Bob" }],
      image: image,
      liked: true,
      likeCount: 5,
    },
    {
      projectId: 2,
      projectTitle: "E-Commerce Platform",
      tags: ["Web", "E-Commerce"],
      languages: ["React", "Node.js"],
      members: [{ name: "Charlie" }, { name: "Dave" }],
      image: image,
      liked: false,
      likeCount: 2,
    },
    {
      projectId: 3,
      projectTitle: "Data Visualization Tool",
      tags: ["Data Science", "Visualization"],
      languages: ["D3.js", "Python"],
      members: [{ name: "Eve" }, { name: "Frank" }],
      image: image,
      liked: true,
      likeCount: 3,
    },
    {
      projectId: 4,
      projectTitle: "Mobile Fitness App",
      tags: ["Mobile", "Fitness"],
      languages: ["Flutter", "Dart"],
      members: [{ name: "Grace" }, { name: "Hank" }],
      image: image,
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

  return (
    <div className="explore-container">
      <div className="explore-section-hero">
        <h3 className="explore-title">Popular Projects</h3>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
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
  );
}
