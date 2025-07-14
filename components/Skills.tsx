"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Palette, User, MonitorSmartphone, FileText, ExternalLink } from "lucide-react";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button"; // shadcn Button

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const chartDataUI = [
  { skill: "Design Systems", desktop: 90 },
  { skill: "Axure RP", desktop: 55 },
  { skill: "Video Editing", desktop: 65 },
  { skill: "Adobe CC", desktop: 70 },
  { skill: "Figma", desktop: 90 },
]

const chartDataUXR = [
  { skill: "User Testing", desktop: 75 },
  { skill: "Quantitative", desktop: 40 },
  { skill: "User Interviews", desktop: 70 },
  { skill: "Workshops", desktop: 50 },
  { skill: "Research Repositories", desktop: 80 },
]

const chartDataWeb = [
  { skill: "Git Control", desktop: 60 },
  { skill: "HTML / CSS", desktop: 80 },
  { skill: "NextJS", desktop: 55 },
  { skill: "React", desktop: 60 },
  { skill: "Storybook", desktop: 70 },
]

const chartConfig = {
  desktop: {
    label: "Experience",
    color: "#2563eb",
  },
  mobile: {
    label: "Experience",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function Skills() {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, margin: "-50px" }); // triggers a bit before fully in view

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="w-full p-8 bg-secondary/30 flex flex-col justify-start items-start gap-8 z-1"
    >
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-1">Skills</h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Browse my skills and interests below or
        </p>
        <div className="p-2 text-center flex justify-center gap-6">
          <Button variant="outline" asChild>
            <a href="/Mark Portfolio 2025.pdf" download>
            <Download /> Download Creative CV 
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://docs.google.com/document/d/1hY2eimrfBXPZvMn7wiH7GWhtx0SwIX0UlYEzqLlFnaY/edit?usp=sharing" target="_blank" download>
            <FileText /> View Written CV Online <ExternalLink />
            </a>
          </Button>
        </div>

        <Tabs defaultValue="research" className="w-full">
          {/* Tabs List */}
          <TabsList className="w-full flex justify-evenly border-gray-200 h-12">
            <TabsTrigger value="research" className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              UX Research
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette size={16} className="text-gray-500" />
              UX/UI Design
            </TabsTrigger>
            <TabsTrigger value="dev" className="flex items-center gap-2">
              <MonitorSmartphone size={16} className="text-gray-500" />
              Web Design
            </TabsTrigger>
          </TabsList>

          <div className="pt-4 pb-4">
            {/* Research Tab */}
            <TabsContent value="research">
              <div className="flex flex-wrap md:flex-nowrap md:gap-6 gap-4">
                {/* Left Card */}
                <Card className="flex-1 h-fit">
                  <CardHeader>
                    <CardTitle>UX Research</CardTitle>
                    <CardDescription>
                      The core of the design work.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div
                      data-type="Text"
                      className="self-stretch inline-flex justify-center items-center gap-2"
                    >
                      <p className="flex-1 justify-center text-base-card-foreground text-sm font-normal leading-tight">
                        Througout my career I have been able to appreciate the value of good planning and the ROI from listening to 
                        the customer. There is a great value in conducting research, as it give us a view of a customer beyond a 
                        moment in time. Assumptions are challenged and both time and money can be saved, giving both the user and 
                        others involved a great sense of teamwork.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ChartContainer
                      config={chartConfig}
                      className="min-h-[200px] w-full"
                    >
                      <RadarChart data={chartDataUXR}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarGrid />
                        <Radar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          fillOpacity={0.6}
                        />
                    </RadarChart>
                    </ChartContainer>
                  </CardFooter>
                </Card>

                {/* Right Research Placeholder */}
                <div className="flex justify-center items-center text-center h-fit flex-1 rounded-4xl p-4 pt-2 md:pt-36 min-w-[300px] overflow-hidden">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 92 60"
                    className="w-fit h-auto max-w-xl md:max-w-s p-12 text-primary max-[299px]:hidden"
                  >
                    <motion.path
                      d="M33 39H30C28.3431 39 27 40.3431 27 42V55C27 56.6569 28.3431 58 30 58H40C41.6569 58 43 56.6569 43 55V42C43 40.3431 41.6569 39 40 39H37M55 41H59M31 43H39M31 48H39M31 52H39M48.5 23C49.5 23.5 50.5 24.5 52.5 23M39.5 17.7922C40.2529 17.4158 41.0058 16.7559 42.1856 17.093M24 42H10C5.02944 42 1 46.0294 1 51V57H24M67 42H81C85.9706 42 90 46.0294 90 51V57H67M37 43V38C37 37.4477 36.5523 37 36 37H34C33.4477 37 33 37.4477 33 38V43M41.5 23C37.3579 23 34 19.6421 34 15.5C34 11.3579 37.3579 8 41.5 8C44.1716 8 46.5169 9.39683 47.8454 11.5M53 58H61C62.6569 58 64 56.6569 64 55V41C64 39.3431 62.6569 38 61 38H53C51.3431 38 50 39.3431 50 41V55C50 56.6569 51.3431 58 53 58ZM84 30C84 34.4183 80.4183 38 76 38C71.5817 38 68 34.4183 68 30C68 25.5817 71.5817 22 76 22C80.4183 22 84 25.5817 84 30ZM7 30C7 34.4183 10.5817 38 15 38C19.4183 38 23 34.4183 23 30C23 25.5817 19.4183 22 15 22C10.5817 22 7 25.5817 7 30ZM62.8532 35.6641C59.2901 35.3983 53.8919 33.2218 50.6616 32.058C50.5536 32.0191 50.4413 32 50.3266 32L46.5 32C36.2827 32 28 25.0604 28 16.5C28 7.93959 36.2827 1 46.5 1C56.7173 1 65 7.93959 65 16.5C65 21.0228 62.6879 25.1664 59 27.9999C58.5784 29.8683 60.9335 32.4443 63.233 34.251C63.9037 34.778 63.7038 35.7276 62.8532 35.6641ZM58 20.5C58 24.6421 54.6421 28 50.5 28C46.3579 28 43 24.6421 43 20.5C43 16.3579 46.3579 13 50.5 13C54.6421 13 58 16.3579 58 20.5ZM53 19.5C53 19.2239 52.7761 19 52.5 19C52.2239 19 52 19.2239 52 19.5C52 19.7761 52.2239 20 52.5 20C52.7761 20 53 19.7761 53 19.5ZM44 13.5C44 13.2239 43.7761 13 43.5 13C43.2239 13 43 13.2239 43 13.5C43 13.7761 43.2239 14 43.5 14C43.7761 14 44 13.7761 44 13.5ZM49 19.5C49 19.2239 48.7761 19 48.5 19C48.2239 19 48 19.2239 48 19.5C48 19.7761 48.2239 20 48.5 20C48.7761 20 49 19.7761 49 19.5ZM40 13.5C40 13.2239 39.7761 13 39.5 13C39.2239 13 39 13.2239 39 13.5C39 13.7761 39.2239 14 39.5 14C39.7761 14 40 13.7761 40 13.5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.svg>
                </div>
                
              </div>
            </TabsContent>

            {/* Design Tab */}
            <TabsContent value="design">
              <div className="flex flex-wrap md:flex-nowrap md:gap-6 gap-4">
                {/* Left Card */}
                <Card className="flex-1 h-fit">
                  <CardHeader>
                    <CardTitle>UX / UI Design</CardTitle>
                    <CardDescription>
                      Built up from UXR and with a core set of standards and
                      consistency via Design Systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div
                      data-type="Text"
                      className="self-stretch inline-flex justify-center items-center gap-2"
                    >
                      <p className="flex-1 justify-center text-base-card-foreground text-sm font-normal leading-tight">
                        UI Design blends standards, aesthetics and usability to create an experience that engages users.
                        A success UI design hinges on a good design system, which allows for conistency and is informed by
                        regular user research. I have worked with various design tools, now mostly Figma and Miro to make the
                        mockup creation projects more efficient and collaborative. I also have experience in video editing and
                        some graphic design experience with Adobe CC.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ChartContainer
                      config={chartConfig}
                      className="min-h-[200px] w-full"
                    >
                      <RadarChart data={chartDataUI}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarGrid />
                        <Radar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          fillOpacity={0.6}
                        />
                    </RadarChart>
                    </ChartContainer>
                  </CardFooter>
                </Card>

                {/* Right Design Placeholder */}
                <div className="flex justify-center items-center text-center h-fit flex-1 rounded-lg p-4 pt-2 md:pt-24 min-w-[300px] overflow-hidden">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 135 140"
                    className="w-fit h-auto max-w-xl md:max-w-s p-12 ml-12 text-primary max-[299px]:hidden"
                  >
                    <motion.path
                      d="M7.5 42.5L55 26M55 26L102.5 9.5M55 26L102.5 42.5M55 26L7.5 9.5M8.17708 103.721L25 94.5M25 94.5L41.8229 85.2794M25 94.5L41.8229 103.721M25 94.5L8.17708 85.2794M103 51.5H8M103 59.5H8M103 67.5H8M42 108.5H8M42 113.5H8M42 118.5H8M42 123.5H8M1 1H109V139H1V1ZM7 9H103V43H7V9ZM8 85H42V104H8V85ZM70.5 108L88.5 128C89.1667 128.333 90.4 128.6 90 127C89.6 125.4 85.5 109.333 83.5 101.5C80.1667 100.833 72.9 101.2 70.5 108ZM68.076 99.7584C70.1865 100.276 75.0407 100.302 77.5733 96.263C80.106 92.2239 70.7141 85.9062 66.4931 85C65.5697 87.8481 65.8599 97.5835 68.076 99.7584Z" // Replace this path with your actual SVG path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} // { pathLength: [0, 1, 0] } : { pathLength: 0 }}
                      transition={{
                        duration: 5, // total duration for one draw+erase
                        ease: "easeInOut",
                      }}
                    />
                  </motion.svg>
                </div>
              </div>
            </TabsContent>

            {/* Web Dev Tab */}
            <TabsContent value="dev">
              <div className="flex flex-wrap md:flex-nowrap md:gap-6 gap-4">
                {/* Left Card */}
                <Card className="flex-1 h-fit">
                  <CardHeader>
                    <CardTitle>Web Design / Development</CardTitle>
                    <CardDescription>
                      Understanding some of the technical limitations that compliment UXR
                      and UI Design
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div
                      data-type="Text"
                      className="self-stretch inline-flex justify-center items-center gap-2"
                    >
                      <p className="flex-1 justify-center text-base-card-foreground text-sm font-normal leading-tight">
                        Over the last few years I have gathered good experience in collaborating with developers and understanding the technical 
                        limitations of web design.
                        I have worked with various web technologies, including HTML, CSS, JavaScript, and frameworks like Next.js and React. 
                        Most recently I have been working with Storybook to document our UI component library by working with the Product Teams and
                        have learned the value of Tokenization in creating a consistent design system.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ChartContainer
                      config={chartConfig}
                      className="min-h-[200px] w-full"
                    >
                      <RadarChart data={chartDataWeb}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarGrid />
                        <Radar
                          dataKey="desktop"
                          fill="var(--color-desktop)"
                          fillOpacity={0.6}
                        />
                    </RadarChart>
                    </ChartContainer>
                  </CardFooter>
                </Card>

                {/* Right Dev Placeholder */}
                <div className="flex justify-center items-center text-center h-full flex-1 rounded-lg p-4 pt-16 md:pt-56 min-w-[300px] overflow-hidden">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 92 60"
                    className="w-fit h-auto max-w-xl md:max-w-s text-primary m-auto max-[299px]:hidden"
                  >
                    <motion.path
                      d="M67 17H81M67 17V33M67 17V22H81V17M81 17V33M81 33H67M81 33V29H67V33M81 33C81 34.6569 79.6569 36 78 36H70C68.3431 36 67 34.6569 67 33M81 33V15C81 13.3431 79.6569 12 78 12H70C68.3431 12 67 13.3431 67 15V33M36 29H51M36 29V30H51V29M36 29V28M51 29V28M13 30H33M13 30V31H33V30M13 30V29M33 30V29M33 29H13M33 29V28M13 29V28M33 28H13M33 28V27M13 28V27M33 27H13M33 27V26M13 27V26M33 26H13M33 26V25H13V26M36 28H51M36 28V27M51 28V27M36 27H51M36 27V26M51 27V26M36 26H51M36 26V25H51V26M67 20H81M67 20V21H81V20M67 20V19M81 20V19M67 19H81M67 19V18H81V19M81 31V30H67V31M81 31H67M81 31V32H67V31M4 14H62M4 14V15H62V14M4 14V13H62V14M4 11H62M4 11V12H62V11M4 11V10H62V11M19 19H46M24 21.5H41M70 24H78M71.4815 27H76.5185M72 15H76M4 37H62C63.6569 37 65 35.6569 65 34V4C65 2.34315 63.6569 1 62 1H4C2.34315 1 1 2.34315 1 4V34C1 35.6569 2.34315 37 4 37ZM21.5 42H43.5C43.7761 42 44 41.7761 44 41.5C44 41.2239 43.7761 41 43.5 41H21.5C21.2239 41 21 41.2239 21 41.5C21 41.7761 21.2239 42 21.5 42ZM4 4H62V34H4V4ZM4 7H62V16H4V7ZM13 24H34V34H13V24ZM25 37H41V41H25V37ZM36 24H51V31H36V24ZM36 33H51V34H36V33ZM13 32H33V33H13V32ZM4 8H62V9H4V8Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      // Fade-in wipe from top using a vertical clipPath
                      initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
                      animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.svg>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}