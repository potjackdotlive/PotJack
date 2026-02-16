import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { address } from "gill";
import { getGetTicketPriceInstruction } from "anchor/src";
import { warningNotification } from "components/Notification/Notification";
import { QUERY_KEYS } from "constants/queryKeys";
import { UPDATE_PRICE_FEEDS } from "graphql/queries";
import { useSolanaRpc } from "pages/Play/hooks/useSolanaRpc";
import { getBase64Transaction } from "pages/Play/utils";
import { TXT_ERROR, TXT_TICKET_PRICE_IS_NOT_AVAILABLE } from "translations";
import { btcPriceFeedAddress, solPriceFeedAddress } from "utils/constants/priceFeedAddresses";
import { decodeBase64 } from "utils/decodeBase64";

export const useGetTicketPriceForSol = (enabled = true) => {
  const rpc = useSolanaRpc();
  const { t } = useTranslation();
  const [updatePriceFeeds] = useMutation(UPDATE_PRICE_FEEDS);

  const showErrorNotification = () => {
    warningNotification({
      message: t(TXT_ERROR),
      description: t(TXT_TICKET_PRICE_IS_NOT_AVAILABLE),
      duration: 30,
    });
  };

  const simulateGetTicketPrice = async (): Promise<number | null> => {
    try {
      const instruction = getGetTicketPriceInstruction({
        solPriceFeed: address(solPriceFeedAddress),
        btcPriceFeed: address(btcPriceFeedAddress),
      });

      const base64Transaction = await getBase64Transaction(rpc, instruction);
      if (!base64Transaction) {
        throw new Error("Failed to get base64 transaction");
      }

      const simulation = await rpc
        .simulateTransaction(base64Transaction, {
          commitment: "confirmed",
          encoding: "base64",
          replaceRecentBlockhash: true,
        })
        .send();

      if (simulation.value.returnData?.data?.[0]) {
        const priceInLamports = await decodeBase64(simulation.value.returnData.data[0]);
        return Number(priceInLamports) / LAMPORTS_PER_SOL;
      }

      return null;
    } catch (error) {
      console.error("Simulation error:", error);
      return null;
    }
  };

  return useQuery({
    queryKey: [QUERY_KEYS.SOL.GET_TICKET_PRICE_FOR_TOKEN, "Sol"],
    retry: 2,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        const updateResult = await updatePriceFeeds();
        if (updateResult.data.success === false) {
          throw new Error("Failed to update price feeds");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const price = await simulateGetTicketPrice();
        if (price !== null) {
          return price;
        }

        const retryPrice = await simulateGetTicketPrice();
        if (retryPrice !== null) {
          return retryPrice;
        }

        showErrorNotification();
        return null;
      } catch (error) {
        console.error("Error getting ticket price:", error);
        showErrorNotification();
        return null;
      }
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    enabled,
  });
};
