import { useState } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../../../shared/services/contact.service";

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

      toast.success("Message sent!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl"
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl"
      />

      <textarea
        name="message"
        rows="6"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl"
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-green-600
          px-6
          py-3
          rounded-xl
        "
      >
        {loading
          ? "Sending..."
          : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;