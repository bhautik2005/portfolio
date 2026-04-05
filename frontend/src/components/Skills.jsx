import React from 'react';

const Skills = () => {
  return (
    <section className="py-24 px-8 bg-surface" id="skills">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-4">Technical Arsenal</h2>
          <p className="text-on-surface-variant">Specialized expertise across the modern development stack.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skill Category */}
          <div className="bg-surface-container-low p-6 rounded-xl ghost-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">terminal</span>
              <h4 className="font-bold text-lg tracking-tight uppercase text-primary">Frontend</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">React.js</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Tailwind CSS</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Next.js</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">JavaScript</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Framer Motion</span>
            </div>
          </div>
          
          {/* Skill Category */}
          <div className="bg-surface-container-low p-6 rounded-xl ghost-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">dns</span>
              <h4 className="font-bold text-lg tracking-tight uppercase text-primary">Backend</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Node.js</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Express.js</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">MySQL</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105"> MongoDB</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">REST APIs</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Authentication (JWT)</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Fast API</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Streamlit</span>
               
            </div>
          </div>
          
          {/* Skill Category */}
          <div className="bg-surface-container-low p-6 rounded-xl ghost-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h4 className="font-bold text-lg tracking-tight uppercase text-primary">Data &amp; ML</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Python</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Pandas</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">TensorFlow</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Tableau</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Scikit-Learn</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Matplotlib & Seaborn</span>
            </div>
          </div>
          
          {/* Skill Category */}
          <div className="bg-surface-container-low p-6 rounded-xl ghost-border">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">construction</span>
              <h4 className="font-bold text-lg tracking-tight uppercase text-primary">Tools</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Git</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">GitHub</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Docker (basic)</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105"> AWS (EC2/S3)</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">CI/CD</span>
              <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs font-bold transition-all hover:scale-105">Postman</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Skills;
