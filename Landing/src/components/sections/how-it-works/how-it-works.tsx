import classes from "./styles/how-it-works.module.scss";
import SectionHeader from "@/components/section-header/section-header";
import HowItWorksCards from "@/components/sections/how-it-works/how-it-works-cards";
import ChainTagList from "@/components/sections/how-it-works/chain-tag-list";
import Explore from "@/components/sections/how-it-works/explore";

function HowItWorks() {
  return (
    <section id="how-it-works" className={classes.root}>
      <SectionHeader
        tagline="how it work"
        title="How Consensus Creates Trust."
        description="Proof of Luck matches the shift in crypto: full transparency, full control. Built for users, run by protocol."
        rootClasses={classes.header}
      />
      <div className={classes.content}>
        <HowItWorksCards />
        <ChainTagList />
        <Explore />
      </div>
      <div className={classes.connector}></div>
    </section>
  );
}

export default HowItWorks;
