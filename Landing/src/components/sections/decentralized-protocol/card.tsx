import classes from "./styles/card.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { ProtocolCardType } from "@/components/sections/decentralized-protocol/utils";

type Props = {
  card: ProtocolCardType;
  index: number;
};

function Card({ card, index }: Props) {
  const { imageUrl, title, subtitle, description } = card;

  return (
    <div className={clsx(index === 1 && classes.rootWrapper)}>
      <div className={classes.root}>
        <div className={classes.detailsWrapper}>
          <Image
            width={128}
            height={128}
            src={imageUrl}
            alt={subtitle}
            className={classes.image}
          />
          <div className={classes.details}>
            <h5 className={classes.title}>{title}</h5>
            <p className={classes.subtitle}>{subtitle}</p>
          </div>
        </div>
        <div className={classes.descriptionWrapper}>
          <p className={classes.description}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
