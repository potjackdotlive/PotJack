import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Flex } from "antd";
import Logo from "icons/logo.svg?react";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { getNavItems } from "pages/Play/components/Hero/components/Nav/utils";
import { getBaseUrl } from "utils/getBaseUrl";
import { NavModal } from "./NavModal";

const Nav = () => {
  const { t } = useTranslation();
  const { lg } = useMediaQueryMatches();

  const navItems = getNavItems(t);

  return (
    <Flex gap={68}>
      <Flex gap={16} align="center">
        {!lg && <NavModal navItems={navItems} />}
        <Link to={getBaseUrl()} style={{ display: "inline-flex" }}>
          <Logo />
        </Link>
      </Flex>

      {lg && (
        <Flex gap={24} align="center">
          {navItems.map((ni) => {
            const isActive = location.pathname.startsWith(ni.route);

            return (
              <div key={ni.route}>
                <Link to={ni.route} {...(isActive && { className: "active" })}>
                  {ni.title}
                </Link>
              </div>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default Nav;
