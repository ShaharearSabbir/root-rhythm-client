import React from "react";
import { useLottie, useLottieInteractivity } from "lottie-react";
import lottieJson from "../assets/Animation - 1747878662466.json";

// const style = {
//   height: 300,
//   border: 3,
//   borderStyle: "solid",
//   borderRadius: 7,
// };

const options = {
  animationData: lottieJson,
  autoplay: true,
};

const LottieAni = () => {
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

export default LottieAni;
