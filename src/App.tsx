import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Flame, Sparkles, Zap, ShieldCheck, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// --- High-Visibility Fire Animation Component ---
interface FireConfig {
  intensity?: number;  // 1-20
  speed?: number;      // 0.5-5
  className?: string;
}

const FireCanvas = ({ intensity = 12, speed = 2, className = "" }: FireConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || window.innerWidth;
        canvas.height = parent.clientHeight || 200;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = h + 10;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -(Math.random() * 5 + 3) * speed;
        this.maxLife = Math.random() * 30 + 20;
        this.life = this.maxLife;
        this.size = Math.random() * 30 + 15;
        
        // Brighter, more solid colors
        const rand = Math.random();
        if (rand > 0.7) this.color = "255, 200, 50"; // Yellow
        else if (rand > 0.3) this.color = "255, 100, 0"; // Orange
        else this.color = "255, 50, 0"; // Red
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.size *= 0.94;
      }

      draw() {
        if (!ctx) return;
        const alpha = (this.life / this.maxLife);
        ctx.beginPath();
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `rgba(${this.color}, ${alpha})`);
        grad.addColorStop(0.6, `rgba(${this.color}, ${alpha * 0.4})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      if (particles.length < intensity * 15) {
        for (let i = 0; i < 2; i++) {
          particles.push(new Particle(canvas.width, canvas.height));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0 || particles[i].size < 1) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, speed]);

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />;
};

const GlowText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.span
    className={`relative inline-block ${className}`}
    animate={{ 
      textShadow: [
        "0 0 15px #ff4d00",
        "0 0 35px #ff8800",
        "0 0 15px #ff4d00"
      ],
      color: ["#fff", "#ffcc00", "#fff"]
    }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    {children}
  </motion.span>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { icon: <Flame className="w-10 h-10 text-orange-500" />, title: "Традиційний вогняний масаж", desc: "Унікальна техніка глибокого прогрівання тіла вогнем для повного оздоровлення." },
    { icon: <Zap className="w-10 h-10 text-yellow-500" />, title: "Глибоке точкове прогрівання", desc: "Локальна дія на проблемні зони для швидкого зняття гострого болю." },
    { icon: <Sparkles className="w-10 h-10 text-orange-400" />, title: "Відновлення енергії", desc: "Активація життєвих сил та гармонізація вашого внутрішнього стану." },
    { icon: <ShieldCheck className="w-10 h-10 text-red-500" />, title: "Зняття напруги", desc: "Повне розслаблення м'язів та нервової системи після важкого дня." },
  ];

  return (
    <div className="min-h-screen bg-[#050201] text-white font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      {/* Global Background Fire */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 blur-3xl">
        <FireCanvas intensity={5} speed={0.5} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/95 border-b border-orange-900/30 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative">
              <img src="input_file_2.png" alt="TAIFIRE Logo" className="h-16 w-auto relative z-10" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-6 left-0 w-full h-16">
                <FireCanvas intensity={8} speed={3} />
              </div>
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase italic">
              TAI<span className="text-orange-600">FIRE</span>
            </span>
          </motion.div>
          
          <div className="hidden md:flex gap-12 text-sm font-black uppercase tracking-[0.25em] text-white/80">
            <a href="#services" className="hover:text-orange-500 transition-colors">Послуги</a>
            <a href="#gallery" className="hover:text-orange-500 transition-colors">Галерея</a>
            <a href="#contacts" className="hover:text-orange-500 transition-colors">Контакти</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,77,0,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,77,0,0.4)]"
          >
            Записатись
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="input_file_0.png" 
            alt="Fire Massage Background" 
            className="w-full h-full object-cover opacity-100 scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050201]" />
          {/* Intense fire at the bottom of hero */}
          <div className="absolute bottom-0 left-0 w-full h-1/2">
            <FireCanvas intensity={20} speed={1.5} />
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-orange-500 font-black tracking-[0.6em] uppercase mb-8 text-lg md:text-2xl drop-shadow-[0_0_10px_rgba(255,77,0,0.8)]">
              Thai Fire Massage Salon
            </h2>
            <h1 className="text-7xl md:text-[12rem] font-black uppercase italic leading-[0.8] mb-10 tracking-tighter">
              BURN YOUR <br />
              <GlowText className="text-orange-600">PROBLEMS</GlowText>
            </h1>
            <p className="text-2xl md:text-4xl text-white max-w-4xl mx-auto mb-16 font-bold leading-tight drop-shadow-lg">
              Відчуйте силу справжнього вогню, що спалює втому та біль. <br />
              Стародавня тайська методика тепер у Львові.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.a
                href="#contacts"
                whileHover={{ scale: 1.1, backgroundColor: "#ff4d00", color: "#fff" }}
                className="bg-white text-black px-16 py-6 rounded-full font-black uppercase tracking-widest text-lg transition-all shadow-2xl"
              >
                Записатись зараз
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                className="border-4 border-white/50 backdrop-blur-xl px-16 py-6 rounded-full font-black uppercase tracking-widest text-lg transition-all"
              >
                Наші послуги
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 relative z-10 bg-[#050201]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-orange-500 font-black tracking-[0.4em] uppercase mb-6 text-xl">Наші Послуги</h3>
            <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter">
              Мистецтво <span className="text-orange-600 drop-shadow-[0_0_20px_rgba(255,77,0,0.5)]">Вогню</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-12 rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent border-2 border-white/10 hover:border-orange-500 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                  <FireCanvas intensity={15} speed={2.5} />
                </div>
                <div className="relative z-10">
                  <div className="mb-10 p-8 bg-black/80 rounded-[2.5rem] w-fit group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(255,77,0,0.2)]">
                    {service.icon}
                  </div>
                  <h4 className="text-4xl font-black mb-6 group-hover:text-orange-500 transition-colors uppercase italic tracking-tight">{service.title}</h4>
                  <p className="text-white/80 text-xl leading-relaxed font-medium">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-orange-500 font-black tracking-[0.4em] uppercase mb-6 text-xl">Галерея</h3>
              <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-12 leading-none">
                Глибоке <br /> <span className="text-orange-600">Прогрівання</span>
              </h2>
              <div className="space-y-10 text-white text-2xl leading-relaxed font-medium">
                <p>
                  Вогняний масаж — це унікальна стародавня техніка, що поєднує класичний масаж та інтенсивний термічний вплив. Це абсолютно безпечно, неймовірно приємно та максимально ефективно.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                  {["Біль у спині", "М'язова напруга", "Хронічна перевтома", "Поганий кровообіг"].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 text-white font-black uppercase text-lg italic">
                      <div className="w-5 h-5 rounded-full bg-orange-600 shadow-[0_0_20px_#ff4d00]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { src: "input_file_3.png", delay: 0 },
                { src: "input_file_4.png", delay: 0.1 },
                { src: "input_file_1.png", delay: 0.2 },
                { src: "input_file_5.png", delay: 0.3 }
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: img.delay }}
                  viewport={{ once: true }}
                  className="rounded-[3rem] overflow-hidden aspect-square relative group border-4 border-white/10 shadow-2xl"
                >
                  <img src={img.src} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-100" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-orange-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-orange-600 to-red-950 rounded-[5rem] p-16 md:p-32 relative overflow-hidden shadow-[0_0_150px_rgba(255,77,0,0.5)] border-4 border-white/10">
            <div className="absolute inset-0 opacity-50">
              <FireCanvas intensity={20} speed={2} />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-16 leading-none">
                  ГОТОВІ <br /> СПАЛИТИ <br /> <span className="text-black/50">ПРОБЛЕМИ?</span>
                </h2>
                
                <div className="space-y-12">
                  <a href="tel:0985002361" className="flex items-center gap-10 group">
                    <div className="w-24 h-24 rounded-[2rem] bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 shadow-xl">
                      <Phone className="w-12 h-12" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm uppercase tracking-[0.4em] font-black mb-2">Телефон</p>
                      <p className="text-4xl md:text-5xl font-black">098 500 23 61</p>
                    </div>
                  </a>
                  <a href="mailto:ekateryna.oliinyk@gmail.com" className="flex items-center gap-10 group">
                    <div className="w-24 h-24 rounded-[2rem] bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 shadow-xl">
                      <Mail className="w-12 h-12" />
                    </div>
                    <div>
                      <p className="text-white/70 text-sm uppercase tracking-[0.4em] font-black mb-2">Email</p>
                      <p className="text-3xl md:text-4xl font-black break-all">ekateryna.oliinyk@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-3xl p-12 md:p-20 rounded-[4rem] border-2 border-white/20 shadow-2xl">
                <h3 className="text-4xl font-black mb-12 uppercase italic">Швидкий запис</h3>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-white/50 ml-6">Ваше ім'я</label>
                    <input type="text" className="w-full bg-white/10 border-2 border-white/10 rounded-3xl px-10 py-6 focus:outline-none focus:border-orange-500 transition-all text-xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase tracking-widest text-white/50 ml-6">Ваш телефон</label>
                    <input type="tel" className="w-full bg-white/10 border-2 border-white/10 rounded-3xl px-10 py-6 focus:outline-none focus:border-orange-500 transition-all text-xl font-bold" />
                  </div>
                  <button className="w-full bg-white text-orange-600 font-black uppercase tracking-widest py-8 rounded-3xl hover:bg-orange-50 transition-all text-2xl mt-6 shadow-2xl">
                    Відправити запит
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/10 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-6">
            <img src="input_file_2.png" alt="TAIFIRE Logo" className="h-14 w-auto grayscale opacity-40" referrerPolicy="no-referrer" />
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white/30">
              TAI<span className="text-orange-900/50">FIRE</span>
            </span>
          </div>
          
          <p className="text-white/30 text-lg font-black uppercase tracking-[0.2em] text-center">
            © 2026 TAIFIRE Thai Massage Salon. Львів, Україна.
          </p>
          
          <div className="flex gap-12 text-white/40 font-black uppercase text-sm tracking-widest">
            <a href="#" className="hover:text-orange-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
