import classes from "./styles/advantage-category-item.module.scss";
import { AdvantageCategoryItemProps } from "@/components/sections/advantage-section/types";

function AdvantageCategoryItem({ item }: AdvantageCategoryItemProps) {
  const { Icon, title, description } = item;

  return (
    <div className={classes.root}>
      <Icon />
      <div className={classes.details}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

export default AdvantageCategoryItem;
