import classes from "./styles/chain-tag-list.module.scss";
import { chainTagList } from "@/components/sections/how-it-works/utils";
import ChainTag from "@/components/sections/how-it-works/chain-tag";

function ChainTagList() {
  return (
    <div className={classes.root}>
      {chainTagList.map((tag) => (
        <ChainTag key={tag.token} tag={tag} />
      ))}
    </div>
  );
}

export default ChainTagList;
