function NearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="near-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#near-mask)">
        <path fill="#00EC97" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="m16.823 4.817-3.343 4.96c-.229.343.217.743.537.463l2.914-2.857c.086-.074.212-.023.212.103v8.943c0 .12-.16.171-.229.085L7.337 4.606A1.64 1.64 0 0 0 6.04 4C5.011 4 4 4.52 4 5.71v12.577a1.71 1.71 0 0 0 3.16.891l3.337-4.96c.229-.343-.211-.743-.531-.463L7.069 16.67c-.086.074-.212.023-.212-.103v-8.92c0-.126.16-.172.229-.086l9.56 11.834c.32.395.8.606 1.297.606 1.034 0 2.057-.515 2.057-1.71V5.714a1.714 1.714 0 0 0-3.177-.89v-.007Z"
        />
      </g>
    </svg>
  );
}

export default NearIcon;
