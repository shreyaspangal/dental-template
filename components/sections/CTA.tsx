import Image from "next/image";
import { Button } from "@/components/ui/Button";

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
    <section className="bg-blush-100 py-30">
      <div className="container-base">
        <div className="flex flex-row items-center gap-[50px]">
          {/* Left image */}
          <div className="hidden lg:block shrink-0 -rotate-12 relative rounded-[20px] overflow-hidden" style={{ width: 250, height: 350 }}>
            <Image
              src={imageLeft}
              alt={imageLeftAlt}
              fill
              sizes="250px"
              className="object-cover"
            />
          </div>

          {/* Centre text */}
          <div className="flex-1 flex flex-col items-center gap-[30px] text-center">
            <h2
              className="font-normal leading-[1.2] text-charcoal-900"
              style={{ fontSize: 48, letterSpacing: "-0.025em" }}
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
          </div>

          {/* Right image */}
          <div className="hidden lg:block rotate-12 shrink-0 relative rounded-[20px] overflow-hidden" style={{ width: 250, height: 350 }}>
            <Image
              src={imageRight}
              alt={imageRightAlt}
              fill
              sizes="250px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
