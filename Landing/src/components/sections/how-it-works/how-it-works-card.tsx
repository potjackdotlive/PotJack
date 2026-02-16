import classes from "./styles/how-it-works-card.module.scss";
import { HowItWorksCardProps } from "@/components/sections/how-it-works/types";

function HowItWorksCard({ card, index }: HowItWorksCardProps) {
  const { imageUrl, title, description } = card;

  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {index % 2 === 0 && <div className={classes.progressLine}></div>}
      <div className={classes.indexWrapper}>
        <span className={classes.index}>{index}</span>
      </div>
      <div className={classes.content}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

export default HowItWorksCard;
