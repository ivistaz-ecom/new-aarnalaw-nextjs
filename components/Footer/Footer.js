import React from "react";
import Image from "next/image";
import Link from "next/link";
import { spotify, linkedIn } from "../../utils/icons";
import { legalLinks } from "../../utils/data";
import ContactModal from "@/components/ModalContact/page";

export default function Footer() {
  return (
    <div className="pt-12">
      <div className="bg-custom-blue">
        <div className="mx-auto grid w-11/12 grid-cols-2">
          <div className="pt-4">
            <Image
              src="/logo/logo-white.svg"
              width={400}
              height={200}
              className="h-10 w-60"
              alt="Logo"
            />
            <div className="flex gap-8 py-4">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-xl text-white"
              >
                {linkedIn} LinkedIn
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-xl text-white"
              >
                {spotify} Spotify
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <ContactModal
              btnName="Subscribe to newsletter"
              textColor="text-white"
              modalTitle="Subscribe to newsletter"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#091F48] py-5 text-center text-white md:px-20">
        <div className="flex items-center justify-center gap-2 text-white">
          {legalLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <Link href={link.href} className="hover:underline">
                {link.name}
              </Link>
              {index < legalLinks.length - 1 && (
                <span className="mx-2">|</span> // Add separator except for the last item
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-2 text-white">
          © 2024 Aarna Law. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
