"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const GRAIN_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDxmfjsHefubMnprZhvrCAighoyOmku_7bduoqO8RXGH8oC2TneRineYjnq-Df9mmfNjvV4LTcs2lOi70Y1wL-Gl3Fgyci1ElNdZUa6Sj5kMs7jkpkejdcYVNfGj4BPmCAPc3WAVCqhREdYMtxbpBB8ldLtzgMpZF4ufpiMHZriNoGB9rl4Gtpz2MYQoVChwOK1YIsAy-TcvIxdgdxzZKXeUBir-PNx5o3OaqlG1uQnHRVg_M8HaB8oSyWV9nLbTxtQmk-kXgFX1X2v";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBeeOgIEcSOvgIAQAKIj8DoMZUHQaq5YJYWWFIuGirFGKSjr9XHTzYiNPT1ZJBBjSgOtxqltgj9WRkLfy0jXZTjNcGp1epgzf_its1rja7SMPNdjwrEEZwDAFO57gBKB4D3y3ApFFmCvl1MnJLwQXtCpW-fw8Sih0B7P9PrSvi9Z4uHFaZGbmXB-KGxcrd-3PMtzuj8JmHK-bq4tlutQzyfeC6qMqCnEKMl-6TyyoU3cKcn3je0AJVrsaBRieRorqcGbmijQWMQnKI_";

const WORKSHOP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMi_CjqFKhoLcpfQ5IuPAgn1yTZBT_3s9Zwp0c1twVqJXtxhYDWNVL2cQZz3OTM9m7kf76Yvy3c7ffmiXPBRgQbECFgLTQylV2s9zdSvvcVyQ1st9EsI-aGmBC4MPsvuzfXBPoTOljV4ZefihLFO9H06AfuGN6-EOWQN-pn4jy9hbull_yfYRPZMGb1_b9UanG83jgfvaCY1TuJsy_O5JV0C2BSJtoWJ3tRXqGYHuX64aGLb6os5u4aIU6K6M4cO4X34v77d5TGKsj";

const PAYBILL_NUMBER = "000000";
const ACCOUNT_NAME = "RAREWOODS";

