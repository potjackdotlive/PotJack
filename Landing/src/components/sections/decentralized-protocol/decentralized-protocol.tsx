import SectionHeader from "@/components/section-header/section-header";
import classes from "./styles/decentralized-protocol.module.scss";
import Button from "@/components/button";
import GithubLogoIcon from "@/components/icons/github-logo-icon";
import CardList from "@/components/sections/decentralized-protocol/card-list";

function DecentralizedProtocol() {
  return (
    <section className={classes.root} id="power-verifiers">
      <SectionHeader
        tagline="decentralized protocol"
        title="Decentralized. Always On. Fully Transparent."
        description="Proof of Luck’s core isn’t a website—it’s a decentralized system. Rules, funds, and fairness are enforced by smart contracts. No gatekeepers, no off-switch."
        rootClasses={classes.header}
      />
      <CardList />
      <Button
        className={classes.exploreButton}
        startAdornment={<GithubLogoIcon />}
      >
        Explore the Code
      </Button>
    </section>
  );
}

export default DecentralizedProtocol;
