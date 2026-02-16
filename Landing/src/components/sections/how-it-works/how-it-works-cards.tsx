"use client";

import classes from "./styles/how-it-works-cards.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { useBreakpoints } from "@/utils/useBreakpoints";
import { howItWorksItems } from "@/components/sections/how-it-works/utils";
import HowItWorksCard from "@/components/sections/how-it-works/how-it-works-card";

function HowItWorksCards() {
  const { md, lg } = useBreakpoints();

  return (
    <div className={classes.root}>
      <Swiper
        grabCursor={!lg}
        autoHeight={true}
        slidesPerView={"auto"}
        spaceBetween={md ? 20 : 8}
        wrapperClass={classes.sliderWrapper}
      >
        {howItWorksItems.map((item, index) => (
          <SwiperSlide key={item.title} className={classes.slide}>
            <HowItWorksCard card={item} index={index + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HowItWorksCards;
