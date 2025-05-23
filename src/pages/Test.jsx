import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const fullText =
  "اختبارك بيكون من ٤ أسئلة، ولازم تجاوبين عليها كلها صح عشان تستلمين الجائزة";

function Test() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 40);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setShowCursor((e) => !e), 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const typedText = fullText.slice(0, currentIndex);

  function handleClick() {
    navigate("/questions");
  }

  return (
    <div
      style={{
        color: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          lineHeight: "1.5em",
          wordBreak: "normal",
          overflowWrap: "break-word",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            whiteSpace: "pre-wrap",
          }}
        >
          {typedText}

          {/* Blinking Cursor */}
          {showCursor && (
            <span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
              style={{
                display: "inline-block",
                width: "6px",
                height: "1.4em",
                backgroundColor: "white",
                verticalAlign: "bottom",
              }}
            />
          )}
        </div>
      </div>
      <motion.div
        whileHover={
          showCursor
            ? {}
            : {
                x: [0, 2, -2, 2, -2, 2, -2, 0],
                scale: 1.05,
                transition: {
                  duration: 0.4,
                  repeat: Infinity,
                  // repeatType: "loop",
                },
              }
        }
        whileTap={
          showCursor
            ? {}
            : {
                scale: 0.5,
                transition: {
                  duration: 0.1,
                },
              }
        }
      >
        <Button
          outline
          style={{ marginTop: "20px", backgroundColor: "transparent" }}
          className="py-3 px-5 fs-4 rounded-pill"
          onClick={handleClick}
          disabled={showCursor}
        >
          ابدئي الاختبار
        </Button>
      </motion.div>
    </div>
  );
}

export default Test;
