import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations";

interface CTAProps {
  headline: string;
  body: string;
  imageLeft: string;
  imageRight: string;
  imageLeftAlt: string;
  imageRightAlt: string;
  bookingUrl: string;
}

export function CTA({
  headline,
  body,
  imageLeft,
  imageRight,
  imageLeftAlt,
  imageRightAlt,
  bookingUrl,
}: CTAProps) {
  const lines = headline.split("\n");

  return (
    <section className="bg-blush-100 py-8 md:py-12 lg:py-16 overflow-x-clip">
      <div className="container-base">
        <div className="flex flex-row items-center gap-[50px]">
          {/* Left image — sweeps in from the left */}
          <FadeIn direction="right" distance={80} amount={0.4} className="hidden lg:block shrink-0 -rotate-12 relative rounded-[20px] overflow-hidden" style={{ width: 250, height: 350 }}>
            <Image
              src={imageLeft}
              alt={imageLeftAlt}
              fill
              sizes="250px"
              className="object-cover"
            />
          </FadeIn>

          {/* Centre text — fades up from bottom */}
          <FadeIn distance={80} delay={0.2} amount={0.4} className="flex-1 flex flex-col items-center gap-[30px] text-center">
            <h2
              className="font-normal leading-[1.2] text-charcoal-900 text-[28px] md:text-[38px] lg:text-[48px] tracking-tight"
            >
              {lines.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-base font-light max-w-2xl text-charcoal-600 leading-relaxed">
              {body}
            </p>
            <Button href={bookingUrl} variant="primary" size="md" external>
              Book A Call
            </Button>
          </FadeIn>

          {/* Right image — sweeps in from the right */}
          <FadeIn direction="left" distance={80} amount={0.4} className="hidden lg:block rotate-12 shrink-0 relative rounded-[20px] overflow-hidden" style={{ width: 250, height: 350 }}>
            <Image
              src={imageRight}
              alt={imageRightAlt}
              fill
              sizes="250px"
              className="object-cover"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
