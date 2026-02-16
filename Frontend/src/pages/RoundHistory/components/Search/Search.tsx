import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import SearchIcon from "icons/li_search.svg?react";
import CrossIcon from "icons/li_x.svg?react";
import { Button } from "components/Button/Button";
import { IconButton } from "components/IconButton/IconButton";
import { Input } from "components/Input/Input";
import { commonStyles } from "styles/commonStyles";
import { TXT_SEARCH, TXT_SEARCH_BY_WALLET } from "translations";
import { searchStyles as styles } from "./styles";

type Props = {
  requestSearch: string;
  setRequestSearch: Dispatch<SetStateAction<string>>;
};

export const Search: FC<Props> = ({ setRequestSearch, requestSearch }) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoint();
  const [search, setSearch] = useState("");

  const handleSetSearch = () => {
    setRequestSearch(search);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
    setRequestSearch("");
  };

  useEffect(() => {
    setSearch(requestSearch);
  }, [requestSearch]);

  return (
    <Flex css={[styles.root, xs && commonStyles.fullWidth]} align="center" vertical={xs} gap={6}>
      <Input
        value={search}
        onChange={handleInputChange}
        onPressEnter={handleSetSearch}
        placeholder={t(TXT_SEARCH_BY_WALLET)}
        suffix={
          search ? (
            <span css={styles.clear} onClick={clearSearch}>
              <CrossIcon />
            </span>
          ) : (
            <span />
          )
        }
        css={[styles.input, commonStyles.fullWidth]}
      />
      {xs ? (
        <Button icon={<SearchIcon width={16} height={16} />} css={commonStyles.fullWidth} onClick={handleSetSearch}>
          {t(TXT_SEARCH)}
        </Button>
      ) : (
        <IconButton css={styles.button} onClick={handleSetSearch} disabled={!search && !requestSearch}>
          <SearchIcon width={20} height={20} />
        </IconButton>
      )}
    </Flex>
  );
};
