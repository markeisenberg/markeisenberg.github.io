import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarCursor from "./Avatar";
import { Button } from "@/components/ui/button"
import { Hand } from "lucide-react";

const RECT_WIDTH = 40;
const RECT_HEIGHT = 80;
const RECT_RADIUS = 6;
const GAP = 48;
const SVG_W = 220;
const SVG_H = 200;
const ANIMATION_INTERVAL = 1200; // ms
const INITIAL_SPEED = 3; // px per tick

const LIGHT_RED_GRADIENT = "linear-gradient(135deg, #FFF1F2 0%, #FC7979 100%)";
const LIGHT_GREEN_GRADIENT = "linear-gradient(135deg, #D9FFE8 0%, #3DFF76 100%)";

// Helper to generate a random position within bounds
function getRandomRectPosition() {
    const padX = 10, padY = 10;
    const x = Math.random() * (SVG_W - RECT_WIDTH - padX * 2) + padX;
    const y = Math.random() * (SVG_H - RECT_HEIGHT - padY * 2) + padY;
    return { x, y };
}

// Helper for line length for framer-motion
function getLineLength(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

const happy = ["😃", "🥳", "☺️", "😎", "🤸🏽‍♂️", "😍"];
const sad = ["🤔", "🙄", "😯", "😵‍💫", "😡", "😴"];

function pickRandomEmojis(arr, count) {
    // Shuffle and pick first N
    const shuffled = arr.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getRandomVelocity() {
    // Random direction, fixed speed
    const angle = Math.random() * 2 * Math.PI;
    return {
        vx: Math.cos(angle) * INITIAL_SPEED,
        vy: Math.sin(angle) * INITIAL_SPEED,
    };
}

const FlowDiagram = () => {
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState(false);
    const [wasActive, setWasActive] = useState(false);
    // Each rect: { x, y, vx, vy }
    const [rectStates, setRectStates] = useState([
        { ...getRandomRectPosition(), ...getRandomVelocity() },
        { ...getRandomRectPosition(), ...getRandomVelocity() },
        { ...getRandomRectPosition(), ...getRandomVelocity() },
    ]);
    const [emojiSet, setEmojiSet] = useState(["", "", ""]);
    const [emojiKeys, setEmojiKeys] = useState([0, 0, 0]);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorInside, setCursorInside] = useState(false);
    const intervalRef = useRef();

    // Final positions for flow layout
    const flowRects = [
        { x: 30, y: 50 },
        { x: 30 + RECT_WIDTH + GAP, y: 50 - RECT_HEIGHT/2 - 8 },
        { x: 30 + RECT_WIDTH + GAP, y: 50 + RECT_HEIGHT/2 + 8 },
    ];

    // On mount, initialize random positions/emojis/velocities
    useEffect(() => {
        setMounted(true);
        setRectStates([
            { ...getRandomRectPosition(), ...getRandomVelocity() },
            { ...getRandomRectPosition(), ...getRandomVelocity() },
            { ...getRandomRectPosition(), ...getRandomVelocity() },
        ]);
        const initialEmojis = pickRandomEmojis(sad, 3);
        setEmojiSet(initialEmojis);
        setEmojiKeys([0, 0, 0]);
    }, []);

    // Track last active state for transition duration logic
    useEffect(() => {
        setWasActive(active);
    }, [active]);

    // Animate bouncing movement until active
    useEffect(() => {
        if (!mounted) return;
        if (active) {
            // Snap to flowRects (no bounce)
            setRectStates([
                { ...flowRects[0], vx: 0, vy: 0 },
                { ...flowRects[1], vx: 0, vy: 0 },
                { ...flowRects[2], vx: 0, vy: 0 },
            ]);
            const happyEmojis = pickRandomEmojis(happy, 3);
            setEmojiSet(happyEmojis);
            setEmojiKeys(keys => keys.map(k => k + 1));
            clearInterval(intervalRef.current);
            return;
        }
        // Only pick new sad emojis when toggling to inactive
        const sadEmojis = pickRandomEmojis(sad, 3);
        setEmojiSet(sadEmojis);
        setEmojiKeys(keys => keys.map(k => k + 1));
        intervalRef.current = setInterval(() => {
            setRectStates(prev =>
                prev.map(rect => {
                    let { x, y, vx, vy } = rect;
                    x += vx;
                    y += vy;
                    // Bounce off left/right
                    if (x < 0) {
                        x = 0;
                        vx = -vx;
                    } else if (x > SVG_W - RECT_WIDTH) {
                        x = SVG_W - RECT_WIDTH;
                        vx = -vx;
                    }
                    // Bounce off top/bottom
                    if (y < 0) {
                        y = 0;
                        vy = -vy;
                    } else if (y > SVG_H - RECT_HEIGHT) {
                        y = SVG_H - RECT_HEIGHT;
                        vy = -vy;
                    }
                    return { x, y, vx, vy };
                })
            );
        }, 30); // Faster interval for smooth bounce
        return () => clearInterval(intervalRef.current);
    }, [active, mounted]);

    // Prevent rendering until mounted (client-side)
    if (!mounted) {
        return (
            <div style={{ width: SVG_W, height: SVG_H }} />
        );
    }

    return (
        <div
            className="flex justify-center items-center cursor-pointer select-none"
            onMouseEnter={e => {
                setActive(true);
                setCursorInside(true);
            }}
            onMouseLeave={e => {
                setActive(false);
                setCursorInside(false);
                setWasActive(true); // Mark that we just left active
                // Restart bouncing animation with new random positions/velocities and sad emojis
                setRectStates([
                    { ...getRandomRectPosition(), ...getRandomVelocity() },
                    { ...getRandomRectPosition(), ...getRandomVelocity() },
                    { ...getRandomRectPosition(), ...getRandomVelocity() },
                ]);
                setEmojiSet(pickRandomEmojis(sad, 3));
                setEmojiKeys(keys => keys.map(k => k + 1));
            }}
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }}
            style={{ width: SVG_W, height: SVG_H, position: "relative" }}
        >
            {/* Avatar cursor follows mouse */}
            <AvatarCursor x={cursorPos.x} y={cursorPos.y} visible={cursorInside} />
            {/* Rectangles as absolutely positioned divs */}
            <div style={{ position: "absolute", left: 0, top: 0, width: SVG_W, height: SVG_H, pointerEvents: "none" }}>
                <div className="block md:hidden">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="size-8"
                        onClick={() => setActive((v) => !v)}
                    >
                        <Hand className="animate-ping" />
                    </Button>
                </div>
                {rectStates.map((rect, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: "absolute",
                            left: rect.x,
                            top: rect.y,
                            width: RECT_WIDTH,
                            height: RECT_HEIGHT,
                            borderRadius: RECT_RADIUS,
                            background: active ? LIGHT_GREEN_GRADIENT : LIGHT_RED_GRADIENT,
                            border: "2px solid #b6c2d1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                            userSelect: "none",
                            pointerEvents: "auto",
                        }}
                        animate={{
                            left: rect.x,
                            top: rect.y,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 18,
                            mass: 0.7,
                            duration: !active && wasActive ? 3.5 : (active ? 3 : 2), // slowest when leaving hover
                        }}
                    >
                        <motion.span
                            key={emojiKeys[i]}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            style={{
                                display: "inline-block",
                                width: "100%",
                                textAlign: "center"
                            }}
                        >
                            {emojiSet[i]}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
            {/* SVG for arrows (below the divs so arrows are under) */}
            <svg width={SVG_W} height={SVG_H} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
                <AnimatePresence>
                {active && (
                    <>
                        {/* Arrow to second rectangle (right angle) */}
                        <g>
                            <motion.line
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                exit={{ opacity: 0, pathLength: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                x1={flowRects[0].x + RECT_WIDTH}
                                y1={flowRects[0].y + RECT_HEIGHT / 2}
                                x2={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y2={flowRects[0].y + RECT_HEIGHT / 2}
                                stroke="#6366f1"
                                strokeWidth={3}
                                strokeDasharray={getLineLength(
                                    flowRects[0].x + RECT_WIDTH,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2
                                )}
                                strokeDashoffset={getLineLength(
                                    flowRects[0].x + RECT_WIDTH,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2
                                )}
                                style={{
                                    pathLength: 1,
                                }}
                            />
                            <motion.line
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                exit={{ opacity: 0, pathLength: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                x1={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y1={flowRects[0].y + RECT_HEIGHT / 2}
                                x2={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y2={flowRects[1].y + RECT_HEIGHT / 2}
                                stroke="#6366f1"
                                strokeWidth={3}
                                strokeDasharray={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[1].y + RECT_HEIGHT / 2
                                )}
                                strokeDashoffset={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[1].y + RECT_HEIGHT / 2
                                )}
                                style={{
                                    pathLength: 1,
                                }}
                            />
                            <motion.line
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                exit={{ opacity: 0, pathLength: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                x1={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y1={flowRects[1].y + RECT_HEIGHT / 2}
                                x2={flowRects[1].x}
                                y2={flowRects[1].y + RECT_HEIGHT / 2}
                                stroke="#6366f1"
                                strokeWidth={3}
                                markerEnd="url(#arrowhead)"
                                strokeDasharray={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[1].y + RECT_HEIGHT / 2,
                                    flowRects[1].x,
                                    flowRects[1].y + RECT_HEIGHT / 2
                                )}
                                strokeDashoffset={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[1].y + RECT_HEIGHT / 2,
                                    flowRects[1].x,
                                    flowRects[1].y + RECT_HEIGHT / 2
                                )}
                                style={{
                                    pathLength: 1,
                                }}
                            />
                        </g>
                        {/* Arrow to third rectangle (right angle) */}
                        <g>
                            <motion.line
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                exit={{ opacity: 0, pathLength: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                x1={flowRects[0].x + RECT_WIDTH}
                                y1={flowRects[0].y + RECT_HEIGHT / 2}
                                x2={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y2={flowRects[0].y + RECT_HEIGHT / 2}
                                stroke="#6366f1"
                                strokeWidth={3}
                                strokeDasharray={getLineLength(
                                    flowRects[0].x + RECT_WIDTH,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2
                                )}
                                strokeDashoffset={getLineLength(
                                    flowRects[0].x + RECT_WIDTH,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2
                                )}
                                style={{
                                    pathLength: 1,
                                }}
                            />
                            <motion.line
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                exit={{ opacity: 0, pathLength: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                x1={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y1={flowRects[0].y + RECT_HEIGHT / 2}
                                x2={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y2={flowRects[2].y + RECT_HEIGHT / 2}
                                stroke="#6366f1"
                                strokeWidth={3}
                                strokeDasharray={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[2].y + RECT_HEIGHT / 2
                                )}
                                strokeDashoffset={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[0].y + RECT_HEIGHT / 2,
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[2].y + RECT_HEIGHT / 2
                                )}
                                style={{
                                    pathLength: 1,
                                }}
                            />
                            <motion.line
                                initial={{ opacity: 0, pathLength: 0 }}
                                animate={{ opacity: 1, pathLength: 1 }}
                                exit={{ opacity: 0, pathLength: 0 }}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                x1={flowRects[0].x + RECT_WIDTH + GAP / 2}
                                y1={flowRects[2].y + RECT_HEIGHT / 2}
                                x2={flowRects[2].x}
                                y2={flowRects[2].y + RECT_HEIGHT / 2}
                                stroke="#6366f1"
                                strokeWidth={3}
                                markerEnd="url(#arrowhead)"
                                strokeDasharray={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[2].y + RECT_HEIGHT / 2,
                                    flowRects[2].x,
                                    flowRects[2].y + RECT_HEIGHT / 2
                                )}
                                strokeDashoffset={getLineLength(
                                    flowRects[0].x + RECT_WIDTH + GAP / 2,
                                    flowRects[2].y + RECT_HEIGHT / 2,
                                    flowRects[2].x,
                                    flowRects[2].y + RECT_HEIGHT / 2
                                )}
                                style={{
                                    pathLength: 1,
                                }}
                            />
                        </g>
                        {/* Arrowhead definition */}
                        <defs>
                            {/* Arrowhead size is defined here */}
                            <marker
                                id="arrowhead"
                                markerWidth="5"
                                markerHeight="5"
                                refX="2.5"
                                refY="2.5"
                                orient="auto"
                            >
                                <polygon points="0,0 5,2.5 0,5" fill="#6366f1" />
                            </marker>
                        </defs>
                    </>
                )}
                </AnimatePresence>
            </svg>
        </div>
    );
};

export default FlowDiagram;