import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Flex, Typography } from "antd";
import ArrowUpRightIcon from "icons/li_arrow-up-right.svg?react";
import { Button } from "components/Button/Button";
import { routeButtonStyles as styles } from "./routeButtonStyles";

type Props = {
  route: string;
  title: string;
  disabled?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
};

export const RouteButton: FC<Props> = ({ route, title, showArrow, onClick, disabled }) => (
  <Link to={route} onClick={onClick} aria-disabled={disabled}>
    <Button css={[styles.button, disabled && styles.disabled]}>
      <Flex gap={6} align="center">
        {showArrow && <ArrowUpRightIcon />}
        <Typography>{title}</Typography>
      </Flex>
    </Button>
  </Link>
);
