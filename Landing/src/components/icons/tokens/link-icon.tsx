function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#link-clip)">
        <mask
          id="link-mask"
          width="24"
          height="24"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path fill="#fff" d="M0 0h24v24H0V0Z" />
        </mask>
        <g mask="url(#link-mask)">
          <path fill="#2E61DE" d="M24 0H0v24h24V0Z" />
          <path
            fill="#fff"
            d="m12 4 6.43 3.851v7.794L11.082 20v-1.098l-5.496-3.285-.016-7.72L12 4Zm.008 13.316 4.585-2.715V8.894l-4.592-2.748L7.408 8.93v5.644l4.6 2.742Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="link-clip">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LinkIcon;
