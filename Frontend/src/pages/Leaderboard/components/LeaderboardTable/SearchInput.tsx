import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SerializedStyles } from "@emotion/react";
import SearchIcon from "icons/li_search.svg?react";
import CrossIcon from "icons/li_x.svg?react";
import { Input } from "components/Input/Input";
import { useMediaQueryMatches } from "hooks/useMediaQueryMatches";
import { commonStyles } from "styles/commonStyles";
import { TXT_SEARCH_WALLET } from "translations";
import { Noop } from "utils/noop";
import { searchInputStyles } from "./styles/searchInputStyles";

type Props = {
  search: string;
  clearSearch: Noop;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: SerializedStyles;
};

export const SearchInput: FC<Props> = ({ search, clearSearch, handleSearchChange, styles }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueryMatches();

  const isMobile = !sm;

  return (
    <Input
      placeholder={t(TXT_SEARCH_WALLET)}
      prefix={<SearchIcon />}
      value={search}
      onChange={handleSearchChange}
      css={[commonStyles.fullWidth, isMobile ? searchInputStyles.rootMobile : searchInputStyles.root, styles]}
      {...(search && {
        suffix: (
          <span css={searchInputStyles.clear} onClick={clearSearch}>
            <CrossIcon />
          </span>
        ),
      })}
    />
  );
};
