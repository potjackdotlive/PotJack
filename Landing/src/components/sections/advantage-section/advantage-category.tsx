import classes from "./styles/advantage-category.module.scss";
import { AdvantageCategoryProps } from "@/components/sections/advantage-section/types";
import AdvantageCategoryItem from "@/components/sections/advantage-section/advantage-category-item";

function AdvantageCategory({ advantageCategory }: AdvantageCategoryProps) {
  const { title, clarification, items } = advantageCategory;

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>
        {title} <span>{clarification}</span>
      </h3>
      <div className={classes.advantages}>
        {items.map((item) => (
          <AdvantageCategoryItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

export default AdvantageCategory;
