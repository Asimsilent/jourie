import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

function Letters({ Letter, setLetter }) {
  const [letters, setLetters] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  //  console.log(location.pathname);

  // Generate random letters continuously from all directions
  useEffect(() => {
    const characters =
      "ع1غAف2قBق3Cك4لDم5نEه6Fو7يG8H9I0JاKبLتMثNجOحPخQدRذSرTزUسVشWصXضYطZظ";
    setLetter(characters[Math.floor(Math.random() * characters.length)]);
    const interval = setInterval(() => {
      // Randomly choose a direction (0: top, 1: right, 2: bottom, 3: left)
      const direction = Math.floor(Math.random() * 4);

      let initialX, initialY, animateX, animateY;

      switch (direction) {
        case 0: // From top
          initialX = Math.random() * 100;
          initialY = -10;
          animateX = initialX + (Math.random() * 200 - 100); // Slight horizontal drift
          animateY = 110;
          break;
        case 1: // From right
          initialX = 110;
          initialY = Math.random() * 100;
          animateX = -10;
          animateY = initialY + (Math.random() * 200 - 100);
          break;
        case 2: // From bottom
          initialX = Math.random() * 100;
          initialY = 110;
          animateX = initialX + (Math.random() * 200 - 100);
          animateY = -20;
          break;
        case 3: // From left
          initialX = -10;
          initialY = Math.random() * 100;
          animateX = 110;
          animateY = initialY + (Math.random() * 200 - 100);
          break;
      }

      const newLetter = {
        char: characters.charAt(Math.floor(Math.random() * characters.length)),
        id: Date.now() + Math.random(),
        initialX,
        initialY,
        animateX,
        animateY,
        size: 50 + Math.random() * 20,
        opacity: 0.5 + Math.random() * 0.3,
        duration: 2 + Math.random() * 40,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 70%)`,
        direction,
      };

      setLetters((prev) => [...prev.slice(-100), newLetter]);
    }, 200); // Slightly slower spawn rate since we have more directions

    return () => clearInterval(interval);
  }, [setLetter]);

  // Cleanup old letters
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setLetters((prev) =>
        prev.filter((l) => Date.now() - l.id < l.duration * 1500)
      );
    }, 100);

    return () => clearInterval(cleanupInterval);
  }, []);

  function handleClick(e, char) {
    e.stopPropagation();
    // navigate("/test");

    if (char === Letter) {
      navigate("/test");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: location.pathname === "/homepage" ? 1 : -1,
        // pointerEvents: "none",
        backgroundColor:
          location.pathname === "/homepage" ? "transparent" : "black",
      }}
    >
      {letters.map((letter) => (
        <motion.div
          key={letter.id}
          initial={{
            x: `${letter.initialX}vw`,
            y: `${letter.initialY}vh`,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            x: `${letter.animateX}vw`,
            y: `${letter.animateY}vh`,
            scale: 1,
            opacity: letter.opacity,
          }}
          transition={{
            duration: letter.duration,
            ease: [0.5, 0.8, 0.8, 0.8],
          }}
          style={{
            position: "absolute",
            fontSize: `${letter.size}px`,
            color: letter.color,
            border: "1px solid green",
            padding: "0px 10px 0px 10px",
            fontWeight: "bold",
            willChange: "transform",
            // pointerEvents: "auto",
            cursor: "pointer",
            backgroundColor: "transparent",
            // zIndex: 1,
          }}
          onClick={(e) => handleClick(e, letter.char)}
        >
          {letter.char}
        </motion.div>
      ))}
    </div>
  );
}

export default Letters;
