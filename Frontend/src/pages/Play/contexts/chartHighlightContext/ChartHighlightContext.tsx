import { FC, PropsWithChildren, useState } from "react";
import { HighlightContextProvider } from "pages/Play/contexts/chartHighlightContext/chartHighlightContextUtils";

type Props = PropsWithChildren;

export const ChartHighlightContext: FC<Props> = ({ children }) => {
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);

  return (
    <HighlightContextProvider
      value={{
        highlightedItem,
        setHighlightedItem,
      }}
    >
      {children}
    </HighlightContextProvider>
  );
};
