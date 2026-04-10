import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ handle change (already correct, just used properly now)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // 🚫 prevent multiple clicks

  setLoading(true);

    try {
      const res = await fetch(
        'https://portfolio-vbkz.onrender.com/api/messages',
        // 'http://localhost:5000/api/messages',
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) // ✅ FIXED (was 'form')
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");

        // ✅ clear form after success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus("error");
      }

    } catch (err) {
      console.error("❌ Frontend Error:", err);
      setStatus("error");
    }
    setLoading(false); // ✅ re-enable button
  };

  return (
    <>
      {/* Contact Form Section */}
      <section className="py-24 px-8 bg-surface-container-low border-t border-outline-variant/10" id="contact-form">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-4 text-white">Get in Touch</h2>
            <p className="text-on-surface-variant font-body max-w-lg mx-auto">Have a specific inquiry or looking to collaborate on a high-performance system? Fill out the form below and I'll get back to you shortly.</p>
            <div className="h-1 w-24 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="bg-surface-container-high p-8 md:p-12 rounded-xl ghost-border leading-loose relative">
            {status === 'success' && <div className="mb-4 text-primary bg-primary/10 p-4 rounded text-center font-bold">Message sent successfully!</div>}
            {status === 'error' && <div className="mb-4 text-error bg-error/10 p-4 rounded text-center font-bold">Failed to send message. Please try again.</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="name">Name</label>
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-md py-3 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleChange} // ✅ FIXED
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="email">Email</label>
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-md py-3 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange} // ✅ FIXED
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="subject">Subject</label>
                <input
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-md py-3 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                  type="text"
                  value={formData.subject}
                  onChange={handleChange} // ✅ FIXED
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="message">Message</label>
                <textarea
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-md py-3 px-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[150px]"
                  id="message"
                  name="message"
                  placeholder="How can I help you?"
                  required
                  value={formData.message}
                  onChange={handleChange} // ✅ FIXED
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  className="w-full bg-[#2DD4BF] text-on-secondary px-8 py-4 rounded-md font-bold text-lg hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
                  type="submit"
                  disabled={loading}
                >
                  
                  <span className="material-symbols-outlined">send</span>
                   {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8">Ready to Build <br /><span className="text-primary">Something Great?</span></h2>
          <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Whether it's a high-performance web platform or Focused on building scalable backend systems and AI-driven products that solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a className="bg-primary text-on-primary px-10 py-5 rounded-md font-bold text-lg hover:shadow-[0_0_30px_rgba(91,244,222,0.3)] transition-all flex items-center justify-center gap-3" href="mailto:bhautik613@gmail.com">
              <span className="material-symbols-outlined">mail</span>
              bhautik613@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;