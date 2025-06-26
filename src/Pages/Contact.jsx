import React, { useState } from "react";
import PageHeader from "../Components/Shared/PageHeader";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const messageBox = document.getElementById("messageBox");
    if (messageBox) {
      messageBox.innerText = "Message sent successfully!";
      messageBox.classList.remove("hidden");
      messageBox.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700"
      );
      setTimeout(() => {
        messageBox.classList.add("hidden");
      }, 3000);
    }
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full rounded-lg overflow-hidden motion-translate-y-in-100">
      <div
        id="messageBox"
        className="hidden p-4 mb-4 text-center border rounded-md"
      ></div>

      <div className="p-8 text-center">
        <PageHeader>Contact Us</PageHeader>
        <p className="text-lg opacity-90">We'd love to hear from you!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <div className="lg:order-2">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <div className="w-full h-64 md:h-80 lg:h-[400px]  rounded-lg overflow-hidden shadow-md mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902264629471!2d90.39502607590858!3d23.750836588383827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85a3c9b7e77%3A0x6b8c8d8b8a8b8a8b!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location on Map"
            ></iframe>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-xl mr-3 text-primary dark:text-accent"></i>
              <p>123 Plant Care Avenue, Green District, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone-alt text-xl mr-3 text-primary dark:text-accent"></i>
              <p>+880 123 456 7890</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope text-xl mr-3 text-primary dark:text-accent"></i>
              <p>info@plantcare.com</p>
            </div>
          </div>
        </div>

        <div className="lg:order-1">
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="fieldset space-y-4">
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input w-full  rounded-md shadow-sm"
                required
              />
            </div>

            <div>
              <label className="label">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="input w-full  rounded-md shadow-sm"
                required
              />
            </div>

            <div>
              <label className="label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Inquiry about..."
                className="input w-full   rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="label">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="textarea input w-full h-32   rounded-md shadow-sm"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
