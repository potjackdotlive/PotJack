import { useIsExtensionInstalled } from "@phantom/react-sdk";
import { useIsMobile } from "hooks/useIsMobile";

export const useIsInPhantomApp = () => {
  const { isInstalled } = useIsExtensionInstalled();
  const isMobile = useIsMobile();

  return isInstalled && isMobile;
};
