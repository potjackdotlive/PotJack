import { JSX } from "react";

export type WhatIsCardTaskType = {
  icon: () => JSX.Element;
  name: string;
  className?: string;
};

export type WhatIsCardType = {
  icon: () => JSX.Element;
  tag: string;
  title: string;
  description: string;
  reverse?: boolean;
  imageUrl: string;
  tasks: WhatIsCardTaskType[];
};

export type WhatIsCardProps = {
  card: WhatIsCardType;
};

export type WhatIsTaskProps = {
  task: WhatIsCardTaskType;
};
