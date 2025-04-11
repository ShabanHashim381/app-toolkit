import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const heading = "App Toolkit";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  }),
};

const Homepage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => "visible");
  }, [controls]);

  return (
    <div
      className="h-full flex items-center justify-center bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg')",
      }}
    >
      <h1 className="text-5xl font-bold text-white flex space-x-1 backdrop-blur-sm bg-black/40 px-4 py-2 rounded-2xl shadow-xl">
        {heading.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate={controls}
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h1>
    </div>
  );
};

export default Homepage;
