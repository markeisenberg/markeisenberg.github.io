import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURSOR_IMG = "https://previews.dropbox.com/p/thumb/ACxdBgXHOZHU67v29RHe89hCo6Qsyj4vSlfH4zE_A_5aJYG08isFwj75NKCp7H6r86bBLMZLXcNASCu28Pk4j4wQue47fn7kxMsj7E5InQC_3EIVcaFPK_7MxbjSYnvNXD7YbWo9gXNwTAWTetwi6CRm8waJBqz15jeIsmC00IGAYum2jzwkS7qHKtmzcehCXu92IfQFHaK8UdJrT9aY3kIeobIkTG4TcpvGMqHkxDT6VXIfraeiCI_pDsj1QiaookZ44Rzf92tZ7UWY6XrtfIH8xpr1FxrSPoypj5bc3rnHmQfE6VWdy0DKwVFmv71C3T9zE3yjYt6zqp_0AX9KlUju/p.jpeg?is_prewarmed=true"; // Example image URL

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
