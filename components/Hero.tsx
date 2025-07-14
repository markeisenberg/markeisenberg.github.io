"use client";

import { ChevronsDown } from "lucide-react"
import { Button } from "@/components/ui/button"; //shadcn Button
import Link from 'next/link';
import React, { useState } from "react";
import FlowDiagram from "./FlowDiagram";
import AvatarCursor from "./Avatar";
import Spotlight from "@/components/Spotlight";

export const Hero = () => {
    const [showCursor, setShowCursor] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    return <Spotlight ><section id="hero" className="relative min-h-dvh flex flex-col items-center justify-center px-4"
    >
        
        <div
            id="hello"
            className="container max-w-5xl mx-auto text-center z-0 flex flex-col md:flex-row md:items-start md:justify-center md:gap-24"
        >
            <div className="flex-1">
                <div className="space-y-2 md:space-y-6 md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight whitespace-nowrap">
                        <span className="">Hi, I&apos;m</span>
                        <span
                            id="name"
                            className="text-primary transition-colors duration-300 hover:text-[#6366f1]"
                            style={{ cursor: "pointer" }}
                            
                            onMouseEnter={() => {
                                setShowCursor(true);
                            }}
                            onMouseLeave={() => {
                                setShowCursor(false);
                            }}
                            onMouseMove={e => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const offsetParent = e.currentTarget.offsetParent as HTMLElement | null;
                                if (offsetParent) {
                                    const parentRect = offsetParent.getBoundingClientRect();
                                    setCursorPos({
                                        x: e.clientX - rect.left + rect.left - parentRect.left,
                                        y: e.clientY - rect.top + rect.top - parentRect.top,
                                    });
                                }
                            }}
                        > Mark Eisenberg</span>
                    </h1>
                    <h3 id="subtitle" className="text-l md:text-2xl font-bold tracking-tight">your friendly neighbourhood UX/UI Designer! <span id="hand">👋</span></h3>
                    <div className="pt-6">
                        <Button
                            asChild
                            variant="default"
                            className=""
                            >
                        <Link href="/#featured">View Projects</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
                {/* Placeholder Section */}
                <div className="p-6 h-full flex flex-col items-center justify-center">
                    <FlowDiagram />
                </div>
            </div>
        </div>
        
        {/* Avatar cursor appears while hovering over name */}
        <AvatarCursor x={cursorPos.x} y={cursorPos.y} visible={showCursor} />

    {/* Bouncing Scroll Indicator */}

    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
       {/*  <span className="text-sm text-muted-foreground mb-2"> Scroll </span>*/}
        <ChevronsDown className="h-8 w-8 text-primary animate-bounce duration-10000" />
    </div>

    </section>
    </Spotlight>
}