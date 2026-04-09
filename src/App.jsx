import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaHeart, FaStar, FaFeather, FaRibbon, FaGift, FaBook } from "react-icons/fa";
import { GiFlowerPot, GiButterfly, GiLotus, GiSunflower } from "react-icons/gi";
import { IoClose, IoPlayCircle } from "react-icons/io5";
import { PiHandsPrayingBold } from "react-icons/pi";
import confetti from "canvas-confetti";

// ─── Paleta & Tokens ────────────────────────────────────────────────────────
// Rose Gold  : #C9956C → #E8C4A0
// Off-white  : #FAF7F4
// Grafite    : #2D2A27
// Pastel warm: #F4E4DC, #EED5C8, #D9B8A7

// ─── Helpers ────────────────────────────────────────────────────────────────
function useScrollInView(threshold = 0.18) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, delay: i * 0.12 },
  }),
};

// ─── Confetti burst ──────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ["#C9956C", "#E8C4A0", "#D9B8A7", "#FAF7F4", "#e8a598", "#f4cfc4"];
  const burst = (origin) =>
    confetti({
      particleCount: 120,
      spread: 80,
      origin,
      colors,
      shapes: ["circle", "square"],
      scalar: 1.1,
    });
  burst({ x: 0.3, y: 0.55 });
  setTimeout(() => burst({ x: 0.7, y: 0.5 }), 220);
  setTimeout(() => burst({ x: 0.5, y: 0.45 }), 420);
}

// ─── Data ───────────────────────────────────────────────────────────────────
const photos = [
  {
    url: "./IMG-20260325-WA0016.jpg",
    caption: "A família aumentou",
    CaptionIcon: FaStar,
    aspectRatio: "16/10",
    rotate: "-2deg",
  },
  {
    url: "./IMG-20260325-WA0021.jpg",
    caption: "Momento família",
    CaptionIcon: GiLotus,
    rotate: "1.5deg",
  },
  {
    url: "./IMG-20260325-WA0022.jpg",
    caption: "Vamos de ti bum?",
    CaptionIcon: FaHeart,
    rotate: "-1deg",
  },
  {
    url: "./IMG-20260325-WA0023.jpg",
    caption: "Momentos que passam e ficam",
    CaptionIcon: GiFlowerPot,
    rotate: "2deg",
  },
  {
    url: "./IMG-20260325-WA0024.jpg",
    caption: "Abaca-xiiiiiixxx",
    CaptionIcon: FaRibbon,
    rotate: "-1.5deg",
  },
  {
    url: "./IMG-20260325-WA0026.jpg",
    caption: "Feliz Aniversário",
    CaptionIcon: GiSunflower,
    rotate: "1deg",
  },
];

const giftPhotos = [
  {
    url: "./IMG-20260325-WA0005.jpg",
    caption: "Em uma Galáxia muito distante",
  },
  {
    url: "./IMG-20260325-WA0007.jpg",
    caption: "Ooo Saudade",
  },
  {
    url: "./IMG-20260325-WA0009.jpg",
    caption: "Pizzada em Porto",
  },
  {
    url: "./IMG-20260325-WA0014.jpg",
    caption: "Barrigão do Papai Pig",
  },
  {
    url: "./IMG-20260325-WA0017.jpg",
    caption: "No interiorrrrrr",
  },
];

const messages = [
  {
    icon: <FaHeart />,
    title: "Meu Porto Seguro",
    text: "Em todo tempestade e em toda calmaria, você sempre foi o meu lar. Obrigado por nunca soltar a minha mão.",
    bg: "#F9EDE7",
    accent: "#C9956C",
  },
  {
    icon: <GiButterfly />,
    title: "Força que Inspira",
    text: "Você enfrenta cada desafio com uma graça que me ensina a ser uma pessoa melhor todos os dias.",
    bg: "#F4E4DC",
    accent: "#B87A5A",
  },
  {
    icon: <FaStar />,
    title: "Minha Estrela Guia",
    text: "Quando me perco, lembro do seu sorriso e encontro o caminho de volta. Você é minha bússola.",
    bg: "#EED5C8",
    accent: "#A8684A",
  },
  {
    icon: <GiFlowerPot />,
    title: "Amor que Floresce",
    text: "Como um jardim bem cuidado, seu amor nunca para de crescer e encher de cores a nossa vida.",
    bg: "#F9EDE7",
    accent: "#C9956C",
  },
  {
    icon: <PiHandsPrayingBold />,
    title: "Sonhadora e Grata!",
    text: "Você sonha com os olhos abertos e agradece com o coração cheio. Cada conquista é celebrada, cada desafio enfrentado com fé. Sua gratidão transforma dias comuns em bênçãos extraordinárias.",
    bg: "#F9EDE7",
    accent: "#C9956C",
  },
  {
    icon: <FaBook />,
    title: "Educadora de Coração",
    text: "Mais do que ensinar, você transforma vidas. Cada aluno que passa por você leva um pedacinho do seu amor e dedicação. Você não só educa mentes, você forma pessoas.",
    bg: "#F4E4DC",
    accent: "#B87A5A",
  },
];

