import React from "react";
import { useLottie, useLottieInteractivity } from "lottie-react";
import lottieJson from "../../assets/Why Us.json";

const options = {
  animationData: lottieJson,
  autoplay: true,
};

const LottieForWhyUS = () => {
  const lottieObj = useLottie(options);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0, 0.9],
        type: "seek",
        frames: [0, 181],
      },
    ],
  });

  return Animation;
};

export default LottieForWhyUS;
