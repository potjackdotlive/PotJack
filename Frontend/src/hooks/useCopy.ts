import { BaseSyntheticEvent, useEffect, useState } from "react";

const useCopyFunction = () => {
  const fallbackCopying = (value?: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = value || "";

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const copyToClipboard = (value?: string) => {
    const stringifyValue = JSON.stringify(value);
    if (!navigator.clipboard) {
      fallbackCopying(JSON.parse(stringifyValue));
      return;
    }

    navigator.clipboard.writeText(JSON.parse(stringifyValue));
  };

  return {
    copyToClipboard,
  };
};

type Props = {
  value: string;
};

export const useCopy = ({ value }: Props) => {
  const { copyToClipboard } = useCopyFunction();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (value) {
      copyToClipboard(value);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (!isCopied) return;

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  return {
    handleCopy,
    isCopied,
  };
};
