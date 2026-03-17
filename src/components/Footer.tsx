import React, { useRef } from "react";
import { Youtube, Instagram } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isMinimalFooter = location.pathname === '/handstands' || location.pathname === '/services';
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Construct the mailto link
    const mailtoLink = `mailto:schtefel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Open the user's email client
    window.location.href = mailtoLink;
  };

  return (
    <footer id="about" className={`bg-gallery-white border-t-2 border-black px-6 ${isMinimalFooter ? 'py-8' : 'py-24'}`}>
      {!isMinimalFooter && (
        <div className="container mx-auto space-y-40">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-80 shrink-0 border-2 border-black brutal-shadow overflow-hidden aspect-square">
              <img src="/about/about.jpg" alt="About rubioinsideout" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-6xl uppercase tracking-tighter mb-8">About rubioinsideout</h2>
              <div className="space-y-6 text-base font-medium leading-snug">
                <p>
                  I'm a multi-sport athlete and content creator dedicated to capturing the raw energy of action sports.
                  Whether it's the precision of a kickflip, the flow of a powder turn, or the focus of a highline,
                  I believe in pushing boundaries and sharing the experience.
                </p>
                <p>
                  My YouTube channel is where I document these adventures, sharing tutorials, highlights, and the
                  behind-the-scenes reality of mastering these disciplines.
                </p>
              </div>

            </div>
          </div>

          <div className="bg-black text-white p-12 border-2 border-black brutal-shadow">
            <h3 className="font-display text-4xl uppercase tracking-tighter mb-6">Get in Touch</h3>


            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  className="w-full bg-transparent border-b-2 border-white/20 py-2 focus:border-white outline-none transition-colors placeholder:opacity-20"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Type your message here..."
                  className="w-full bg-transparent border-b-2 border-white/20 py-2 focus:border-white outline-none transition-colors resize-none placeholder:opacity-20"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-display text-xl uppercase py-4 tracking-widest hover:bg-zinc-200 transition-colors"
              >
                Open Email Client
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`container mx-auto flex justify-center items-center ${isMinimalFooter ? '' : 'mt-12 pt-6 border-t border-black/5'}`}>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-30">
          © Stefan Carlen. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
