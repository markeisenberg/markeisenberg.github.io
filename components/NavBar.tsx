"use client"

import React from 'react'
import { ModeToggle } from './theme-toggle'
import { MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetContent,
  //SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { motion} from "framer-motion";
import Link from 'next/link'

const navItems = [
  { name: "Home", href: "/" },
  { name: "Skills & CV", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
  { name: "Projects", href: "/#featured" },
];

const NavBar = () => {
  const [open, setOpen] = React.useState(false);

  // Smooth scroll handler for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("/#")) {
    e.preventDefault(); // Prevent default link behavior for smooth scroll
    const id = href.split("#")[1];
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
      window.history.pushState(null, "", href); // Update the URL hash
    }
  }

  // Allow the default behavior if it's a normal link
};

  return (
    <nav className='h-16 bg-background/60 sticky top-0 border-b backdrop-blur flex px-6 justify-between items-center self-stretch z-20'>
      <div className='flex items-center gap-2'>
        <Link href="/" className="cursor-pointer flex items-center h-8 w-8" >
        <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 58 32"
                    className="w-fit h-auto max-w-xl md:max-w-s text-primary"
                  >
                    <motion.path
                      d="M54.6858 7.151H31.801V12.5192H54.6858V18.3961H31.801V23.7535H54.6858V29.9996H25.0403V7.28381H19.6711V29.9996H13.1458V7.28381H7.77759V29.9996H0.546143V0.521118H54.6858V7.151Z"
                      fill="currentColor"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="round"
                      // Fade-in wipe from top using a vertical clipPath
                      initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
                      animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.svg>
                  </Link>
      </div>
      <div className='flex items-center gap-4'>
      {/* <ul className='hidden md:flex w-lvh space-x-6 items-center px-2 md:justify-end'>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/projects"}>Projects</Link></li>
        <li><Link href={"/contact"}>Contact</Link></li>
      </ul> */}

      <div className='hidden md:flex w-lvh space-x-6 items-center px-2 md:justify-end'>
      {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              onClick={e => handleNavClick(e, item.href)}
            >
              {item.name}
            </a>
          ))}
      </div>
      <div>
      <ModeToggle></ModeToggle>
      </div>
      <div className='flex md:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger role="button" tabIndex={0} aria-label="Open menu">
        <MenuIcon />
      </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='text-center'>Menu</SheetTitle>
            <div className='flex flex-col text-xl pt-16'>
    {navItems.map((item, key) => (
      <React.Fragment key={key}>
        <a
          href={item.href}
          role="menuitem" // Add semantic role
          tabIndex={0} // Ensure focusability
          className="text-foreground/80 hover:text-primary transition-colors duration-300 text-center"
          onClick={(e) => {
            handleNavClick(e, item.href);
            setOpen(false); // Ensure the menu closes
          }}
        >
          {item.name}
        </a>
        <Separator className='m-6'/>
      </React.Fragment>
    ))}
  </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      </div>
      </div>

    </nav>
  )
}

export default NavBar
