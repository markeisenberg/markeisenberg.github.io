import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURSOR_IMG = "https://media.licdn.com/dms/image/v2/C4D03AQHSDWzxgN8gLg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1547561933608?e=1756339200&v=beta&t=_m_bCI0P_Fs050tj9F-chdtI13PUESP_7o-psAbGbnI"; // Example image URL

export const AvatarCursor = ({ x, y, visible, size = 64, imgSize = 64 }) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        left: x - size / 2,
                        top: y - size / 2,
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        border: "2px solid #6366f1",
                        pointerEvents: "none",
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={CURSOR_IMG}
                        alt="Cursor"
                        style={{
                            width: imgSize,
                            height: imgSize,
                            borderRadius: "50%",
                            objectFit: "contain",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AvatarCursor;
