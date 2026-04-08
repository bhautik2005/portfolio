import React, { useEffect, useState } from 'react';

const fallbackProjects = [
  {
    title: "Full-Stack Property Booking Platform",
    description: "A high-performance real estate solution featuring real-time availability and secure transactions.",
    
    tags: ["Node.js", "MongoDB"],
    linkUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Market Trend Predictive Engine",
    description: "Analyzing multi-dimensional datasets to forecast retail market shifts with 94% accuracy.",
    
    tags: ["Python", "Scikit-Learn"],
    linkUrl: "#",
    codeUrl: "#"
  },
  {
    title: "Neural Mesh Visualizer",
    description: "Real-time visualization of machine learning model layers and weighted pathways.",
     
    tags: ["React", "D3.js"],
    linkUrl: "#",
    codeUrl: "#"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(' https://portfolio-vbkz.onrender.com/api/projects')
    // 'http://localhost:5000/api/projects
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setProjects(fallbackProjects);
      });
  }, []);

  return (
    <section className="py-24 px-8 bg-surface-container-low" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4">Projects Gallery</h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <div className="flex flex-wrap gap-2">

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.map((project, idx) => (
            // <div key={idx} className="group bg-surface-container-high rounded-xl overflow-hidden luminous-glow transition-all duration-300">
            //   <div className="aspect-video relative overflow-hidden">
            //     <img 
            //       alt={project.title} 
            //       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            //       src={project.imageUrl} 
            //     />
            //     <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            //       <a className="w-12 h-12 rounded-full bg-white text-surface flex items-center justify-center hover:scale-110 transition-transform" href={project.linkUrl || '#'}>
            //         <span className="material-symbols-outlined">link</span>
            //       </a>
            //       <a className="w-12 h-12 rounded-full bg-white text-surface flex items-center justify-center hover:scale-110 transition-transform" href={project.codeUrl || '#'}>
            //         <span className="material-symbols-outlined">code</span>
            //       </a>
            //     </div>
            //   </div>
            //   <div className="p-6">
            //     <div className="flex flex-wrap gap-2 mb-4">
            //       {project.tags.map((tag, tIdx) => (
            //         <span key={tIdx} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary-container text-on-secondary-container">{tag}</span>
            //       ))}
            //     </div>
            //     <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
            //     <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{project.description}</p>
            //   </div>
            // </div>
            <div key={idx} className="group bg-surface-container-high rounded-xl overflow-hidden luminous-glow transition-all duration-300">

              {/* Top Section: Title instead of Image */}
              <div className="aspect-video relative overflow-hidden bg-surface-variant flex items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold text-on-surface group-hover:scale-105 transition-transform duration-500">
                  {project.title}
                </h3>

                {/* Hover Overlay for Links */}
                <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  <a className="w-12 h-12 rounded-full bg-white text-surface flex items-center justify-center hover:scale-110 transition-transform shadow-lg" href={project.linkUrl || '#'}>
                    <span className="material-symbols-outlined">link</span>
                  </a>
                  <a className="w-12 h-12 rounded-full bg-white text-surface flex items-center justify-center hover:scale-110 transition-transform shadow-lg" href={project.codeUrl || '#'}>
                    <span className="material-symbols-outlined">code</span>
                  </a>
                </div>
              </div>

              {/* Bottom Section: Tags and Description */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary-container text-on-secondary-container">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Notice the title was removed from here so it doesn't show twice */}
                <p className="text-on-surface-variant text-sm mb-2 line-clamp-3">
                  {project.description}
                </p>
              </div>

            </div>
          )) : (
            <p className="text-on-surface-variant">Loading projects or no projects available...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
