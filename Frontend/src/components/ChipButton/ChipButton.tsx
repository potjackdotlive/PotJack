import { FC } from "react";
import { Tag, Typography } from "antd";
import { CoinIconProvider } from "components/CoinIconProvider/CoinIconProvider";
import { commonStyles } from "styles/commonStyles";
import { CoinType } from "utils/types";
import { chipButtonStyles } from "./useStyles";

export type ChipButtonProps = {
  text: string;
  size?: "small" | "default";
  isActive?: boolean;
  pinColor?: string;
  coin?: CoinType;
  onClick?: () => void;
};

const ChipButton: FC<ChipButtonProps> = ({ isActive = false, pinColor, coin, text, size = "default", onClick }) => {
  const sizeStyles = chipButtonStyles.size[size];

  return (
    <Tag
      css={[chipButtonStyles.root, sizeStyles, commonStyles.cursorPointer]}
      {...(isActive && { className: "active" })}
      onClick={onClick}
    >
      {pinColor && <div css={chipButtonStyles.pin} style={{ backgroundColor: pinColor }} />}
      {coin && <CoinIconProvider token={coin} height={16} width={16} />}
      <Typography css={chipButtonStyles.text}>{text}</Typography>
    </Tag>
  );
};

export default ChipButton;
