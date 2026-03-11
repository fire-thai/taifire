import { motion } from "motion/react";
import { Flame, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const galleryImages = [
  assetPath("images/massage-process-1.svg"),
  assetPath("images/massage-process-2.svg"),
  assetPath("images/massage-process-3.svg"),
  assetPath("images/certificate.svg"),
];

const benefits = [
  "Зняття напруги в спині та шиї",
  "Глибоке прогрівання мʼязів",
  "Покращення кровообігу",
  "Відновлення після перевтоми",
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0b08] text-zinc-100">
      <div className="fire-bg" aria-hidden="true" />

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#120d0a]/70 border-b border-amber-700/20">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-3">
            <img src={assetPath("images/logo-taifire.svg")} alt="TAIFIRE Logo" className="h-12 w-12 rounded-full object-cover border border-amber-500/40" />
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80">Thai Fire Massage</p>
              <p className="text-xl font-semibold tracking-wide">TAIFIRE</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-200/90">
            <a href="#services" className="hover:text-amber-300">Послуги</a>
            <a href="#gallery" className="hover:text-amber-300">Галерея</a>
            <a href="#contacts" className="hover:text-amber-300">Контакти</a>
          </nav>

          <a href="#contacts" className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-amber-400 transition-colors">
            Записатись
          </a>
        </div>
      </header>

      <main>
        <section id="hero" className="relative">
          <div className="absolute inset-0">
            <img src={assetPath("images/hero-bg.svg")} alt="Вогняний масаж" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/60 to-[#0f0b08]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-semibold leading-tight max-w-4xl"
            >
              Вогняний масаж, який
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-500"> лікує напругу</span>
              , а не перевантажує дизайн.
            </motion.h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-zinc-200/90">
              Традиційна техніка прогрівання з сучасним підходом до безпеки, комфорту та відновлення.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contacts" className="rounded-full bg-amber-500 px-7 py-3 text-black font-semibold hover:bg-amber-400">Записатися зараз</a>
              <a href="#gallery" className="rounded-full border border-zinc-300/40 px-7 py-3 hover:bg-zinc-100/10">Переглянути фото</a>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-amber-300 uppercase tracking-[0.25em] text-xs">Наш підхід</p>
          <h2 className="text-3xl md:text-5xl font-semibold mt-3">Спокійний, глибокий і контрольований вогонь</h2>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {benefits.map((item) => (
              <article key={item} className="rounded-2xl border border-amber-600/20 bg-zinc-950/60 p-6 flex items-start gap-4">
                <div className="rounded-xl p-2 bg-amber-500/20 text-amber-300">
                  <Flame className="w-5 h-5" />
                </div>
                <p className="text-lg">{item}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-600/20 bg-zinc-950/60 p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-300 mt-0.5" />
            <p className="text-zinc-200/90">Процедура проводиться сертифікованим майстром з дотриманням правил безпеки.</p>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-6xl px-6 pb-20">
          <p className="text-amber-300 uppercase tracking-[0.25em] text-xs">Галерея</p>
          <h2 className="text-3xl md:text-5xl font-semibold mt-3">Реальні фото процедури</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {galleryImages.map((src, i) => (
              <figure key={src} className="rounded-2xl overflow-hidden border border-amber-600/20 bg-zinc-900/60 aspect-square">
                <img
                  src={src}
                  alt={`Фото вогняного масажу ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>

        <section id="contacts" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1d120c] to-[#120d0a] p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold">Контакти та запис</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              <a href="tel:0985002361" className="contact-card"><Phone className="w-5 h-5" /> 098 500 23 61</a>
              <a href="mailto:ekateryna.oliinyk@gmail.com" className="contact-card"><Mail className="w-5 h-5" /> ekateryna.oliinyk@gmail.com</a>
              <p className="contact-card"><MapPin className="w-5 h-5" /> Львів, Україна</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
