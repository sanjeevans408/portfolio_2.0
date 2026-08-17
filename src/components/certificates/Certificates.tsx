import { AnimatePresence, motion } from "framer-motion";
import { Award, Expand, ImageOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { certificates, type Certificate } from "../../data/certificates";

export default function Certificates() {
  const featuredCertificates = certificates.filter((certificate) => certificate.featured);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedCertificate(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const openCertificate = (certificate: Certificate) => {
    setImageFailed(false);
    setSelectedCertificate(certificate);
  };

  return <section id="certificates" className="relative py-20 px-6 md:px-12 bg-black border-b border-white/10">
    <div className="max-w-7xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-black mb-16 text-cyan-400">Certifications</motion.h2>
      <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}>
        {featuredCertificates.map((cert) => <motion.div key={cert.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition duration-300 -z-10" />
          <div className="relative bg-black border border-white/20 rounded-lg p-6 h-full flex flex-col justify-center"><Award className="w-10 h-10 text-cyan-400 mb-3" /><h3 className="text-lg font-bold text-cyan-400 mb-2">{cert.title}</h3><p className="text-sm text-zinc-400 mb-4">{cert.organization}</p><p className="text-xs text-zinc-500">{cert.date}</p>
            <button type="button" onClick={() => openCertificate(cert)} className="mt-5 inline-flex items-center gap-2 self-start text-sm text-cyan-400 hover:text-cyan-300 transition" aria-label={`View ${cert.title} certificate`}><Expand size={16} /> View certificate</button>
          </div>
        </motion.div>)}
      </motion.div>
    </div>
    <AnimatePresence>{selectedCertificate && <motion.div className="fixed inset-0 z-[100] p-4 md:p-10 bg-black/85 backdrop-blur-sm flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setSelectedCertificate(null)} role="dialog" aria-modal="true" aria-label={`${selectedCertificate.title} certificate preview`}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} onMouseDown={(event) => event.stopPropagation()} className="relative w-full max-w-4xl max-h-full overflow-auto rounded-xl bg-zinc-950 border border-white/15 shadow-2xl">
        <button type="button" onClick={() => setSelectedCertificate(null)} className="absolute top-4 right-4 z-10 rounded-full p-2 bg-black/70 text-white hover:text-cyan-400" aria-label="Close certificate preview"><X size={22} /></button>
        {selectedCertificate.image && !imageFailed && <img src={selectedCertificate.image} alt={`${selectedCertificate.title} certificate`} className="w-full max-h-[78vh] object-contain bg-white" onError={() => setImageFailed(true)} />}
        {(!selectedCertificate.image || imageFailed) && <div className="p-8 md:p-14 text-center border-8 border-cyan-400/20 min-h-[360px] flex flex-col items-center justify-center"><ImageOff className="w-10 h-10 text-cyan-400 mb-5" /><p className="font-mono text-cyan-400 text-sm tracking-widest uppercase">Certificate preview</p><h3 className="text-3xl md:text-5xl font-black mt-5">{selectedCertificate.title}</h3><p className="text-xl text-zinc-300 mt-4">{selectedCertificate.organization}</p><p className="text-zinc-500 mt-8">Issued {selectedCertificate.date}</p><p className="text-sm text-zinc-500 mt-6 max-w-md">Add the certificate photo at <code className="text-cyan-400">{selectedCertificate.image || "/images/certificates/your-file.jpg"}</code> to display it here.</p></div>}
      </motion.div>
    </motion.div>}</AnimatePresence>
  </section>;
}
