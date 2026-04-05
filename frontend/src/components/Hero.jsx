import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-8 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-block py-1 px-3 rounded-full bg-surface-container-highest border border-outline-variant/20 mb-6">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Available for Innovation</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
           Full-Stack Engineer <br/>
            <span className="text-primary-dim">&amp; AI/ML Systems Developer</span>
          </h1>
          <p className="text-xl text-on-surface-variant font-body max-w-lg mb-10 leading-relaxed">
            Designing scalable backend systems and intelligent AI-powered applications using MERN, Python, and modern machine learning pipelines.
          </p>
          <div className="flex flex-wrap gap-4">
            <a className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-md font-bold transition-transform hover:-translate-y-1 active:scale-95 flex items-center gap-2" href="#projects">
              View My Work
              <span className="material-symbols-outlined text-lg">arrow_downward</span>
            </a>
            <button className="px-8 py-4 rounded-md font-bold border border-primary text-primary hover:bg-primary/5 transition-all flex items-center gap-2">
              Download Resume
              <span className="material-symbols-outlined text-lg">download</span>
            </button>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="aspect-square bg-surface-container-low rounded-xl ghost-border p-8 relative overflow-hidden group">
            <img 
              alt="Data visualization" 
              className="w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-110 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW0eHfitRu740ss_fLPLic_NmCku5s64kXmh42nac-v6HjUtNvu7kUVd87DN5wuoO5WGeKnMrGljsJWnInZAkUdVK58fvTYHVl6Tlp5pewIFl5c4hI2Q5wW7Q2_CP3d8RdKt0wu1lZAx2bde5k6kQ-7Am0UNnxMyGmuv1nCBKB8DG3KuRA89QEF2CxFKiwuxMnl-KYYblcSBxAChXMzyXnF7stmjsCbl7bPeU4pUyrSL8KThH_GI8MZwzgbB8-XIseHVl7Foa_jBvQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-4 text-primary mb-2">
                <span className="h-[1px] w-12 bg-primary"></span>
                <span className="text-sm font-bold tracking-widest uppercase">System Core</span>
              </div>
              <div className="text-2xl font-bold tracking-tight">Precise. Robust. Scalable.</div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
