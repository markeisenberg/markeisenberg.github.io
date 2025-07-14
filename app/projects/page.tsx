"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // shadcn Button
import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import { compareDesc } from 'date-fns';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const Featured = () => {
  // Filter posts where "featured" is true and sort by most recent date
  const Posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))); // Sort by date in descending order

  return (
      
    <div className="container mx-auto py-8">
        <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink aria-current="page">All Projects</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
      <h1 className="text-3xl font-bold text-center mb-8">All Projects</h1>

      {/* Display a message if no posts are available */}
      {Posts.length === 0 ? (
        <p className="text-center text-gray-500">No  projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Posts.map((post) => (
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
    
  );
};

export default Featured;