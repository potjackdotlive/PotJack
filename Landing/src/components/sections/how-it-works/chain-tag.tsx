import classes from "./styles/chain-tag.module.scss";
import { ChainTagItemProps } from "@/components/sections/how-it-works/types";

function ChainTag({ tag }: ChainTagItemProps) {
  const { Icon, token } = tag;

  return (
    <div className={classes.root}>
      <Icon />
      <p className={classes.token}>{token}</p>
    </div>
  );
}

export default ChainTag;
