import { createContext, useContext } from "react";
import { noop } from "utils/noop";
import { Nullable } from "utils/types";

export type HighlightContextProps = {
  highlightedItem: Nullable<string>;
  setHighlightedItem: (roundEndTime: Nullable<string>) => void;
};

const defaultValues: HighlightContextProps = {
  highlightedItem: null,
  setHighlightedItem: noop,
};

const highlightContextUtils = createContext<HighlightContextProps>(defaultValues);
export const useHighlightContext = () => useContext<HighlightContextProps>(highlightContextUtils);
export const HighlightContextProvider = highlightContextUtils.Provider;
