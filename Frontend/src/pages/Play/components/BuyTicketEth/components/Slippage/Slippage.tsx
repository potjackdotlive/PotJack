import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Flex, Tooltip, Typography } from "antd";
import InfoIcon from "icons/Info.svg?react";
import { Input } from "components/Input/Input";
import { TooltipWrapper } from "components/TooltipWrapper/TooltipWrapper";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { CommonOptions } from "pages/Play/components/BuyTicketEth/components/Slippage/CommonOptions";
import { slippageStyles } from "pages/Play/components/BuyTicketEth/components/Slippage/slippageStyles";
import { ticketStyles } from "pages/Play/components/BuyTicketEth/ticketStyles";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_ENTER_CUSTOM_SLIPPAGE, TXT_SLIPPAGE_TOLERANCE, TXT_SLIPPAGE_TOOLTIP } from "translations";

type Props = {
  setSlippage: Dispatch<SetStateAction<string>>;
  slippageError: string | null;
  setSlippageError: Dispatch<SetStateAction<string | null>>;
  slippage: string;
};

export const Slippage: FC<Props> = ({ setSlippage, slippageError, setSlippageError, slippage }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueryMatches();

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    let cleaned = event.target.value.replace(/[^0-9.]/g, "");

    if (cleaned.startsWith(".")) {
      cleaned = "";
    }

    const dotIndex = cleaned.indexOf(".");
    if (dotIndex !== -1) {
      cleaned = cleaned.slice(0, dotIndex + 1) + cleaned.slice(dotIndex + 1).replace(/\./g, "");
    }

    const parts = cleaned.split(".");

    if (parts[0].length > 2) {
      parts[0] = parts[0].slice(0, 2);
    }

    if (parts[1]?.length > 2) {
      parts[1] = parts[1].slice(0, 2);
    }

    cleaned = parts.length === 2 ? `${parts[0]}.${parts[1]}` : parts[0];

    setSlippage(cleaned);
    setSlippageError(null);
  };

  return (
    <div css={commonStyles.fullWidth}>
      <Flex gap={16} vertical={!sm} css={commonStyles.fullWidth}>
        <Flex vertical gap={6} css={commonStyles.fullWidth}>
          <Flex gap={6} align="center">
            <Typography.Text>{t(TXT_SLIPPAGE_TOLERANCE)}</Typography.Text>
            <Tooltip
              title={
                <TooltipWrapper>
                  <Typography css={typographyStyles.bodyDefaultMd}>{t(TXT_SLIPPAGE_TOOLTIP)}</Typography>
                </TooltipWrapper>
              }
              destroyOnHidden
              arrow={false}
              placement="bottom"
              css={ticketStyles.iconMuted}
            >
              <InfoIcon />
            </Tooltip>
          </Flex>
          <Input
            value={slippage}
            css={[slippageStyles.input, slippageError && slippageStyles.inputError]}
            onInput={handleOnInput}
            placeholder={t(TXT_ENTER_CUSTOM_SLIPPAGE)}
          />

          {!sm && slippageError && (
            <Typography css={[typographyStyles.bodySmallMd, commonStyles.textDanger, slippageStyles.error]}>
              {slippageError}
            </Typography>
          )}
        </Flex>
        <CommonOptions setSlippage={setSlippage} setSlippageError={setSlippageError} />
      </Flex>
      {sm && slippageError && (
        <Typography css={[typographyStyles.bodySmallMd, commonStyles.textDanger, slippageStyles.error]}>
          {slippageError}
        </Typography>
      )}
    </div>
  );
};
