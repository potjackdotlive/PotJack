function DaiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="dai-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#dai-mask)">
        <path fill="#FDC134" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M11.711 4.773H5.548V9.42H4v2.065h1.548v1.032H4v2.065h1.548v4.645h6.163a7.265 7.265 0 0 0 6.782-4.645H20v-2.065h-1.053a6.998 6.998 0 0 0 0-1.032H20V9.418h-1.507a7.27 7.27 0 0 0-6.782-4.645Zm5.161 7.742a5 5 0 0 0 0-1.032h-9.26v1.032h9.266-.006Zm-9.26 2.065v2.58h3.985c1.962 0 3.68-1.037 4.594-2.58H7.612Zm0-5.162h8.584a5.33 5.33 0 0 0-4.593-2.58h-3.99l-.001 2.58Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}

export default DaiIcon;