export default function PaymentsPage() {
  const [toast, setToast] = useState<string | null>(null);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast("Copied to clipboard!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main
      className="min-h-screen pt-20"
      style={{ backgroundImage: "url(" + GRAIN_BG + ")", backgroundSize: "cover" }}
    >
      <section className="py-12 md:py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-6">
            <span className="inline-block bg-mpesa-green/10 text-mpesa-green px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider">
              Secure Payment
            </span>
            <h2 className="font-headline-md text-headline-md md:text-display-lg text-primary">
              Honest Work, <br />
              <span className="text-secondary">Seamless Payments.</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-lg">
              At Rarewoods Crew, we value your trust as much as the timber we carve. Pay easily via M-Pesa for our professional woodworking services in Nairobi.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white shadow-sm border-l-4 border-mpesa-green rounded-r-xl">
              <span className="material-symbols-outlined text-mpesa-green">phone_android</span>
              <p className="font-label-md text-label-md text-primary">
                On-call service payments are instant and verified on the spot.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square rounded-full bg-oak/10 absolute -top-4 -right-4 w-64 h-64 -z-10 blur-3xl" />
            <img
              src={HERO_IMAGE}
              alt="Carpenter with M-Pesa payment"
              className="w-full h-auto rounded-2xl shadow-xl border-4 border-white object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-walnut/5">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">How to Pay</h3>
            <p className="text-body-md text-on-surface-variant">Follow these simple steps on your M-Pesa menu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-walnut/10 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-primary text-surface-cream rounded-full flex items-center justify-center font-headline-sm text-headline-sm step-number mb-6 group-hover:scale-110 transition-transform">
                1
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-4">Select Paybill</h4>
              <p className="text-body-md text-on-surface-variant mb-6">
                Open M-Pesa, select Lipa na M-Pesa, then choose Paybill.
              </p>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-dashed border-walnut/20">
                <span className="font-label-md text-label-md text-secondary">Business No.</span>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">{PAYBILL_NUMBER}</span>
                  <button
                    onClick={() => copyText(PAYBILL_NUMBER)}
                    className="p-2 hover:bg-white rounded-full transition-colors text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined">content_copy</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-walnut/10 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-primary text-surface-cream rounded-full flex items-center justify-center font-headline-sm text-headline-sm step-number mb-6 group-hover:scale-110 transition-transform">
                2
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-4">Account Name</h4>
              <p className="text-body-md text-on-surface-variant mb-6">
                Enter the following as the Account Number for your project.
              </p>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-dashed border-walnut/20">
                <span className="font-label-md text-label-md text-secondary">Account</span>
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">{ACCOUNT_NAME}</span>
                  <button
                    onClick={() => copyText(ACCOUNT_NAME)}
                    className="p-2 hover:bg-white rounded-full transition-colors text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined">content_copy</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-walnut/10 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-primary text-surface-cream rounded-full flex items-center justify-center font-headline-sm text-headline-sm step-number mb-6 group-hover:scale-110 transition-transform">
                3
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-4">Amount &amp; PIN</h4>
              <p className="text-body-md text-on-surface-variant mb-6">
                Enter the agreed quote amount and your secret M-Pesa PIN.
              </p>
              <div className="flex items-center gap-3 p-4 bg-mpesa-green/5 text-mpesa-green rounded-lg">
                <span className="material-symbols-outlined">verified_user</span>
                <span className="font-label-md text-label-md">
                  Confirm name is: <span className="font-bold">RAREWOODS CREW LTD</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter h-auto md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 bg-primary text-surface-cream rounded-2xl p-10 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
              <img
                alt="Workshop close up"
                className="w-full h-full object-cover"
                src={WORKSHOP_IMAGE}
              />
            </div>
            <div className="relative z-10">
              <h4 className="font-headline-md text-headline-md mb-4 text-oak">Our Guarantee</h4>
              <p className="text-body-lg text-surface-dim mb-6">
                Work begins only when payment is confirmed. For larger installations, a 50% deposit secures your slot in our workshop schedule.
              </p>
              <Link
                href="/quote"
                className="inline-block bg-oak text-primary px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-white transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 bg-secondary-container text-on-secondary-container rounded-2xl p-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-4xl">receipt_long</span>
              <h4 className="font-headline-sm text-headline-sm">Instant E-Receipts</h4>
            </div>
            <p className="text-body-md">
              Every M-Pesa transaction is automatically paired with a digital receipt sent to your email or WhatsApp for your records.
            </p>
          </div>
          <div className="md:col-span-1 bg-white rounded-2xl p-8 border border-walnut/10 shadow-sm flex flex-col items-center text-center justify-center gap-4">
            <div className="text-mpesa-green">
              <span className="material-symbols-outlined text-5xl">verified</span>
            </div>
            <h5 className="font-label-md text-label-md uppercase tracking-widest text-primary">Certified</h5>
            <p className="text-caption">Approved Nairobi Business Contractor</p>
          </div>
          <div className="md:col-span-1 bg-walnut text-surface-cream rounded-2xl p-8 flex flex-col items-center text-center justify-center gap-4">
            <div className="text-oak">
              <span className="material-symbols-outlined text-5xl">support_agent</span>
            </div>
            <h5 className="font-label-md text-label-md uppercase tracking-widest">Support</h5>
            <p className="text-caption text-surface-dim">24/7 Payment Assistance</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
        <div className="bg-mpesa-green/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-mpesa-green/20">
          <div className="max-w-xl">
            <h3 className="font-headline-sm text-headline-sm md:text-headline-md text-primary mb-4">
              Need help with your payment?
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Our accounts team is standing by to assist you with transaction confirmations or Paybill queries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              className="flex items-center justify-center gap-2 bg-mpesa-green text-white px-8 py-4 rounded-xl font-label-md text-label-md hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95"
              href="tel:+254700000000"
            >
              <span className="material-symbols-outlined">call</span>
              Contact Accounts
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {toast && (
        <div className="fixed bottom-8 right-8 bg-primary text-oak px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 z-[100] transition-all">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-label-md text-label-md">{toast}</span>
        </div>
      )}
    </main>
  );
}