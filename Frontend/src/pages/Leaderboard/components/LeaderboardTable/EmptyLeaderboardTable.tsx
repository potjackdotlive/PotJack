import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { Flex, Typography } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { Address } from "viem";
import { Button } from "components/Button/Button";
import { ROUTES } from "constants/routes";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_BUY_TICKET, TXT_NO_LEADERS_HERE_YET_BE_THE_FIRST_TO_MAKE_HISTORY } from "translations";
import { getAddressToTokenSet } from "utils/getAddressToTokenSet";
import { getChainIdByContractAddress } from "utils/getChainIdByContractAddress";
import { emptyLeaderboardTableStyles } from "./styles/emptyLeaderboardTableStyles";

type Props = {
  contractAddress: string;
  tokenAddress: string;
};

const EmptyLeaderboardTable: FC<Props> = ({ contractAddress, tokenAddress }) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();
  const navigate = useNavigate();

  const handleClick = () => {
    const chainId = getChainIdByContractAddress(contractAddress);
    const tokenSet = getAddressToTokenSet(chainId);

    if (!tokenSet) {
      navigate(ROUTES.Play);
      return;
    }

    navigate(
      generatePath(ROUTES.PlayNetworkToken, {
        network: chainId,
        token: tokenSet[tokenAddress as Address],
      }),
    );
  };

  return (
    <Flex justify="center" align="center" css={emptyLeaderboardTableStyles.root}>
      <Flex gap={16} vertical align="center">
        <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textMuted]}>
          {t(TXT_NO_LEADERS_HERE_YET_BE_THE_FIRST_TO_MAKE_HISTORY)}
        </Typography>
        <Button {...(xs && { size: "lg" })} onClick={handleClick}>
          {t(TXT_BUY_TICKET)}
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmptyLeaderboardTable;
