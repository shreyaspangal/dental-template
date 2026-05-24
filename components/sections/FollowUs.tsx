import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations";
import type { InstagramPost } from "@/lib/types";

interface FollowUsProps {
  badge: string;
  headline: string;
  handle: string;
  href: string;
  posts: InstagramPost[];
}

function FollowUsCard({ post }: { post: InstagramPost }) {
  return (
    <div className="shrink-0 w-[360px] h-[520px] bg-blush-100 rounded-[30px] p-[10px]">
      <div className="relative w-full h-full rounded-[20px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="360px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function FollowUs({ badge, headline, handle, href, posts }: FollowUsProps) {
  const track = [...posts, ...posts];

  return (
    <section id="follow-us" className="py-30 flex flex-col gap-[50px]">
      {/* Row 1 — 1-col centered: badge, headline, button stagger up */}
      <div className="container-base flex flex-col items-center gap-[30px]">
        <FadeIn distance={80} amount={0.4}>
          <span className="inline-flex items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
            <span className="animate-spin-medium text-base font-semibold">✳</span>
            {badge}
          </span>
        </FadeIn>
        <FadeIn distance={80} delay={0.2} amount={0.4}>
          <h2
            className="font-normal leading-[1.2] text-charcoal-900 text-center"
            style={{ fontSize: 48, letterSpacing: "-0.025em" }}
          >
            {headline}
          </h2>
        </FadeIn>
        <FadeIn distance={80} delay={0.35} amount={0.4}>
          <Button href={href} variant="primary" size="md" external>
            {handle}
          </Button>
        </FadeIn>
      </div>

      {/* Row 2 — marquee fades up as one unit after row 1 */}
      <FadeIn distance={80} delay={0.55} amount={0.2} className="overflow-hidden">
        <div
          className="flex gap-[10px] animate-marquee [animation-duration:30s]"
          style={{ width: "max-content" }}
        >
          {track.map((post, i) => (
            <FollowUsCard key={`${post.id}-${i}`} post={post} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
