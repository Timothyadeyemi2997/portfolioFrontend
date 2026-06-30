import ContactForm from "../../../shared/components/contact/ContactForm";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="
      py-24
      bg-[#001E2B]
      dark:bg-gray-950
      transition-colors
      duration-300
      "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        px-6
        "
      >
        <h2 
        className="text-4xl font-bold text-center mb-4 text-white dark:text-white">
        
          Contact Me
        </h2>

        <p
          className="
          text-gray-400
          text-center
          mb-12
          "
        >
          Have a project in mind?
          Let's talk.
        </p>

        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;