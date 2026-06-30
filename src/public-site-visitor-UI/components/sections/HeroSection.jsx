import { motion } from "framer-motion";
import heroBg from "../../../Asset/hero-bkg.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-screen pt-16 flex items-center justify-center px-6 overflow-hidden transition-colors duration-300"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay — must be absolute to sit over the background */}
      <div className="absolute inset-0 bg-[#001E2B]/80 lg:bg-[#001E2B]/70 dark:bg-gray-950/85" />

      {/* Top fade — prevents face bleeding into navbar on desktop */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#001E2B] to-transparent hidden lg:block" />

      {/* Content — must be relative + z-10 to sit above overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-0">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-green-500 font-medium">
            Full Stack Developer
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight text-white dark:text-white">
            Building
            <span className="text-green-500"> Modern</span>
            <br />
            Web Products
          </h1>

          <p className="mt-6 text-gray-300 dark:text-gray-400 text-lg max-w-xl">
            I build scalable web applications using React, Node.js, Express,
            MongoDB, TypeScript and Tailwind CSS.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#contact"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="border border-gray-500 dark:border-gray-500 text-white px-6 py-3 rounded-xl hover:border-gray-300 transition-colors font-medium"
            >
              View Projects
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE — decorative glow (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex justify-center"
        >
          <div className="w-[350px] h-[350px] rounded-full bg-gradient-to-br from-green-500 to-emerald-700 blur-3xl opacity-20" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;