import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { profile } from "../../data/profile";
import { apiUrl } from "../../lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "fallback">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fallbackEmailHref, setFallbackEmailHref] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("");
    setFallbackEmailHref("");

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const body = await response.text();
      const data = body ? JSON.parse(body) : null;

      if (response.status === 503 && data?.fallback === "email") {
        const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
        const message = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );
        setStatus("fallback");
        setStatusMessage("The contact service is temporarily offline. Send your prepared message by email instead.");
        setFallbackEmailHref(`mailto:${profile.email}?subject=${subject}&body=${message}`);
        return;
      }

      if (!response.ok) {
        const errorData = data;
        throw new Error(errorData?.error || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage("Message sent successfully. I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setStatusMessage((error as Error).message || "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-6 md:px-12 bg-black border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black mb-16 text-cyan-400"
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-zinc-400 hover:text-cyan-400 transition"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-zinc-400 hover:text-cyan-400 transition"
                >
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Location</h3>
                <p className="text-zinc-400">{profile.location}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-zinc-400 mb-4">
                I'm available for freelance projects and full-time opportunities.
              </p>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:scale-105 transition duration-300"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg blur-lg opacity-50" />
            <form
              onSubmit={handleSubmit}
              className="relative bg-black border border-white/20 rounded-lg p-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none transition resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-black font-bold hover:scale-105 transition duration-300"
              >
                <Send size={18} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {statusMessage && (
                <p
                  className={`text-sm ${
                    status === "error" ? "text-red-400" : status === "fallback" ? "text-amber-300" : "text-emerald-400"
                  }`}
                  role="status"
                >
                  {statusMessage}
                </p>
              )}
              {fallbackEmailHref && (
                <a
                  href={fallbackEmailHref}
                  className="block w-full rounded-lg border border-amber-300/60 px-6 py-3 text-center text-sm font-semibold text-amber-200 transition hover:bg-amber-300 hover:text-black"
                >
                  Send by email
                </a>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
