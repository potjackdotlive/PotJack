import classes from "./styles/explore.module.scss";
import Button from "@/components/button";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";

function Explore() {
  return (
    <div className={classes.root}>
      <p className={classes.title}>See for Yourself:</p>
      <Button
        target="_blank"
        href={`${process.env.NEXT_PUBLIC_ON_CHAIN_URL}`}
        endAdornment={<ArrowRightIcon />}
        className={classes.button}
      >
        Explore On-Chain Wins
      </Button>
    </div>
  );
}

export default Explore;
