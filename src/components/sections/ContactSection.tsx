/**
 * Contact section — Netlify-powered contact form with honeypot spam protection.
 *
 * Rendered on the Home page below the Timeline. Posts to Netlify's
 * form handling endpoint at "/". A hidden `bot-field` input acts as a
 * honeypot — bots that fill it are silently rejected, avoiding CAPTCHAs.
 */
import React, { useRef, useState } from "react";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(formRef.current) as unknown as Record<string, string>).toString(),
      });
      if (response.ok) {
        setStatus("success");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-gallery-white px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black text-white p-12 border-2 border-black brutal-shadow">
          <h3 className="font-display text-4xl uppercase tracking-tighter mb-6">Get in Touch</h3>

          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2">Name</label>
                <input
                  name="from_name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-transparent border-b-2 border-white/20 py-2 focus:border-white outline-none transition-colors placeholder:opacity-20"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest mb-2">Email</label>
                <input
                  name="from_email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b-2 border-white/20 py-2 focus:border-white outline-none transition-colors placeholder:opacity-20"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest mb-2">Subject</label>
              <input
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                className="w-full bg-transparent border-b-2 border-white/20 py-2 focus:border-white outline-none transition-colors placeholder:opacity-20"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Type your message here..."
                className="w-full bg-transparent border-b-2 border-white/20 py-2 focus:border-white outline-none transition-colors resize-none placeholder:opacity-20"
              />
            </div>

            {status === "success" && (
              <p className="font-mono text-xs uppercase tracking-widest text-green-400">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="font-mono text-xs uppercase tracking-widest text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-white text-black font-display text-xl uppercase py-4 tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
