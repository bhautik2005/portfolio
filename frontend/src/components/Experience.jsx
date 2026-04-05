import React from 'react';

const Experience = () => {
  return (
    <section className="py-24 px-8 bg-surface" id="experience">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter mb-8">Professional Journey</h2>
          <div className="space-y-12">

            {/* Timeline Item */}
            <div className="relative pl-8 border-l-2 border-surface-variant">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary active-dot"></div>
              <div className="mb-2">
                <span className="text-primary font-headline font-bold text-lg">Mar 2026 — PRESENT</span>
                <h3 className="text-2xl font-bold text-white">Data Science & Analytics</h3>
                <p className="text-on-surface-variant font-medium">at ZIDIO</p>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
               Continuously learning new concepts by applying them through real-world project implementations.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-surface-variant">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-variant"></div>
              <div className="mb-2">
                <span className="text-on-surface-variant font-headline font-bold text-lg">Jul 2025</span>
                <h3 className="text-2xl font-bold text-white"> Generative AI </h3>
                <p className="text-on-surface-variant font-medium">at Prodigy Infotech!</p>
                <a
                  href="https://www.linkedin.com/posts/bhautik2005_certificate-and-letter-of-recommendaton-activity-7361212268937666560-L9c1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-gray-300 transition-all duration-300 ease-in-out hover:text-primary hover:scale-110 hover:tracking-wide"
                >
                  certificate + recommendation letter
                </a>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Gained hands-on experience in advanced AI concepts and real-world problem solving, combining creativity with precision. Received strong mentorship and a recommendation letter recognizing my contributions and learning.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:pt-16">
          <div className="bg-surface-container-low p-8 rounded-xl ghost-border relative">
            <span className="material-symbols-outlined text-primary text-5xl mb-6">format_quote</span>
            <p className="text-2xl font-light italic leading-relaxed text-white mb-8">
              "Bridging intelligent systems with scalable architecture. I build full-stack and AI-powered solutions that transform data into real-world impact."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">BG</div>
              <div>
                <div className="font-bold">Bhautik Gondaliya</div>
                <div className="text-xs text-on-surface-variant uppercase tracking-widest">Full stack & AI/ML Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
