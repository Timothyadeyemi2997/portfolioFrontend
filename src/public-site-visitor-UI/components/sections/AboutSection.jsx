import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-[#001E2B]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <h2
              className="
              text-4xl
              md:text-5xl
              font-bold
              mb-6
            "
            >
              About Me
            </h2>

            <p
              className="
              text-gray-400
              leading-relaxed
              mb-6
            "
            >
              I'm a Full Stack Developer focused on
              building scalable, performant, and
              user-friendly web applications.
            </p>

            <p
              className="
              text-gray-400
              leading-relaxed
              mb-6
            "
            >
              My primary stack includes React,
              JavaScript, TypeScript, Node.js,
              Express, MongoDB, and Tailwind CSS.
              I enjoy transforming ideas into
              production-ready products that solve
              real business problems.
            </p>

            <p
              className="
              text-gray-400
              leading-relaxed
            "
            >
              Whether it's creating modern frontend
              experiences, designing APIs, managing
              databases, or deploying cloud-based
              applications, I enjoy working across
              the entire development lifecycle.
            </p>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
            grid
            grid-cols-2
            gap-6
          "
          >
            <div
              className="
              bg-[#081620]
              border
              border-gray-800
              rounded-2xl
              p-6
            "
            >
              <h3
                className="
                text-3xl
                font-bold
                text-green-500
              "
              >
                10+
              </h3>

              <p className="mt-2 text-gray-400">
                Completed Projects
              </p>
            </div>

            <div
              className="
              bg-[#081620]
              border
              border-gray-800
              rounded-2xl
              p-6
            "
            >
              <h3
                className="
                text-3xl
                font-bold
                text-green-500
              "
              >
                Full Stack
              </h3>

              <p className="mt-2 text-gray-400">
                Development Focus
              </p>
            </div>

            <div
              className="
              bg-[#081620]
              border
              border-gray-800
              rounded-2xl
              p-6
            "
            >
              <h3
                className="
                text-3xl
                font-bold
                text-green-500
              "
              >
                REST
              </h3>

              <p className="mt-2 text-gray-400">
                API Development
              </p>
            </div>

            <div
              className="
              bg-[#081620]
              border
              border-gray-800
              rounded-2xl
              p-6
            "
            >
              <h3
                className="
                text-3xl
                font-bold
                text-green-500
              "
              >
                Cloud
              </h3>

              <p className="mt-2 text-gray-400">
                Deployment & Storage
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;