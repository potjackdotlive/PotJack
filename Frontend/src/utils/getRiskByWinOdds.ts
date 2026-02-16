import { RiskType } from "utils/enums/risks";

export const getRiskByWinOdds = (winOdds: number): RiskType => {
  switch (true) {
    case winOdds < 10:
      return RiskType.Critical;
    case winOdds < 25:
      return RiskType.High;
    case winOdds < 49:
      return RiskType.Medium;
    default:
      return RiskType.Low;
  }
};