const timeline = [
  { year: "1979", label: "Nascimento", desc: "O mundo ganhou sua luz mais brilhante." },
  { year: "1984", label: "Casa no Sula", desc: "Lembranças de brinquedos, colo do pai e o quintal com o tio." },
  { year: "1986", label: "Mudança e Perda", desc: "Nova casa (Ariston) e a difícil despedida do Tio Gil." },
  { year: "1988", label: "9 Anos de Alegria", desc: "Jogo de roleta de aniversário, bebezão no natal e vó costurando." },
  { year: "1990", label: "Nova Casa", desc: "Construção da nova casa e brincadeiras na rua." },
  { year: "1994", label: "15 Anos Especial", desc: "Valsa com o vô e corrente de ouro do padrinho." },
  { year: "1995", label: "Novos Caminhos", desc: "Ensino médio, novas amizades, primeira turma como professora e a madrinha." },
  { year: "1996", label: "Amor Chegou", desc: "Conheceu o pai na Sabesp, outros loucos, e começou a namorar." },
  { year: "1997", label: "Formatura", desc: "Concluiu o Ensino Médio com sucesso." },
  { year: "1998", label: "Noivado", desc: "Ficou noiva, entrou na Danone e conheceu novas amizades." },
  { year: "1999", label: "Preparativos", desc: "Planejaram cada detalhe do casamento." },
  { year: "2000", label: "Casamento", desc: "O grande dia! Avó Dirce operou de câncer e descobriu a endometriose." },
  { year: "2001", label: "Independência", desc: "Tirou a CNH e comprou o KA." },
  { year: "2002", label: "Tratamento e Estudos", desc: "Começou o tratamento e iniciou a faculdade." },
  { year: "2004", label: "Despedida", desc: "Partida da querida avó Dirce." },
  { year: "2005", label: "Surpresa Abençoada", desc: "Perda do seu Clomir e a descoberta da gravidez." },
  { year: "2006", label: "Mãe pela 1ª Vez", desc: "Nascimento do Tiago, o primeiro filho." },
  { year: "2007", label: "Mudanças", desc: "1 ano do Tiago e demissão da Danone." },
  { year: "2008", label: "Volta às Raízes", desc: "Retornou para a educação." },
  { year: "2010", label: "Força e Superação", desc: "Enfrentou a depressão e venceu." },
  { year: "2011", label: "Nova Bênção", desc: "Descobriu a segunda gravidez e iniciou na Vila Alpha." },
  { year: "2012", label: "Filipe Chegou", desc: "Nascimento do segundo filho e conheceu a Ana Cláudia." },
  { year: "2013", label: "Celebração", desc: "Festa de 1 ano do Filipe." },
  { year: "2014", label: "Recomeços", desc: "Mudança de casa, emprego novo e a Nina entrou na família." },
  { year: "2018", label: "EGV", desc: "Novo desafio profissional na EGV." },
  { year: "2020", label: "Pandemia", desc: "O mundo mudou, mas a família permaneceu unida." },
  { year: "2021", label: "Nova Casa e Jully", desc: "Mudança de casa e chegada da Jully na família." },
  { year: "2022", label: "Ano Difícil", desc: "Perda dos pais, mas seguiu em frente com coragem." },
  { year: "2023", label: "Conquistas", desc: "Formatura do Tiago, pós em psicopedagogia e o Max chegou." },
  { year: "2024", label: "Desafios", desc: "Lesão no pé e primeiro emprego do Tiago." },
  { year: "2025", label: "Transformações", desc: "Cirurgia, descobriu que seria avó e celebrou 25 anos de casada." },
  { year: "2026", label: "Matteo e o Futuro", desc: "A chegada do netinho e tudo o que ainda está por vir!" },
];

