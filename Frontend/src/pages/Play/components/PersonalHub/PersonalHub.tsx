import { FC, MutableRefObject, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import { css } from "@emotion/react";
import { ActiveEntries } from "components/ActiveEntries/ActiveEntries";
import { Button } from "components/Button/Button";
import { SelectRaffle } from "components/SelectRaffle/SelectRaffle";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { useWalletConnection } from "hooks/useWalletConnection";
import { PersonalHubTitle } from "pages/Play/components/PersonalHub/PersonalHubTitle";
import { PlayContainer } from "pages/Play/components/PlayContainer/PlayContainer";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { useRaffleRound } from "pages/Play/hooks/useRaffleRound";
import { commonStyles } from "styles/commonStyles";
import { TXT_BACK_TO_CURRENT_ROUND, TXT_PERSONAL_HUB } from "translations";
import { HubDetails } from "./HubDetails";

type Props = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
};

const PersonalHub: FC<Props> = ({ containerRef }) => {
  const { t } = useTranslation();
  const { address } = useWalletConnection();
  const { coin, roundId, maxRoundForCoin, setRoundData, networkId } = usePlayContext();
  const { xl, sm } = useMediaQueryMatches();
  const hubRef = useRef<HTMLDivElement | null>(null);
  const offset = "20px";
  const isMobile = !sm;

  const showBackToCurrentRound = coin && roundId !== maxRoundForCoin;

  const handleGoToCurrentRound = () => {
    if (maxRoundForCoin !== null) {
      setRoundData({ roundId: maxRoundForCoin });
    }
  };

  const { raffleRoundData } = useRaffleRound({ coin, roundId, chainId: networkId, enabled: !!coin });

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        if (xl) {
          containerRef.current.style.paddingBottom = offset;
          return;
        }
        if (hubRef.current) {
          containerRef.current.style.paddingBottom = `${hubRef.current.offsetHeight}px`;
        }
      }
    };

    updateOffset();
    const interval = setInterval(updateOffset, 1000);

    window.addEventListener("resize", updateOffset);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateOffset);
    };
  }, [xl, containerRef, hubRef, coin, networkId, roundId]);

  if (!xl) {
    return (
      <div
        ref={hubRef}
        css={css`
          z-index: 2000;
          position: fixed;
          background: #131313;
          bottom: 0;
          width: 100%;
          left: 0;
          padding: 24px;
          border-top: 1px solid var(--color-neutral-border-neutral, #3f3f46);
        `}
      >
        <Flex vertical gap={16} css={commonStyles.fullWidth} align="center">
          <PersonalHubTitle
            title={t(TXT_PERSONAL_HUB)}
            coin={coin}
            roundId={roundId}
            showTimer={!!coin && raffleRoundData?.round?.active && !isMobile}
          />
          <HubDetails />
          {networkId && !coin && address && <SelectRaffle />}
          {showBackToCurrentRound && (
            <Button outline css={commonStyles.fullWidth} onClick={handleGoToCurrentRound}>
              {t(TXT_BACK_TO_CURRENT_ROUND)}
            </Button>
          )}
          {address && <ActiveEntries />}
        </Flex>
      </div>
    );
  }

  return (
    <PlayContainer>
      <Flex vertical gap={16} css={commonStyles.fullWidth}>
        <PersonalHubTitle
          title={t(TXT_PERSONAL_HUB)}
          coin={coin}
          roundId={roundId}
          showTimer={!!coin && raffleRoundData?.round?.active}
        />
        <HubDetails />
        {networkId && !coin && address && <SelectRaffle />}
      </Flex>
      {showBackToCurrentRound && (
        <Button outline css={commonStyles.fullWidth} onClick={handleGoToCurrentRound}>
          {t(TXT_BACK_TO_CURRENT_ROUND)}
        </Button>
      )}

      {address && <ActiveEntries />}
    </PlayContainer>
  );
};

export default PersonalHub;
