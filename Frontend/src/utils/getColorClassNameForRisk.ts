import { RiskType } from "utils/enums/risks";

export const getColorClassNameForRisk = (risk: RiskType) => {
  switch (risk) {
    case RiskType.Critical:
      return "risk-critical";
    case RiskType.High:
      return "risk-high";
    case RiskType.Medium:
      return "risk-medium";
    case RiskType.Low:
      return "risk-low";
  }
};
