import React from "react";
import classes from "./styles/what-is.module.scss";
import { whatIsCardList } from "@/components/sections/what-is/utils";
import WhatIsCard from "@/components/sections/what-is/what-is-card";

function WhatIs() {
  return (
    <section className={classes.root} id="what-is-proof-of-luck">
      <div className={classes.header}>
        <h2 className={classes.title}>Your Entry. Your Odds. Your Win.</h2>
        <p className={classes.description}>
          Forget manual draws and hidden rules. Proof of Luck runs on-chain.
          Every entry has the same chance. Results are verifiable. Winnings go
          straight to your wallet. No custody. No delay. You join, play, and the
          code handles the rest.
        </p>
      </div>
      <div className={classes.cardList}>
        {whatIsCardList.map((card) => (
          <WhatIsCard key={card.tag} card={card} />
        ))}
      </div>
    </section>
  );
}

export default WhatIs;
