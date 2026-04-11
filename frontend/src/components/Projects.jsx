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

const BACKEND = 'https://portfolio-vbkz.onrender.com';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchWithRetry = async (retries = 2, delayMs = 3000) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout per attempt

          const res = await fetch(`${BACKEND}/api/projects`, { signal: controller.signal });
          clearTimeout(timeout);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          if (!cancelled) {
            if (Array.isArray(data) && data.length > 0) {
              setProjects(data);
              setError(false);
            } else {
              setProjects(fallbackProjects);
            }
            setLoading(false);
          }
          return; // success — exit loop
        } catch (err) {
          if (err.name === 'AbortError') {
            console.warn(`Projects fetch attempt ${attempt + 1} timed out`);
          } else {
            console.error(`Projects fetch attempt ${attempt + 1} failed:`, err);
          }
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, delayMs));
          } else {
            // All retries exhausted — use fallback
            if (!cancelled) {
              setProjects(fallbackProjects);
              setError(true);
              setLoading(false);
            }
          }
        }
      }
    };

    fetchWithRetry();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-24 px-8 bg-surface-container-low" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-4">Projects Gallery</h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-on-surface-variant text-sm">Connecting to server, please wait…</p>
          </div>
        )}

        {/* Error notice (still shows fallback projects below) */}
        {!loading && error && (
          <p className="text-center text-on-surface-variant text-xs mb-6 opacity-60">
            ⚠️ Could not reach server — showing sample projects.
          </p>
        )}

        {/* Project grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={project._id || idx} className="group bg-surface-container-high rounded-xl overflow-hidden luminous-glow transition-all duration-300">

                {/* Top Section: Title instead of Image */}
                <div className="aspect-video relative overflow-hidden bg-surface-variant flex items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-on-surface group-hover:scale-105 transition-transform duration-500">
                    {project.title}
                  </h3>

                  {/* Hover Overlay for Links */}
                  <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {project.linkUrl && project.linkUrl !== '#' && (
                      <a className="w-12 h-12 rounded-full bg-white text-surface flex items-center justify-center hover:scale-110 transition-transform shadow-lg" href={project.linkUrl} target="_blank" rel="noreferrer">
                        <span className="material-symbols-outlined">link</span>
                      </a>
                    )}
                    {project.codeUrl && project.codeUrl !== '#' && (
                      <a className="w-12 h-12 rounded-full bg-white text-surface flex items-center justify-center hover:scale-110 transition-transform shadow-lg" href={project.codeUrl} target="_blank" rel="noreferrer">
                        <span className="material-symbols-outlined">code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Tags and Description */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary-container text-on-secondary-container">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant text-sm mb-2 line-clamp-3">
                    {project.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
