import React from "react";

export default function Banner({ title, backgroundImage }) {
  return (
    <div className="relative h-[600px] bg-[url('/insights/InsightsMobileBanner.jpg')] bg-cover bg-center md:bg-[url('/insights/InsightsBanner.jpg')]">
      <div className="absolute bottom-0 mx-auto flex w-full items-center justify-center bg-black/50 p-2">
        <div className="mx-auto w-11/12">
          <h1
            className="lg:text-4xl font-bold tracking-wide text-white text-3xl"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h1>
        </div>
      </div>
    </div>
  );
}
