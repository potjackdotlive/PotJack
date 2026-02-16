import { Breakpoint, Grid } from "antd";

export const useMediaQueryMatches = () => {
  const breakpoints = Grid.useBreakpoint();
  return {
    ...breakpoints,
    ...("xs" in breakpoints && { xs: true }),
  } as Record<Breakpoint, boolean>;
};
