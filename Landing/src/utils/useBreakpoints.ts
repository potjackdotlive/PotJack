import { useMediaQuery } from "react-responsive";

export const useBreakpoints = () => {
  const sm = useMediaQuery({ query: "(max-width: 768px)" });

  const md = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const lg = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  return {
    sm,
    md,
    lg,
  };
};
