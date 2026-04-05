import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-[#262626]/20 bg-[#0e0e0e]">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-4">
        <div className="font-['Space_Grotesk'] font-bold text-[#2DD4BF] text-xl">Bhautik</div>
        <p className="font-['Inter'] text-sm text-[#adaaaa] text-center">© 2026  Bhautik Gondaliya. Built for precision.</p>
        <div className="flex gap-8">
          <a className="text-[#adaaaa] hover:text-white transition-colors font-['Inter'] text-sm" href="https://github.com/bhautik2005">GitHub</a>
          <a className="text-[#adaaaa] hover:text-white transition-colors font-['Inter'] text-sm" href="https://www.linkedin.com/in/bhautik2005/">LinkedIn</a>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
