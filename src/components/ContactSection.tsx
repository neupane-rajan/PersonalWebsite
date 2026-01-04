import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Terminal,
  Cpu,
  Globe,
  Wifi
} from 'lucide-react';

export default function ContactSection() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/neupane-rajan', label: 'GitHub', color: 'hover:text-ctp-mauve' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rajan00', label: 'LinkedIn', color: 'hover:text-ctp-blue' },
    { icon: Twitter, href: 'https://x.com/neupanehere', label: 'Twitter', color: 'hover:text-ctp-sky' },
    { icon: Instagram, href: 'https://www.instagram.com/rajan0___0/', label: 'Instagram', color: 'hover:text-ctp-pink' },
  ];

  return (
    <section id="contact" className="w-full min-h-[60vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-ctp-base opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* Terminal Window */}
        <div className="bg-ctp-mantle border-2 border-ctp-surface0 rounded-lg overflow-hidden shadow-2xl relative group">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-lg border-2 border-ctp-mauve/50 animate-pulse" />
            <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(203,166,247,0.2)]" />
          </div>

          {/* Window Title Bar */}
          <div className="bg-ctp-crust px-4 py-2 flex items-center justify-between border-b border-ctp-surface0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-ctp-red hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-ctp-yellow hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-ctp-green hover:bg-green-400 transition-colors" />
            </div>
            <div className="text-ctp-subtext0 text-xs font-mono flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              ~/contact/neofetch.sh
            </div>
            <div className="w-16 text-right text-ctp-overlay0 text-[10px] font-mono">zsh</div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 md:p-10 font-mono text-sm md:text-base grid md:grid-cols-2 gap-8 items-center bg-ctp-base/50 backdrop-blur-sm">
             {/* Left Column: ASCII Art / Logo Area */}
             <div className="hidden md:flex flex-col items-center justify-center text-ctp-mauve select-none opacity-80">
                <pre className="text-[10px] leading-tight font-bold">
{`
      /\\
     /  \\
    /    \\
   /      \\
  /   /\\   \\
 /   /  \\   \\
/___/    \\___\\
`}
                </pre>
                <div className="mt-4 text-center">
                    <div className="text-xl font-bold tracking-widest text-ctp-lavender">ARCH</div>
                    <div className="text-xs text-ctp-overlay1">Rajan Edition</div>
                </div>
             </div>

             {/* Right Column: System Info Style Contact */}
             <div className="space-y-4">
                <div className="flex items-center gap-2 text-ctp-pink mb-4">
                    <span className="font-bold">rajan@portfolio</span>
                    <span className="text-ctp-text">:</span>
                    <span className="text-ctp-blue">~</span>
                </div>

                <div className="space-y-2 text-ctp-text">
                    <InfoRow label="OS" value="Arch Linux x86_64" icon={Cpu} color="text-ctp-teal" />
                    <InfoRow label="Host" value="Portfolio v2.0" icon={Globe} color="text-ctp-blue" />
                    <InfoRow label="Uptime" value="Forever" icon={Wifi} color="text-ctp-green" />
                    <div className="my-2 border-t border-ctp-surface0 w-full" />
                    
                    <div className="flex items-center gap-3 group/item">
                        <span className="text-ctp-mauve w-6"><MapPin className="w-4 h-4" /></span>
                        <span className="text-ctp-overlay2 font-bold min-w-[80px]">Location:</span>
                        <span className="text-ctp-text group-hover/item:text-ctp-mauve transition-colors">Kathmandu, Nepal</span>
                    </div>

                    <div className="flex items-center gap-3 group/item">
                        <span className="text-ctp-mauve w-6"><Mail className="w-4 h-4" /></span>
                        <span className="text-ctp-overlay2 font-bold min-w-[80px]">Email:</span>
                        <a href="mailto:rajanneupane202@gmail.com" className="text-ctp-text hover:text-ctp-mauve transition-colors hover:underline decoration-ctp-mauve/30 underline-offset-4">
                            rajanneupane202@gmail.com
                        </a>
                    </div>
                </div>

                {/* Color Palette Strip */}
                <div className="flex gap-2 mt-6 mb-6">
                    <div className="w-8 h-3 bg-ctp-red rounded-sm" />
                    <div className="w-8 h-3 bg-ctp-green rounded-sm" />
                    <div className="w-8 h-3 bg-ctp-yellow rounded-sm" />
                    <div className="w-8 h-3 bg-ctp-blue rounded-sm" />
                    <div className="w-8 h-3 bg-ctp-mauve rounded-sm" />
                </div>

                {/* Social Links Command Prompt */}
                <div className="mt-4 pt-4 border-t border-ctp-surface0">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-ctp-green">❯</span>
                        <span className="text-ctp-text typing-effect">ls ./socials/</span>
                    </div>
                    <div className="flex gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`transform hover:scale-110 transition-all duration-200 text-ctp-overlay1 ${link.color}`}
                                title={link.label}
                            >
                                <link.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* Footer Credit - Simple and Integrated */}
     
      </motion.div>
    </section>
  );
}

function InfoRow({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; color: string }) {
    return (
        <div className="flex items-center gap-3 border-b border-ctp-surface0/50 pb-1 last:border-0 hover:bg-ctp-surface0/30 transition-colors rounded px-2 -mx-2">
            <span className={`${color} w-6`}><Icon className="w-4 h-4" /></span>
            <span className="text-ctp-overlay2 font-bold min-w-[80px]">{label}:</span>
            <span className="text-ctp-text truncate">{value}</span>
        </div>
    );
}
