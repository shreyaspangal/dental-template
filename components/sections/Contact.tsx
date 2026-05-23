"use client";

import { useState, type FormEvent } from "react";
import type { ContactInfo, BusinessHour } from "@/lib/types";

interface ContactProps {
  info: ContactInfo;
  hours: BusinessHour[];
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 bg-cream rounded-[20px] p-[30px] flex flex-col gap-[10px]">
      <p className="font-normal text-charcoal-900" style={{ fontSize: 30 }}>
        {label}
      </p>
      <p className="text-base font-light text-charcoal-400">{value}</p>
    </div>
  );
}

function HoursPanel({ hours }: { hours: BusinessHour[] }) {
  return (
    <div className="flex-1 bg-cream rounded-[20px] p-[30px] flex flex-col gap-[30px]">
      {/* Title */}
      <div className="flex flex-col gap-[10px]">
        <p className="font-normal text-charcoal-900" style={{ fontSize: 30 }}>
          Business Hours
        </p>
        <p className="text-base font-light text-charcoal-400">
          Book your Appointment Today
        </p>
      </div>

      {/* Days */}
      <div className="flex flex-col">
        {hours.map((h, i) => (
          <div
            key={h.day}
            className={`flex items-center justify-between py-[20px] ${
              i === 0 ? "pt-0" : ""
            } ${i === hours.length - 1 ? "pb-0" : "border-b border-blush-100"}`}
          >
            <div className="flex items-center gap-[10px]">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  h.isOpen ? "bg-blush-300" : "bg-charcoal-200"
                }`}
              />
              <span className="text-base font-light text-charcoal-900">
                {h.day}
              </span>
            </div>
            <span
              className={`text-base font-light ${
                h.isOpen ? "text-charcoal-400" : "text-charcoal-200"
              }`}
            >
              {h.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormPanel() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  }

  if (status === "sent") {
    return (
      <div className="flex-1 bg-cream rounded-[20px] p-[30px] flex flex-col items-center justify-center gap-[10px]">
        <p className="font-normal text-charcoal-900 text-center" style={{ fontSize: 30 }}>
          Message sent!
        </p>
        <p className="text-base font-light text-charcoal-400 text-center">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          className="mt-[10px] text-base font-light text-charcoal-400 underline underline-offset-2"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  const inputWrapperCls =
    "rounded-[10px] p-[16px] border border-blush-100 bg-cream flex items-center";
  const inputCls =
    "w-full bg-transparent text-base font-light text-charcoal-900 placeholder:text-charcoal-300 outline-none";

  return (
    <div className="flex-1 bg-cream rounded-[20px] p-[30px] flex flex-col gap-[30px]">
      {/* Title */}
      <div className="flex flex-col gap-[10px]">
        <p className="font-normal text-charcoal-900" style={{ fontSize: 30 }}>
          Let&apos;s Talk With Us
        </p>
        <p className="text-base font-light text-charcoal-400">
          Fill out the form — we&apos;ll get back to you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <label className="flex flex-col gap-[5px]">
          <span className="text-base font-light text-charcoal-900">Name</span>
          <div className={inputWrapperCls}>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter Your Name"
              className={inputCls}
            />
          </div>
        </label>

        <label className="flex flex-col gap-[5px]">
          <span className="text-base font-light text-charcoal-900">Email</span>
          <div className={inputWrapperCls}>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter Your Email"
              className={inputCls}
            />
          </div>
        </label>

        <label className="flex flex-col gap-[5px]">
          <span className="text-base font-light text-charcoal-900">Message</span>
          <div className="rounded-[10px] p-[16px] border border-blush-100 bg-cream">
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Enter a description..."
              className={`${inputCls} resize-none`}
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full h-[50px] bg-charcoal-900 text-cream rounded-[100px] text-base font-light cursor-pointer disabled:opacity-60 transition-opacity"
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export function Contact({ info, hours }: ContactProps) {
  return (
    <section id="contact" className="py-30">
      <div className="container-base">
        <div className="bg-blush-100 rounded-[30px] p-[10px] flex flex-col gap-[10px]">
          {/* Row 1: Contact info cards */}
          <div className="flex flex-col lg:flex-row gap-[10px]">
            <InfoCard label="Email" value={info.email} />
            <InfoCard label="Phone" value={info.phone} />
            <InfoCard label="Address" value={info.address} />
          </div>

          {/* Row 2: Business hours + Form */}
          <div className="flex flex-col lg:flex-row gap-[10px]">
            <HoursPanel hours={hours} />
            <FormPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
