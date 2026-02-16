import classes from "./section-header.module.scss";
import Tagline from "@/components/tagline";
import { SectionHeaderProps } from "@/components/section-header/types";
import clsx from "clsx";

function SectionHeader({
  tagline,
  title,
  description,
  rootClasses,
}: SectionHeaderProps) {
  return (
    <div className={clsx(rootClasses && rootClasses, classes.root)}>
      {tagline && <Tagline>{tagline}</Tagline>}
      <h2 className={classes.title}>{title}</h2>
      {description && <p className={classes.description}>{description}</p>}
    </div>
  );
}

export default SectionHeader;
