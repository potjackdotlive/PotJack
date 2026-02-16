import classes from "./tagline.module.scss";
import { PropsWithChildren } from "react";

function Tagline({ children }: PropsWithChildren) {
  return <div className={classes.root}>{children}</div>;
}

export default Tagline;
