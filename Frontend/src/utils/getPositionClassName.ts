export const getPositionClassName = (position?: number | null) => {
  switch (position) {
    case 1:
      return "first";
    case 2:
      return "second";
    case 3:
      return "third";
    case 4:
      return "fourth";
    case 5:
      return "fifth";
    default:
      return "";
  }
};
