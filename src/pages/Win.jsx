import { useState } from "react";
import { motion } from "framer-motion";

function Win() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <div
      style={{
        color: "white",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "grid",
        gridTemplateRows: "3fr 1fr",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "220px",
          width: "200px",
          height: "200px",
          perspective: "800px",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            pointerEvents: isOpen ? "none" : "auto",
          }}
          animate={isOpen ? { rotateY: [0, 360] } : { rotateY: [0, 360] }}
          transition={{
            repeat: isOpen ? 0 : Infinity,
            duration: 5,
            ease: "linear",
          }}
          onClick={handleClick}
        >
          <motion.div
            className="face front"
            initial={{
              translateZ: 100,
              origin: 0,
            }}
            animate={isOpen ? { translateZ: 250, origin: 0, opacity: 0 } : {}}
            transition={{ duration: 5 }}
          ></motion.div>
          <motion.div
            className="face back"
            initial={{
              translateZ: -100,
              origin: 0,
            }}
            animate={isOpen ? { translateZ: -250, origin: 0, opacity: 0 } : {}}
            transition={{ duration: 5 }}
          ></motion.div>
          <motion.div
            className="face right"
            initial={{
              rotateY: 90,
              translateX: 100,
              origin: 0,
            }}
            animate={
              isOpen
                ? { rotateY: 90, translateX: 250, origin: 0, opacity: 0 }
                : {}
            }
            transition={{ duration: 5 }}
          ></motion.div>
          <motion.div
            className="face left"
            initial={{
              rotateY: 90,
              translateX: -100,
              origin: 0,
            }}
            animate={
              isOpen
                ? { rotateY: 90, translateX: -250, origin: 0, opacity: 0 }
                : {}
            }
            transition={{ duration: 5 }}
          ></motion.div>
          <motion.div
            className={`face top `}
            initial={{
              rotateX: 90,
              translateZ: 0,
              translateY: -100,
              origin: 0,
            }}
            animate={
              isOpen
                ? {
                    rotateX: 90,
                    translateZ: 0,
                    translateY: -250,
                    origin: 0,
                    opacity: 0,
                  }
                : {}
            }
            transition={{ duration: 5 }}
          ></motion.div>
          <motion.div
            className="face bottom"
            initial={{
              rotateX: 90,
              translateZ: 0,
              translateY: 100,
              origin: 0,
            }}
            animate={
              isOpen
                ? {
                    rotateX: 90,
                    translateZ: 0,
                    translateY: 250,
                    origin: 0,
                    opacity: 0,
                  }
                : {}
            }
            transition={{ duration: 5 }}
          ></motion.div>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "3.5rem",
              }}
            >
              <span>نامي</span>
              <span>على</span>
              <span>الوقت</span>
            </div>
          )}
        </motion.div>
      </div>

      {!isOpen && <div>اضغطي على الصندوق</div>}
    </div>
  );
}

export default Win;
