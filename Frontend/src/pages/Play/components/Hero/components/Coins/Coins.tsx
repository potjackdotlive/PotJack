import { coinStyles } from "pages/Play/components/Hero/components/Coins/coinStyles";
import { Floating, FloatingElement } from "pages/Play/components/Hero/components/Coins/Floating";

export const Coins = () => {
  // blurred coins go first to not overlap not blurred
  const coinList = [
    { depth: 0.5, css: coinStyles.sixthCoin },
    { depth: 0.5, css: coinStyles.thirdCoin },
    { depth: 2, css: coinStyles.firstCoin },
    { depth: 2.5, css: coinStyles.secondCoin },
    { depth: 1, css: coinStyles.fourthCoin },
    { depth: 3.5, css: coinStyles.fifthCoin },
  ];

  return (
    <div style={{ position: "absolute" }}>
      <Floating sensitivity={0.1}>
        {coinList.map((coin, i) => (
          <FloatingElement key={i} depth={coin.depth}>
            <div css={coin.css} />
          </FloatingElement>
        ))}
      </Floating>
    </div>
  );
};
