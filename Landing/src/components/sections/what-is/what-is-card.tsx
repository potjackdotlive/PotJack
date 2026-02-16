import React from "react";
import { WhatIsCardProps } from "./types";
import classes from "./styles/what-is-card.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Tagline from "@/components/tagline";
import WhatIsTask from "@/components/sections/what-is/what-is-task";

function WhatIsCard({ card }: WhatIsCardProps) {
  const {
    icon: Icon,
    tag,
    title,
    description,
    reverse,
    imageUrl,
    tasks,
  } = card;

  return (
    <div className={classes.root}>
      <div className={clsx(classes.card, reverse && classes.cardRevers)}>
        <div className={classes.details}>
          <div className={classes.iconWrapper}>
            <Icon />
          </div>
          <div className={classes.detailsContent}>
            <Tagline>{tag}</Tagline>
            <div className={classes.detailsText}>
              <h4 className={classes.title}>{title}</h4>
              <p className={classes.description}>{description}</p>
            </div>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <Image width={512} height={512} src={imageUrl} alt={tag} />
          {tasks.map((task) => (
            <WhatIsTask key={task.name} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhatIsCard;
