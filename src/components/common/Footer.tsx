import { socials } from "../../data/socials";
import { Github, Linkedin, ExternalLink, Twitter, Instagram } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  Github: <Github size={20} />,
  Linkedin: <Linkedin size={20} />,
  ExternalLink: <ExternalLink size={20} />,
  Twitter: <Twitter size={20} />,
  Instagram: <Instagram size={20} />,
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Sanjeevan M</h3>
            <p className="text-zinc-400">
              Full Stack Developer • AI Developer • Python Developer
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition">Projects</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition">Skills</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-cyan-400 transition"
                  title={social.name}
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-zinc-500">
          <p>© 2026 Sanjeevan M. Built with React • TypeScript • Three.js</p>
        </div>
      </div>
    </footer>
  );
}
