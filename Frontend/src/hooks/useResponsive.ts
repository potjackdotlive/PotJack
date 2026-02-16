import { Breakpoint, Grid } from "antd";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";

export type ResponsiveValues<ValueT> = Partial<Record<Breakpoint, ValueT>>;

export const useResponsive = () => {
  const breakpoints = Grid.useBreakpoint();
  const matches = useMediaQueryMatches();

  return <P, DefaultT = undefined>(responsiveValues: ResponsiveValues<P>, defaultValue?: DefaultT) => {
    const match = (Object.keys(breakpoints) as Breakpoint[])
      .reverse()
      .find((bp) => matches[bp] && responsiveValues[bp] != null);

    return match ? responsiveValues[match] : defaultValue;
  };
};
