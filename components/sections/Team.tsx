import Image from "next/image";
import { FadeIn } from "@/components/animations";
import type { TeamMember } from "@/lib/types";

interface TeamProps {
  badge: string;
  headline: string;
  members: TeamMember[];
}

const CARD_COLORS = [
  "bg-blush-100",
  "bg-mint-100",
  "bg-blush-100",
  "bg-mint-100",
  "bg-blush-100",
];

function TeamCard({ member, colorClass }: { member: TeamMember; colorClass: string }) {
  return (
    <div
      className={`shrink-0 w-[360px] h-[490px] ${colorClass} rounded-[30px] p-[10px] flex flex-col gap-[10px]`}
    >
      {/* Photo */}
      <div className="relative flex-1 rounded-[20px] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="360px"
          className="object-cover object-top"
        />
      </div>

      {/* Name area */}
      <div className="bg-cream rounded-[20px] p-[30px] flex flex-col gap-[10px]">
        <p className="font-normal text-charcoal-900" style={{ fontSize: 24 }}>
          {member.name}
        </p>
        <p className="text-base font-light text-charcoal-400">{member.role}</p>
      </div>
    </div>
  );
}

export function Team({ badge, headline, members }: TeamProps) {
  // Duplicate for seamless infinite loop
  const track = [...members, ...members];

  return (
    <section id="team" className="py-30 flex flex-col gap-[50px]">
      {/* Row 1 — 1-col centered: badge up first, headline up after */}
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
      </div>

      {/* Row 2 — marquee fades up as one unit after row 1 */}
      <FadeIn distance={80} delay={0.5} amount={0.2} className="overflow-hidden">
        <div
          className="flex gap-[10px] animate-marquee [animation-duration:35s]"
          style={{ width: "max-content" }}
        >
          {track.map((member, i) => (
            <TeamCard
              key={`${member.id}-${i}`}
              member={member}
              colorClass={CARD_COLORS[i % CARD_COLORS.length]}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
