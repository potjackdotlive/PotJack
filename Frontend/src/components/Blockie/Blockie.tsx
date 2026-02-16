import { FC } from "react";
import Blockies from "react-blockies";

export type Props = {
  address: string;
  size?: number;
  showEnsAvatar?: boolean;
};

const Blockie: FC<Props> = ({ address, size }) => (
  <>
    {/* @ts-expect-error incorrect library type */}
    <Blockies seed={address.toLowerCase()} size={size} />
  </>
);

export default Blockie;
