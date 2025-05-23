import React from "react";

const FAQ = () => {
  return (
    <div className="my-10 md:my-20 lg:my-32">
      <div className="mb-3 lg:my-10">
        <h3 className="text-2xl font-bold">FAQ</h3>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">
          How often should I water my plants?
        </div>
        <div className="collapse-content text-sm">
          Root Rhythm lets you set custom watering schedules for each plant,
          reminding you when it's time to water, so you never over or underwater
          again!
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          What's the best way to fertilize my plants?
        </div>
        <div className="collapse-content text-sm">
          Track specific fertilization needs and log applications within Root
          Rhythm to ensure your plants get the right nutrients at the right
          time.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          How can I tell if my plant is sick or stressed?
        </div>
        <div className="collapse-content text-sm">
          Root Rhythm helps you log health observations and provides a history,
          making it easier to spot subtle changes and address issues promptly.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          I have so many plants; how do I keep track of them all?
        </div>
        <div className="collapse-content text-sm">
          Root Rhythm's personalized dashboard centralizes all your plant
          records, care tasks, and reminders for effortless management.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          My plant isn't thriving, but I don't know why.
        </div>
        <div className="collapse-content text-sm">
          Use Root Rhythm to log environmental conditions, care history, and
          symptoms, providing valuable data to diagnose and improve plant
          health.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          Can Root Rhythm remind me of important care tasks?
        </div>
        <div className="collapse-content text-sm">
          Absolutely! Set personalized reminders for watering, fertilizing,
          repotting, and more, ensuring your plants always receive timely
          attention.
        </div>
      </div>
    </div>
  );
};

export default FAQ;
