import Image from "next/image";
import classes from "./project-screenshot.module.scss";
import React from "react";
import VideoWrapper from "@/components/video-wrapper";

function ProjectScreenshot() {
  return (
    <section className={classes.root}>
      <Image
        src="/project-dashboard.png"
        width={1224}
        height={698}
        alt="project-screenshot"
        className={classes.screenshot}
      />
      <div className={classes.videoWrapper}>
        <VideoWrapper
          posterSrc={"/posters/coins.jpg"}
          videoSrc={"/videos/coins.mp4"}
          className={classes.video}
        />
      </div>
    </section>
  );
}

export default ProjectScreenshot;
