import React from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import type CoreSwiper from "swiper";
import Image from "next/image";

import { useMediaQuery } from "react-responsive";
import { MainPageType } from "../../common/utils/mainPages";

const PageList: { name: string; path: string }[] = [
  {
    name: "about me",
    path: "/",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "portfolio",
    path: "/portfolio",
  },
];

type Props = {
  swiperGeneralProps: SwiperProps;
  pageType: MainPageType;
  setTabSwiper: React.Dispatch<React.SetStateAction<CoreSwiper | undefined>>;
  moveSlide: (isNext: boolean, isPrev: boolean) => void;
};

export const Header: React.FC<Props> = ({
  swiperGeneralProps,
  pageType,
  setTabSwiper,
  moveSlide,
}) => {
  const isWindowMd = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <header className="pt-6 text-center sm:px-4 sm:pb-1 md:p-8">
      <Image
        src="/profile_icon.png"
        width={isWindowMd ? 160 : 140}
        height={isWindowMd ? 160 : 140}
        alt="Ichigo Sora"
      />
      <h1 className="mt-3.5 text-2xl font-light leading-snug">Sora Ichigo</h1>
      <p className="mb-2 inline-block rounded  bg-yellow-marker px-2.5 py-1.5 italic leading-none">
        software engineer
      </p>
      <SwiperPart
        swiperGeneralProps={swiperGeneralProps}
        pageType={pageType}
        setTabSwiper={setTabSwiper}
        moveSlide={moveSlide}
      />
    </header>
  );
};

const SwiperPart: React.FC<Props> = ({
  swiperGeneralProps,
  pageType,
  setTabSwiper,
  moveSlide,
}) => {
  const router = useRouter();

  return (
    <Swiper
      {...swiperGeneralProps}
      initialSlide={pageType}
      onInit={(swiper: CoreSwiper) => setTabSwiper(swiper)}
      allowTouchMove={false}
      className="mx-auto flex h-24 max-w-5xl items-center text-xl sm:text-3xl md:text-4xl lg:text-4-5xl "
    >
      {PageList.map((v, i) => (
        <SwiperSlide
          key={i}
          className="w-2/6 font-tabTitle font-bold"
          onClick={() =>
            router.push(v.path, undefined, {
              shallow: true,
            })
          }
        >
          {({ isActive, isNext, isPrev }) => (
            <span
              className={isActive ? "text-navy" : "cursor-pointer text-grey-4"}
              onClick={() => moveSlide(isNext, isPrev)}
            >
              {v.name}
            </span>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
