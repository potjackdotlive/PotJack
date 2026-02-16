import Button from "@/components/button";
import classes from "./styles/ready-to-play.module.scss";

function ReadyToPlay() {
  return (
    <section className={classes.root}>
      <div className={classes.details}>
        <h2 className={classes.title}>
          Your Fairest Chance to Win Big is Here. <br /> Are You Ready to Verify
          Your Luck?
        </h2>
        <p className={classes.description}>
          Join a global community playing a lottery that&apos;s transparent,
          decentralized, and puts you first. This is your game, on your terms
        </p>
      </div>
      <div className={classes.buttons}>
        <Button
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_LOTTERY_PLAY_URL}`}
        >
          Verify Your Entry
        </Button>
        <Button variant="tertiary" className={classes.communityBtn}>
          Become Part of the Proof of Luck Community
        </Button>
      </div>
    </section>
  );
}

export default ReadyToPlay;
