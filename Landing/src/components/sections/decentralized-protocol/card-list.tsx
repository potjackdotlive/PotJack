"use client";

import classes from "./styles/card-list.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBreakpoints } from "@/utils/useBreakpoints";
import { protocolCardItemList } from "@/components/sections/decentralized-protocol/utils";
import Card from "@/components/sections/decentralized-protocol/card";

function CardList() {
  const { lg } = useBreakpoints();

  return (
    <div className={classes.root}>
      <Swiper
        grabCursor={!lg}
        spaceBetween={16}
        slidesPerView={"auto"}
        wrapperClass={classes.sliderWrapper}
      >
        {protocolCardItemList.map((card, index) => (
          <SwiperSlide key={card.title} className={classes.slide}>
            <Card card={card} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardList;
