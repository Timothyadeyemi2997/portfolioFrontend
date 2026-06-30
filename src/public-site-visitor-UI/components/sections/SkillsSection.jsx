import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Tailwind CSS",
    ],
  },

  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "JWT Authentication",
    ],
  },

  {
    title: "Database",
    skills: [
      "MongoDB",
      "Mongoose",
    ],
  },

  {
    title: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub",
      "Cloudinary",
      "Render",
      "Postman",
    ],
  },

  {
    title: "Branding",
    skills: [
      "Illustrator",
      "Photoshop",
      "Corel draw",
      "Capcut"
      
    ],
  },

];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="py-24 bg-[#081620]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
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
            text-center
            mb-4
          "
          >
            Skills & Technologies
          </h2>

          <p
            className="
            text-center
            text-gray-400
            mb-16
            max-w-2xl
            mx-auto
          "
          >
            Building scalable web
            applications from concept
            to deployment using modern
            technologies.
          </p>
        </motion.div>

        <div
          className="
          grid
          md:grid-cols-2
          gap-8
          "
        >
          {skillGroups.map(
            (group, index) => (
              <motion.div
                key={group.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.1,
                }}
                className="
                bg-[#001E2B]
                border
                border-gray-800
                rounded-2xl
                p-6
                "
              >
                <h3
                  className="
                  text-xl
                  font-semibold
                  mb-6
                  text-green-500
                "
                >
                  {group.title}
                </h3>

                <div
                  className="
                  flex
                  flex-wrap
                  gap-3
                "
                >
                  {group.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-[#081620]
                        border
                        border-gray-700
                        text-sm
                        "
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;