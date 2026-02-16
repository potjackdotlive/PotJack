import { FC } from "react";
import { Flex } from "antd";
import { Button } from "components/Button/Button";
import { slippageStyles } from "pages/Play/components/BuyTicketEth/components/Slippage/slippageStyles";

const commonSlippageOptions = [0.1, 0.5, 1.0];

type Props = {
  setSlippage: (slippage: string) => void;
  setSlippageError: (error: string | null) => void;
};

export const CommonOptions: FC<Props> = ({ setSlippage, setSlippageError }) => {
  const handleSetSlippage = (slippage: number) => () => {
    setSlippage(slippage.toString());
    setSlippageError(null);
  };

  return (
    <Flex gap={8} css={[slippageStyles.root]}>
      {commonSlippageOptions.map((option) => (
        <Button
          key={option}
          size="sm"
          variant="brand"
          outline
          css={slippageStyles.button}
          onClick={handleSetSlippage(option)}
        >
          {`${option}%`}
        </Button>
      ))}
    </Flex>
  );
};
