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
    controls.start("visible");
  }, [controls]);

  return (
    <div
      className="h-full flex items-center justify-center bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
