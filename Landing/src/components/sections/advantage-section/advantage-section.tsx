import classes from "./styles/advantage-section.module.scss";
import SectionHeader from "@/components/section-header/section-header";
import { advantageCategoryList } from "@/components/sections/advantage-section/utils";
import AdvantageCategory from "@/components/sections/advantage-section/advantage-category";

function AdvantageSection() {
  return (
    <section id="the-edge" className={classes.root}>
      <SectionHeader
        tagline="The Proof of Luck Advantage"
        title="More Winnings, More Control, More Transparency."
        rootClasses={classes.header}
      />
      <div className={classes.content}>
        {advantageCategoryList.map((advantageCategory) => (
          <AdvantageCategory
            key={`${advantageCategory.title}-${advantageCategory.clarification}}}`}
            advantageCategory={advantageCategory}
          />
        ))}
      </div>
    </section>
  );
}

export default AdvantageSection;
