import React from "react";
import LottieForWhyUS from "../../Components/Main/LottieForWhyUS";
import PageHeader from "../../Components/Shared/PageHeader";

const WhyUs = () => {
  return (
    <div>
      <div className="p-8 text-center rounded-t-lg">
        <PageHeader>Why Choose Root Rhythm?</PageHeader>
        <p className="text-lg opacity-90">
          Know why Root Rhythm is is the best!!
        </p>
      </div>

      <p className="text-justify">
        At Root Rhythm, we're more than just an app; we're your partner in
        cultivating a thriving plant haven. We understand the unique joys and
        challenges of plant parenthood, and we've designed Root Rhythm to be the
        ultimate solution for every green thumb, from novice to expert.
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <div className="lg:w-3/5 mx-auto">
            <LottieForWhyUS></LottieForWhyUS>
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-4 p-4 *:text-justify">
            <h3 className="text-lg font-bold">Here's what sets us apart:</h3>
            <ul className="space-y-3">
              <li>
                <strong>Peace of Mind, Simplified:</strong> Forget the stress of
                forgotten watering schedules or missed fertilizing dates. Root
                Rhythm eliminates the guesswork, providing personalized
                reminders and a clear overview of each plant's needs. Enjoy the
                peace of mind that comes from knowing your plants are always
                getting the care they deserve.
              </li>
              <li>
                <strong>Intuitive Design, Stunning Visuals:</strong> We believe
                plant care should be as beautiful as your plants themselves. Our
                application is thoughtfully themed around the vibrant world of
                tropical plants, offering a visually appealing and intuitive
                experience. Navigate effortlessly and enjoy a delightful journey
                as you manage your botanical family.
              </li>
              <li>
                <strong>Seamless, Anytime, Anywhere Access:</strong> Your plants
                don't stay in one place, and neither should your plant care
                tools. Root Rhythm is a full-stack, mobile-responsive web
                application, ensuring a seamless experience across your desktop,
                tablet, and smartphone. Manage your plants and access vital
                information whenever, wherever you are.
              </li>

              <li>
                <strong>Empowering Features for Every Plant Parent:</strong>{" "}
                Whether you're nurturing a single succulent or an overflowing
                indoor jungle, Root Rhythm provides the robust features you
                need. Easily add new plant records, log essential care tasks,
                track health status, and set personalized reminders. Our secure
                user authentication system ensures your plant data is private
                and accessible only to you.
              </li>
              <li>
                <strong>Cultivate Confidence, Deepen Connection:</strong> We're
                here to help you not just grow plants, but also grow your
                confidence. By simplifying the complexities of plant care, Root
                Rhythm empowers you to understand your green companions better,
                fostering a deeper, more meaningful connection with your
                botanical family.
              </li>
            </ul>
            <strong className="text-justify">
              Choose Root Rhythm, and let us help you transform your plant care
              journey from a chore into a joyous, thriving rhythm.
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
