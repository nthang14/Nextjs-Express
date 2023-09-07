import React from "react";

const ClipBoard: React.FC<{ text: string; children: any }> = ({
  text,
  children,
}) => {
  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return <div onClick={handleCopy}>{children}</div>;
};

export default ClipBoard;
