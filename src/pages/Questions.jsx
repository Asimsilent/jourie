import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    text: "ما اسمك؟",
    options: ["جوري", "فاطمة", "مريم", "نور"],
    answerIndex: 0,
  },
  {
    text: "من أين أنت؟",
    options: ["كردستان", "كمبوديا", "تركيا", "العراق"],
    answerIndex: 3,
  },
  {
    text: "كم عمرك؟",
    options: ["٢٠", "٢١", "٢٢", "٢٣"],
    answerIndex: 1,
  },
  {
    text: "هذا السؤال غير متاح لك حالياً",
    options: ["😊", "😊", "😊", "😊"],
    answerIndex: "all",
  },

  // Add more questions here
];

function Questions() {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);

  const currentQuestion = questions[questionIndex];
  const fullText = currentQuestion.text;
  const typedText = fullText.slice(0, charIndex);

  // Typing effect
  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => setCharIndex((i) => i + 1), 40);
      return () => clearTimeout(timeout);
    } else {
      const blink = setTimeout(() => setShowCursor((prev) => !prev), 500);
      return () => clearTimeout(blink);
    }
  }, [charIndex, fullText]);

  const handleOptionClick = (index) => {
    if (
      index === currentQuestion.answerIndex ||
      currentQuestion.answerIndex === "all"
    ) {
      // correct
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((i) => i + 1);
        setCharIndex(0);
        setShowCursor(true);
        // setSelectedOption(null);
        setErrorIndex(null);
      } else {
        navigate("/win"); // or next page
      }
    } else {
      // wrong
      setErrorIndex(index);
      setTimeout(() => setErrorIndex(null), 600); // reset shake
    }
  };

  return (
    <div
      style={{
        color: "white",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Typing Question */}
      <div style={{ maxWidth: "800px", marginBottom: "30px" }}>
        {typedText}
        <AnimatePresence>
          {showCursor && (
            <motion.span
              key="cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                display: "inline-block",
                width: "6px",
                height: "1.2em",
                backgroundColor: "white",
                verticalAlign: "bottom",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Options */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        {currentQuestion.options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOptionClick(i)}
            disabled={charIndex < fullText.length}
            animate={
              errorIndex === i
                ? {
                    x: [0, -10, 10, -10, 10, 0],
                    backgroundColor: "#dc3545",
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
            style={{
              padding: "15px 30px",
              fontSize: "1.2rem",
              borderRadius: "999px",
              backgroundColor: "transparent",
              color: "white",
              border: "2px solid white",
              cursor: "pointer",
              // width: "100%",
            }}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
