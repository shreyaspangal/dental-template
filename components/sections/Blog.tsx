import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/lib/types";

interface BlogProps {
  badge: string;
  headline: string;
  posts: BlogPost[];
  viewAllUrl?: string;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-blush-100 rounded-[30px] p-[10px] flex flex-col gap-[10px]">
      {/* Image */}
      <div className="relative rounded-[20px] overflow-hidden w-full" style={{ height: 400 }}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="bg-cream rounded-[20px] p-[30px] flex flex-col gap-[10px]">
        <h3 className="font-normal text-charcoal-900" style={{ fontSize: 24 }}>
          {post.title}
        </h3>
        <p className="text-base font-light text-charcoal-400 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
}

export function Blog({ badge, headline, posts, viewAllUrl = "/blog" }: BlogProps) {
  return (
    <section id="blog" className="py-30">
      <div className="container-base flex flex-col gap-[50px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-[30px]">
          <span className="inline-flex items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
            <span className="animate-spin-medium text-base font-semibold">✳</span>
            {badge}
          </span>
          <h2
            className="font-normal leading-[1.2] text-charcoal-900 text-center"
            style={{ fontSize: 48, letterSpacing: "-0.025em" }}
          >
            {headline}
          </h2>
        </div>

        {/* Cards + View All */}
        <div className="flex flex-col gap-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button href={viewAllUrl} variant="primary" size="md">
              View All
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
