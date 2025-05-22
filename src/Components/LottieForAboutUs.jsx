import React from "react";
import { useLottie, useLottieInteractivity } from "lottie-react";
import lottieJson from "../assets/About Us.json";


const options = {
  animationData: lottieJson,
  autoplay: true,
};

const LottieForAboutUs = () => {
  const lottieObj = useLottie(options);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0, 0.9],
        type: "seek",
        frames: [0, 120],
      },
    ],
  });

  return Animation;
};

export default LottieForAboutUs;
