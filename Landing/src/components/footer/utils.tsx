import TelegramIcon from "@/components/icons/telegram-icon";
import DiscordIcon from "@/components/icons/discord-icon";
import TwitterIcon from "@/components/icons/twitter-icon";

export const footerMenuLinks = [
  {
    label: "Privacy Policy",
    href: "/",
  },
  {
    label: "Terms of Service",
    href: "/",
  },
  {
    label: "View Code on GitHub",
    href: "/",
  },
  {
    label: "Verify Main Contract",
    href: "/",
  },
  {
    label: "Verify Entries",
    href: `${process.env.NEXT_PUBLIC_LOTTERY_ROUND_HISTORY_URL}`,
  },
];

export const footerSocials = [
  {
    Icon: TelegramIcon,
    href: "https://t.me/yourlottery",
  },
  {
    Icon: DiscordIcon,
    href: "https://discord.gg/yourlottery",
  },
  {
    Icon: TwitterIcon,
    href: "https://x.com/yourlottery",
  },
];
