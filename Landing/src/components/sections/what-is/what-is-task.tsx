import clsx from "clsx";
import classes from "./styles/what-is-task.module.scss";
import { WhatIsTaskProps } from "@/components/sections/what-is/types";

function WhatIsTask({ task }: WhatIsTaskProps) {
  const { icon: Icon, name, className } = task;

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.iconWrapper}>
        <Icon />
      </div>
      {name}
    </div>
  );
}

export default WhatIsTask;
