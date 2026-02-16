import React from "react";
import Link from "next/link";
import classes from "./styles/footer.module.scss";
import LogoIcon from "@/components/icons/logo-icon";
import { footerMenuLinks, footerSocials } from "@/components/footer/utils";
import Copyright from "@/components/footer/copyright";
import VideoWrapper from "@/components/video-wrapper";

function Footer() {
  return (
    <footer>
      <div className={classes.content}>
        <LogoIcon />
        <div className={classes.texts}>
          <p className={classes.call}>Verify, Don&apos;t Hope!</p>
          <p className={classes.description}>
            This site provides an interface to interact with decentralized smart
            contracts. No personal data is stored by the interface beyond what
            is necessary for blockchain interaction. All transactions are public
            and on-chain.
          </p>
        </div>
        <div className={classes.menu}>
          {footerMenuLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              className={classes.menuItem}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className={classes.socials}>
          {footerSocials.map(({ Icon, href }, index) => (
            <Link
              key={index}
              href={href}
              target="_blank"
              className={classes.menuItem}
            >
              <Icon />
            </Link>
          ))}
        </div>
        <Copyright />
      </div>
      <div className={classes.bgVideo}>
        <div className={classes.videoWrapper}>
          <VideoWrapper
            posterSrc={"/posters/man.jpg"}
            videoSrc={"/videos/man.mp4"}
            className={classes.video}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
