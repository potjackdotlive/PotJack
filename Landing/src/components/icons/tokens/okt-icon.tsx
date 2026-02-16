function OktIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="okt-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#okt-mask)">
        <path fill="#000" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="M4 4h5.333v5.333H4V4Zm10.667 5.333H9.333v5.334H4V20h5.333v-5.333h5.334V20H20v-5.333h-5.333V9.333Zm0 0V4H20v5.333h-5.333Z"
        />
      </g>
    </svg>
  );
}

export default OktIcon;
