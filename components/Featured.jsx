"use client";

import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // shadcn Button
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';

export const Featured = () => {
  // Filter posts where "featured" is true and sort by most recent date
  const featuredPosts = allPosts
    .filter((post) => post.featured) // Only include posts where "featured" is true
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))); // Sort by date in descending order

  return (
    <section
      id="featured"
      className="w-full p-8 bg-base-background flex flex-col justify-start items-start gap-8"
    >
      
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Projects</h1>

      <div className="pb-12 text-center">
                        <Button
                        asChild
                        variant="default"
                        className=""
                        >
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                    </div>

      {/* Display a message if no posts are featured */}
      {featuredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No featured projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Card key={post._id} className="shadow-lg flex flex-col overflow-hidden pt-0 gap-2">
              <CardHeader className="p-0"> {/* Ensure there's no padding in CardHeader */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover" // Stretch the image
                  loading="lazy" // Improve performance by lazy-loading images
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                <p className="text-gray-600 mt-2">{post.summary}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  asChild
                  variant="default"
                  className="w-full text-center"
                >
                  <Link href={post.url}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
    
    </section>
  );
};