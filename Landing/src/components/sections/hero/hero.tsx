import React from "react";
import classes from "./hero.module.scss";
import { avatarList } from "@/components/sections/hero/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/button";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import VideoWrapper from "@/components/video-wrapper";

function Hero() {
  return (
    <section className={classes.root}>
      <div className={classes.videoWrapper}>
        <VideoWrapper
          posterSrc={"/posters/tickets.jpg"}
          videoSrc={"/videos/tickets.mp4"}
          className={classes.video}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.texts}>
          <h1 className={classes.title}>Proof of Luck</h1>
          <p className={classes.description}>
            Proof of Luck is a decentralized protocol that provides on-chain
            proof you can trust, where every outcome is transparent, verifiable,
            and fair.
            <br /> Verify, Don&apos;t Hope!
          </p>
        </div>
        <div className={classes.users}>
          <div className={classes.avatars}>
            {avatarList.map((avatar, index) => (
              <Avatar key={index} className={classes.avatar}>
                <AvatarImage src={avatar} />
              </Avatar>
            ))}
          </div>
          <span className={classes.usersCount}>Over 1k happy wallets</span>
        </div>
        <div className={classes.actions}>
          <Button
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_LOTTERY_PLAY_URL}`}
          >
            Verify Your Entry
          </Button>
          <Button variant="tertiary" endAdornment={<ArrowRightIcon />}>
            Discover the Protocol
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
