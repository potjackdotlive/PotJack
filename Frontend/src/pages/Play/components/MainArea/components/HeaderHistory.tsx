import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { css } from "@emotion/react";
import ArrowLeftIcon from "icons/li_arrow-left.svg?react";
import ArrowRightIcon from "icons/li_arrow-right.svg?react";
import HistoryIcon from "icons/li_history.svg?react";
import { Button } from "components/Button/Button";
import { IconButton } from "components/IconButton/IconButton";
import { ROUTES } from "constants/routes";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { usePlayContext } from "pages/Play/contexts/playContext/playContextUtils";
import { typographyStyles } from "styles/typography";
import { TXT_HISTORY, TXT_ROUND_NUMBER } from "translations";

const styles = {
  root: css`
    gap: 8px;
    display: flex;
    width: 100%;
  `,
  spaceBetween: css`
    justify-content: space-between;
  `,
};

export const HeaderHistory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { xl, sm } = useMediaQueryMatches();
  const { setRoundData, roundId, maxRoundForCoin, networkId, coin } = usePlayContext();

  const roundIdView = (roundId || 0) + 1;
  const isBackDisabled = roundId === 0 || roundId === null;
  const isNextDisabled = maxRoundForCoin === roundId;

  const goBack = () => {
    if (isBackDisabled) {
      return;
    }

    setRoundData({ roundId: roundId - 1 });
  };

  const goNext = () => {
    if (isNextDisabled || roundId === null) {
      return;
    }

    setRoundData({ roundId: roundId + 1 });
  };

  const goHistory = () => {
    navigate(generatePath(ROUTES.RoundHistoryWithParams, { network: networkId, token: coin }));
  };

  return (
    <div css={[styles.root, !xl && styles.spaceBetween]}>
      {sm ? (
        <Button transparent size="sm" icon={<HistoryIcon />} iconPosition="start" onClick={goHistory}>
          {t(TXT_HISTORY)}
        </Button>
      ) : (
        <IconButton transparent size="sm" onClick={goHistory}>
          <HistoryIcon />
        </IconButton>
      )}
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 6px;
        `}
      >
        <IconButton ghost size="sm" onClick={goBack} disabled={isBackDisabled}>
          <ArrowLeftIcon width={20} height={20} />
        </IconButton>
        <Typography css={typographyStyles.bodyDefaultMd}>{t(TXT_ROUND_NUMBER, { number: roundIdView })}</Typography>
        <IconButton ghost size="sm" onClick={goNext} disabled={isNextDisabled}>
          <ArrowRightIcon width={20} height={20} />
        </IconButton>
      </div>
    </div>
  );
};
