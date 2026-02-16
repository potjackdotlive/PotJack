function LtcIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="ltc-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#ltc-mask)">
        <path fill="#345D9D" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="M6.43 15.21 5 15.77 5.69 13l1.44-.58L9.21 4h5.13l-1.52 6.2 1.41-.57-.68 2.74-1.42.58-.85 3.621H19L18.13 20H5.25l1.18-4.79Z"
        />
      </g>
    </svg>
  );
}

export default LtcIcon;
