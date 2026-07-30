import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURSOR_IMG = "https://previews.dropbox.com/p/thumb/ADFijG2jLjYv-I7WfYSVGpZMm4084842hszvBiwB6V_MwB16c45cPtpIIaYTDH75H3GVmefgL4nBMWz9n6plbsWq6CLqFCI6xVGH0bimIWsQ09c2DkIaXD2KYnvYoEIYGVLpgAP_zxSEm-mMo-fjdw2nmm-wX5Lv4fWqZHvHLZuh70DC6gtj4ias8LClPL9klQeYPPd_ipp6RMeEAK3AVE07Ml9NVkBxctNtxY0SBGMifTIuerF18jm_3-3WTotCUGb5p7Sws8JmqaHWXiffxn_OAHCrwS-lxTaq-BOUPT--AQ/p.jpeg"; // Example image URL

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
