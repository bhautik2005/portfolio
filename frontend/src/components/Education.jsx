import React from 'react';

const Education = () => {
  return (
    <section className="py-24 px-8 bg-surface-container-low" id="education">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter mb-8">Academic Foundation</h2>
            <div className="space-y-12">
              {/* Timeline Item */}
              <div className="relative pl-8 border-l-2 border-surface-variant">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary active-dot"></div>
                <div className="mb-2">
                  <span className="text-primary font-headline font-bold text-lg">2024 — 2027</span>
                  <h3 className="text-2xl font-bold text-white">Bachelor of Engineering</h3>
                  <p className="text-on-surface-variant font-medium">Gujarat Technological University (GTU)</p>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                   
                </p>
              </div>
              <div className="relative pl-8 border-l-2 border-surface-variant">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-variant"></div>
                <div className="mb-2">
                  <span className="text-on-surface-variant font-headline font-bold text-lg">2022 — 20123</span>
                  <h3 className="text-2xl font-bold text-white">12th Grade (HSC)</h3>
                  <p className="text-on-surface-variant font-medium">Science &amp; Mathematics Stream</p>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Intensive focus on physics, advanced mathematics, and analytical foundations that now underpin my data science and algorithmic workflows.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm aspect-square border border-outline-variant/20 rounded-2xl flex flex-col items-center justify-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
              <span className="material-symbols-outlined text-primary text-7xl mb-6 relative">school</span>
              <h4 className="text-2xl font-bold text-center relative">Engineered for Excellence</h4>
              <p className="text-on-surface-variant text-center mt-4 relative">Applying structural integrity to every line of code.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
