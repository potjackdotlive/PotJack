import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Card, Divider, Flex, Typography } from "antd";
import BlockchainSelector from "components/BlockchainSelector";
import Blockie from "components/Blockie/Blockie";
import { ProfileActions } from "components/WalletConnectors/components/Profile/ProfileActions";
import { useGetUserTotalWinsQuery } from "graphql/gen/hooks";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";
import { TXT_YOUR_TOTAL_WINS } from "translations";
import { addressFormatter } from "utils/formatters/addressFormatter";
import { profileStyles as styles } from "./profileStyles";

type Props = {
  address: string;
};

export const Profile: FC<Props> = ({ address }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueryMatches();
  const { data } = useGetUserTotalWinsQuery({
    variables: {
      walletAddress: address,
    },
    pollInterval: 10_000,
  });

  const totalWins = data?.userWins?.totalWins || 0;

  return (
    <Card css={styles.root}>
      <Flex vertical gap={24} style={{ width: 232 }} justify="center" align="center">
        <Flex vertical gap={12} css={commonStyles.fullWidth}>
          <Flex vertical gap={8} align="center">
            <Avatar src={<Blockie address={address} size={39} />} size={39} />
            <Typography css={[typographyStyles.bodyDefaultMd, commonStyles.textNeutral]}>
              {addressFormatter(address)}
            </Typography>
          </Flex>
          <Flex vertical gap={8}>
            {!sm && <BlockchainSelector fullWidth />}
            <Divider />
            <Flex>
              <Flex vertical flex={1} align="center">
                <Typography css={[typographyStyles.bodyLargeMd, commonStyles.textNeutral]}>{totalWins}</Typography>
                <Typography css={[typographyStyles.bodySmallSb, commonStyles.textMuted]}>
                  {t(TXT_YOUR_TOTAL_WINS)}
                </Typography>
              </Flex>
            </Flex>
            <Divider />
          </Flex>
        </Flex>

        <ProfileActions />
      </Flex>
    </Card>
  );
};
