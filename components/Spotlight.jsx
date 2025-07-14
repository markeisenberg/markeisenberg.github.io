import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Spotlight = ({ children }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorInside, setCursorInside] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseMove={e => {
        setCursor({ x: e.clientX, y: e.clientY });
      }}
      onMouseEnter={() => setCursorInside(true)}
      onMouseLeave={() => setCursorInside(false)}
    >
      <AnimatePresence>
        {cursorInside && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              position: "fixed",
              left: cursor.x - 200,
              top: cursor.y - 200,
              width: 400,
              height: 400,
              pointerEvents: "none",
              zIndex: 20,
              background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.10) 60%, rgba(99,102,241,0.0) 100%)",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default Spotlight;