// ─── Floating Hearts BG ─────────────────────────────────────────────────────
function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {petals.map((i) => (
        <motion.div
          key={i}
          className="absolute text-rose-200 opacity-30"
          style={{
            left: `${8 + (i * 7.5) % 90}%`,
            top: `${(i * 13) % 100}%`,
            fontSize: `${10 + (i % 4) * 6}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {i % 3 === 0 ? <GiLotus /> : i % 3 === 1 ? <FaStar /> : <GiFlowerPot />}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Floating Gifts ──────────────────────────────────────────────────────────
function FloatingGifts({ onGiftClick, openedGifts }) {
  return (
    <div className="fixed inset-0 overflow-hidden z-40 pointer-events-none">
      {giftPhotos.map((_, i) => {
        const isOpened = openedGifts.includes(i);
        return (
          <motion.div
            key={i}
            className="absolute cursor-pointer pointer-events-auto"
            style={{
              left: `${15 + (i * 17) % 70}%`,
              top: `${20 + (i * 23) % 60}%`,
            }}
            animate={{
              y: isOpened ? [0] : [-15, 15, -15],
              x: isOpened ? [0] : [-8, 8, -8],
              rotate: isOpened ? 0 : [0, 5, -5, 0],
              opacity: isOpened ? 0 : 1,
              scale: isOpened ? 0 : 1,
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: isOpened ? 0 : Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            onClick={() => !isOpened && onGiftClick(i)}
            whileHover={!isOpened ? { scale: 1.2, rotate: 10 } : {}}
            whileTap={!isOpened ? { scale: 0.9 } : {}}
          >
            <div
              className="text-5xl filter drop-shadow-lg"
              style={{
                color: "#C9956C",
                textShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <FaGift />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Photo Reveal Modal ──────────────────────────────────────────────────────
function PhotoRevealModal({ photo, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(45, 42, 39, 0.95)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full"
        style={{
          background: "#fff",
          padding: "20px 20px 60px 20px",
          borderRadius: "4px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl z-10 hover:scale-110 transition-transform"
          style={{ color: "#2D2A27" }}
        >
          <IoClose />
        </button>
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full object-cover"
          style={{ aspectRatio: "16/10", display: "block" }}
        />
        <p
          className="absolute bottom-6 left-0 right-0 text-center text-lg"
          style={{
            color: "#5C4033",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {photo.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSub(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAF7F4 0%, #F4E4DC 50%, #EED5C8 100%)" }}
    >
      {/* Decorative rings */}
      <div
        className="absolute rounded-full border opacity-10"
        style={{ width: 600, height: 600, borderColor: "#C9956C", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      />
      <div
        className="absolute rounded-full border opacity-8"
        style={{ width: 900, height: 900, borderColor: "#C9956C", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      />

      {/* Tag line */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.25em" }}
        transition={{ duration: 1.2 }}
        className="text-xs uppercase tracking-widest mb-6 font-light"
        style={{ color: "#A8684A" }}
      >
        ✦ &nbsp; Uma celebração especial &nbsp; ✦
      </motion.p>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif leading-none mb-2"
        style={{
          fontSize: "clamp(3rem, 12vw, 9rem)",
          color: "#2D2A27",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
        }}
      >
        Feliz
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif leading-none mb-6"
        style={{
          fontSize: "clamp(3rem, 12vw, 9rem)",
          background: "linear-gradient(135deg, #C9956C, #E8C4A0, #C9956C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
        }}
      >
        Aniversário
      </motion.h1>

      <AnimatePresence>
        {showSub && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <p
              className="font-serif italic text-xl md:text-2xl flex items-center justify-center gap-2"
              style={{ color: "#5C4033", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Mãe — o amor mais bonito do mundo <GiLotus />
            </p>

            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 12px 40px rgba(201,149,108,0.4)" }}
              whileTap={{ scale: 0.96 }}
              onClick={launchConfetti}
              className="px-10 py-4 rounded-full text-white font-medium tracking-wider text-sm uppercase cursor-pointer inline-flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #C9956C, #B87A5A)",
                boxShadow: "0 6px 24px rgba(201,149,108,0.35)",
                letterSpacing: "0.15em",
              }}
            >
              <FaGift /> Celebrar com Confetes!
            </motion.button>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-8 opacity-40 text-sm"
              style={{ color: "#2D2A27" }}
            >
              ↓ role para baixo ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── POLAROID GALLERY ────────────────────────────────────────────────────────
function Gallery() {
  const [ref, inView] = useScrollInView(0.1);

  return (
    <section
      ref={ref}
      className="py-24 px-4 md:px-12"
      style={{ background: "#FAF7F4" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#A8684A" }}>
          ✦ &nbsp; Memórias &nbsp; ✦
        </p>
        <h2
          className="font-serif italic text-4xl md:text-5xl"
          style={{ color: "#2D2A27", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Momentos que guardo no coração
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={i}
            whileHover={{
              rotate: 0,
              scale: 1.06,
              y: -10,
              boxShadow: "0 24px 60px rgba(45,42,39,0.18)",
              zIndex: 10,
            }}
            className="relative cursor-pointer"
            style={{
              background: "#fff",
              padding: "12px 12px 48px 12px",
              borderRadius: "2px",
              boxShadow: "0 4px 20px rgba(45,42,39,0.1)",
              rotate: photo.rotate,
              transformOrigin: "center center",
            }}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full object-cover"
              style={{ aspectRatio: photo.aspectRatio || "1/1", display: "block" }}
            />
            <p
              className="absolute bottom-3 left-0 right-0 text-center text-xs flex items-center justify-center gap-1"
              style={{
                color: "#5C4033",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {photo.caption} <photo.CaptionIcon />
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── MESSAGES WALL ───────────────────────────────────────────────────────────
function MessagesWall() {
  const [ref, inView] = useScrollInView();

  return (
    <section
      ref={ref}
      className="py-24 px-4 md:px-12"
      style={{ background: "linear-gradient(160deg, #F4E4DC, #EED5C8)" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#A8684A" }}>
          ✦ &nbsp; Do meu coração para o seu &nbsp; ✦
        </p>
        <h2
          className="font-serif italic text-4xl md:text-5xl"
          style={{ color: "#2D2A27", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Palavras que nunca cabem em voz
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={i}
            whileHover={{ 
              y: -12, 
              scale: 1.03,
              rotate: i % 2 === 0 ? 1 : -1,
              boxShadow: "0 24px 60px rgba(45,42,39,0.18)",
              borderColor: msg.accent,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-8 rounded-2xl cursor-pointer"
            style={{
              background: msg.bg,
              boxShadow: "0 4px 20px rgba(45,42,39,0.07)",
              border: `2px solid ${msg.accent}22`,
            }}
          >
            <div
              className="text-2xl mb-4"
              style={{ color: msg.accent }}
            >
              {msg.icon}
            </div>
            <h3
              className="font-serif text-xl mb-3"
              style={{
                color: "#2D2A27",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {msg.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#5C4033" }}>
              {msg.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
function Timeline() {
  const [ref, inView] = useScrollInView(0.05);

  return (
    <section
      ref={ref}
      className="py-24 px-4 md:px-12"
      style={{ background: "#FAF7F4" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#A8684A" }}>
          ✦ &nbsp; Sua História &nbsp; ✦
        </p>
        <h2
          className="font-serif italic text-4xl md:text-5xl"
          style={{ color: "#2D2A27", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Capítulos de uma vida linda
        </h2>
      </motion.div>

      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 bottom-0 w-px origin-top"
          style={{ background: "linear-gradient(to bottom, #C9956C, #E8C4A0)", transform: "translateX(-50%)" }}
        />

        <div className="flex flex-col gap-12">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
                className={`relative flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${isLeft ? "text-right" : "text-left"}`}>
                  <span
                    className="block text-xs uppercase tracking-wider mb-1"
                    style={{ color: "#A8684A" }}
                  >
                    {item.year}
                  </span>
                  <h4
                    className="font-serif text-lg mb-1"
                    style={{ color: "#2D2A27", fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.label}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#7A5C4A" }}>
                    {item.desc}
                  </p>
                </div>

                {/* Dot */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                  style={{
                    background: "#FAF7F4",
                    borderColor: "#C9956C",
                    boxShadow: "0 0 0 4px #F4E4DC",
                  }}
                />

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL GIFT (Video) ──────────────────────────────────────────────────────
function FinalGift() {
  const [ref, inView] = useScrollInView();
  const [isOpened, setIsOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => {
    launchConfetti();
    setIsOpened(true);
    setTimeout(() => setShowVideo(true), 600);
  };

  return (
    <section
      ref={ref}
      className="py-24 px-4 md:px-12"
      style={{ background: "linear-gradient(160deg, #EED5C8, #F4E4DC)" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-12"
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#A8684A" }}>
          ✦ &nbsp; O Grande Presente &nbsp; ✦
        </p>
        <h2
          className="font-serif italic text-4xl md:text-5xl"
          style={{ color: "#2D2A27", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Uma mensagem especial para você
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ scale: 0, opacity: 0, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="cursor-pointer"
              onClick={handleOpen}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="text-9xl"
                style={{
                  color: "#C9956C",
                  filter: "drop-shadow(0 10px 30px rgba(201,149,108,0.4))",
                }}
              >
                <FaGift />
              </div>
              <p
                className="mt-6 text-lg font-serif italic"
                style={{ color: "#5C4033", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Clique para abrir
              </p>
            </motion.div>
          ) : (
            showVideo && (
              <motion.div
                key="video"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
                style={{
                  background: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 10px 40px rgba(45,42,39,0.15)",
                }}
              >
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
                    <IoPlayCircle className="text-6xl" style={{ color: "#C9956C" }} />
                    <p
                      className="absolute bottom-4 text-sm font-serif italic"
                      style={{ color: "#5C4033" }}
                    >
                      
                    </p>
                  </div>
                  
                  <iframe
                    className="absolute inset-0 w-full h-full rounded"
                    src="https://www.youtube.com/embed/C1PnAka2kr8"
                    title="Mensagem Especial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                </div>
                <p
                  className="text-center mt-6 text-lg font-serif italic flex items-center justify-center gap-2"
                  style={{ color: "#5C4033", fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Com todo meu amor <FaHeart style={{ color: "#C9956C" }} />
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  const [ref, inView] = useScrollInView();
  const [heartBeating, setHeartBeating] = useState(true);

  return (
    <footer
      ref={ref}
      className="relative py-24 px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2D2A27, #3d3530)" }}
    >
      {/* Stars BG */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: "#E8C4A0",
            left: `${5 + (i * 4.7) % 92}%`,
            top: `${5 + (i * 6.1) % 88}%`,
            opacity: 0.3 + (i % 4) * 0.15,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <FaFeather className="mx-auto mb-6 text-xl" style={{ color: "#C9956C" }} />

        <h2
          className="font-serif italic mb-4 leading-snug"
          style={{
            fontSize: "clamp(1.8rem, 6vw, 4rem)",
            color: "#FAF7F4",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Com todo o meu amor,
        </h2>

        <div className="flex items-center justify-center gap-2">
          <span
            className="font-serif text-2xl md:text-3xl"
            style={{
              background: "linear-gradient(135deg, #C9956C, #E8C4A0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
            }}
          >
            Tiago Ferreira
          </span>
          <FaHeart style={{ color: "#C9956C", fontSize: "1.5rem" }} />
        </div>

        <div className="w-16 h-px mx-auto my-8" style={{ background: "#C9956C" }} />

        <p className="text-xs tracking-widest uppercase" style={{ color: "#A8684A" }}>
          ✦ &nbsp; Hoje e sempre &nbsp; ✦
        </p>
      </motion.div>

      {/* Floating Heart Button */}
      <motion.button
        animate={heartBeating ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          launchConfetti();
          setHeartBeating((b) => !b);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-50 text-xl"
        style={{
          background: "linear-gradient(135deg, #C9956C, #B87A5A)",
          boxShadow: "0 6px 24px rgba(201,149,108,0.5)",
          color: "#fff",
        }}
        title="Mais amor!"
      >
        <FaHeart />
      </motion.button>
    </footer>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [openedGifts, setOpenedGifts] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleGiftClick = (index) => {
    if (!openedGifts.includes(index)) {
      setOpenedGifts([...openedGifts, index]);
      setSelectedPhoto(giftPhotos[index]);
      launchConfetti();
    }
  };

  // Load Playfair Display from Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap";
    document.head.appendChild(link);

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "#FAF7F4";
  }, []);

  return (
    <div className="relative min-h-screen">
      <FloatingPetals />
      <FloatingGifts onGiftClick={handleGiftClick} openedGifts={openedGifts} />
      
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoRevealModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>

      <Hero />
      <Gallery />
      <MessagesWall />
      <Timeline />
      <FinalGift />
      <Footer />
    </div>
  );
}