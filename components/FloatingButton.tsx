"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button";

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return isVisible ? (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleScrollToHero}
        variant="secondary"
        size="icon"
        className="rounded-full p-3 shadow-md hover:shadow-lg"
      >
        <ArrowUp size={20}/>
      </Button>
    </div>
  ) : null;
};

export default FloatingButton;