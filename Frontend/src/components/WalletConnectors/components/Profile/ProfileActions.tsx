import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { Button } from "components/Button/Button";
import { RouteButton } from "components/RouteButton/RouteButton";
import { useDisconnect } from "components/WalletConnectors/hooks/useDisconnect";
import { ROUTES } from "constants/routes";
import { commonStyles } from "styles/commonStyles";
import { TXT_DISCONNECT, TXT_VIEW_HISTORY } from "translations";

type Props = object;

export const ProfileActions: FC<Props> = () => {
  const { t } = useTranslation();
  const disconnect = useDisconnect();

  return (
    <Flex vertical gap={8} css={commonStyles.fullWidth}>
      <RouteButton title={t(TXT_VIEW_HISTORY)} route={ROUTES.RoundHistory} showArrow />
      <Button
        variant="destructive"
        ghost
        onClick={() => {
          disconnect();
          localStorage.removeItem("wagmi.store");
        }}
      >
        {t(TXT_DISCONNECT)}
      </Button>
    </Flex>
  );
};
