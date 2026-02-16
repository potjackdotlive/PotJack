import { FC } from "react";
import { Flex, Tooltip, Typography } from "antd";
import InfoIcon from "icons/Info.svg?react";
import { TooltipWrapper } from "components/TooltipWrapper/TooltipWrapper";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { commonStyles } from "styles/commonStyles";
import { typographyStyles } from "styles/typography";

type Props = {
  main: string;
  parent?: string;
  info?: string;
  infoWidth?: number;
};

const InfoTitle: FC<Props> = ({ main, parent, info }) => {
  const { xl } = useMediaQueryMatches();

  if (!xl) {
    return (
      <Flex gap={4} style={{ color: "#A1A1AA" }} align="center">
        <Flex gap={8} align="center">
          <Typography style={{ color: "white" }} css={typographyStyles.bodyLargeMd}>
            {main}
          </Typography>
          {info && (
            <Tooltip
              title={
                <TooltipWrapper>
                  <Typography css={typographyStyles.bodyDefaultMd}>{info}</Typography>
                </TooltipWrapper>
              }
              trigger={["click"]}
              destroyOnHidden
              arrow={false}
              placement="bottom"
            >
              <InfoIcon />
            </Tooltip>
          )}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex gap={4} style={{ color: "#A1A1AA" }} align="center">
      {parent && (
        <>
          <Typography css={[typographyStyles.bodyLargeMd, commonStyles.textMuted]}>{parent}</Typography>
          <Typography css={[typographyStyles.bodyLargeMd, commonStyles.textMuted]}>/</Typography>
        </>
      )}
      <Flex gap={8} align="center">
        <Typography style={{ color: "white" }} css={typographyStyles.bodyLargeMd}>
          {main}
        </Typography>
        {info && (
          <Tooltip
            destroyOnHidden
            arrow={false}
            placement="bottom"
            styles={{ root: { maxWidth: 294 } }}
            title={
              <TooltipWrapper>
                <Typography css={typographyStyles.bodyDefaultMd}>{info}</Typography>
              </TooltipWrapper>
            }
          >
            <InfoIcon />
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
};

export default InfoTitle;
