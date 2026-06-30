import { useState } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../../../shared/services/contact.service";

const inputClass = `
  w-full p-4 rounded-xl
  bg-white/5 dark:bg-white/5
  border border-white/15 dark:border-white/15
  text-white dark:text-white
  placeholder-gray-500 dark:placeholder-gray-500
  focus:outline-none focus:border-green-500 dark:focus:border-green-500
  transition-colors duration-200
`;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendMessage(formData);
      toast.success(
        "Message is sent, i will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <textarea
        name="message"
        rows="6"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;