import { css } from "@emotion/react";

export const coinStyles = {
  firstCoin: css`
    z-index: -1;
    height: 75px;
    width: 73px;
    position: absolute;
    top: 60px;
    left: -290px;
    background: url("bg-coin-1.png") transparent 100% / cover no-repeat;
  `,
  secondCoin: css`
    z-index: -1;
    height: 77px;
    width: 74px;
    position: absolute;
    top: -50px;
    left: -175px;
    background: url("bg-coin-2.png") transparent 100% / cover no-repeat;
  `,
  thirdCoin: css`
    z-index: -5;
    height: 52px;
    width: 50px;
    position: absolute;
    top: -25px;
    left: -50px;
    background: url("bg-coin-3.png") transparent 100% / cover no-repeat;
  `,
  fourthCoin: css`
    z-index: -1;
    height: 52px;
    width: 50px;
    position: absolute;
    top: -50px;
    right: -100px;
    background: url("bg-coin-4.png") transparent 100% / cover no-repeat;
    opacity: 0.6;
  `,
  fifthCoin: css`
    z-index: -1;
    height: 90px;
    width: 90px;
    position: absolute;
    top: -10px;
    right: -225px;
    background: url("bg-coin-5.png") transparent 100% / cover no-repeat;
  `,
  sixthCoin: css`
    z-index: -5;
    height: 75px;
    width: 75px;
    position: absolute;
    top: 90px;
    right: -275px;
    opacity: 0.7;
    background: url("bg-coin-6.png") transparent 100% / cover no-repeat;
  `,
};
