import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("contact");

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(45,212,191,0.05)]">
      <nav className="flex flex-wrap justify-between items-center px-8 py-4 max-w-7xl mx-auto font-['Space_Grotesk'] tracking-tight">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">Bhautik</a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Desktop / Mobile Menu Items */}
        <div className={`${isOpen ? 'flex' : 'hidden'} w-full md:w-auto md:flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-4 md:mt-0`}>
          <a
            onClick={() => {
              setIsOpen(false);
              setActive("projects");
            }}
            className={`${active === "projects"
              ? "text-[#2DD4BF] border-b-2 border-[#2DD4BF] pb-1"
              : "text-[#adaaaa] hover:text-white"
              } transition-colors`}
            href="#projects"
          >
            Projects
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              setActive("experience");
            }}
            className={`${active === "experience"
              ? "text-[#2DD4BF] border-b-2 border-[#2DD4BF] pb-1"
              : "text-[#adaaaa] hover:text-white"
              } transition-colors`}
            href="#experience"
          >
            Experience
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              setActive("education");
            }}
            className={`${active === "education"
              ? "text-[#2DD4BF] border-b-2 border-[#2DD4BF] pb-1"
              : "text-[#adaaaa] hover:text-white"
              } transition-colors`}
            href="#education"
          >
            Education
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              setActive("skills");
            }}
            className={`${active === "skills"
              ? "text-[#2DD4BF] border-b-2 border-[#2DD4BF] pb-1"
              : "text-[#adaaaa] hover:text-white"
              } transition-colors`}
            href="#skills"
          >
            Skills
          </a>
          <a
            onClick={() => {
              setIsOpen(false);
              setActive("contact");
            }}
            className={`${active === "contact"
              ? "text-[#2DD4BF] border-b-2 border-[#2DD4BF] pb-1"
              : "text-[#adaaaa] hover:text-white"
              } transition-colors`}
            href="#contact"
          >
            Contact
          </a>

          <div className="md:ml-4 flex items-center gap-4">
            <a onClick={() => setIsOpen(false)} href="https://github.com/bhautik2005" target="_blank" rel="noreferrer" className="text-[#adaaaa] hover:text-[#5bf4de] transition-colors" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a onClick={() => setIsOpen(false)} href="https://www.linkedin.com/in/bhautik2005/" target="_blank" rel="noreferrer" className="text-[#adaaaa] hover:text-[#5bf4de] transition-colors" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
