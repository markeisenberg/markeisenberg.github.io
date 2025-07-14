import Mdx from '@/components/mdx-components';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Define the props for the page
interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Next.js generates these inside `params`
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

// Use the props in the dynamic route
export default async function PostPage({ params }: PostPageProps) {
  // Await the params object
  const { slug } = await params;

  // Find the corresponding post using the slug
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  // If no valid post is found, trigger a 404
  if (!post?.body.code) {
    notFound();
  }

  return (
    <article className="py-8 mx-auto max-w-xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">All Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink aria-current="page">{post.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-8 text-left">
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>
      <Mdx code={post.body.code} />
    </article>
  );
}