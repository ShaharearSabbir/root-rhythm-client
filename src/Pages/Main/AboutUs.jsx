import React from "react";
import PageHeader from "../../Components/Shared/PageHeader";
import LottieForAboutUs from "../../Components/Main/LottieForAboutUs";

const AboutUs = () => {
  return (
    <div className="motion-translate-y-in-100">
      <div className="p-8 text-center rounded-t-lg">
        <PageHeader>About Root Rhythm</PageHeader>
        <p className="text-lg opacity-90">Read more about us</p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row mt-10">
        <div className="flex-1">
          <div className="space-y-4 p-4 *:text-justify">
            <p className="">
              At Root Rhythm, we believe that every plant deserves to thrive,
              and every plant parent deserves peace of mind. We understand the
              joy and satisfaction that comes from nurturing green life, but we
              also know the challenges of remembering watering schedules,
              fertilizing needs, and recognizing those subtle signs of distress.
              That's why we created Root Rhythm – your dedicated digital
              assistant for all things plant care.
            </p>
            <p>
              Root Rhythm is a full-stack, mobile-responsive web application
              designed to simplify plant management for enthusiasts of all
              levels. Whether you're a seasoned gardener with an overflowing
              indoor jungle or just starting your journey with a single
              succulent, our platform provides the tools you need to ensure your
              leafy friends flourish.
            </p>
            <p>
              Our application, thoughtfully themed around the vibrant and
              diverse world of tropical plants, offers a visually appealing and
              intuitive experience across all your devices. From your desktop to
              your tablet and smartphone, Root Rhythm ensures seamless
              interaction, allowing you to manage your plants anytime, anywhere.
            </p>
            <p>
              With Root Rhythm, you can effortlessly add new plant records, log
              essential care tasks like watering and fertilizing, track health
              status, and even set personalized reminders. Our secure user
              authentication system ensures your plant data is private and
              accessible only to you, empowering you with a personalized
              dashboard to oversee your botanical family. We're here to help you
              cultivate not just plants, but also confidence and a deeper
              connection with your green companions. Welcome to Root Rhythm –
              where your plants' well-being is our priority.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2">
          <LottieForAboutUs></LottieForAboutUs>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
