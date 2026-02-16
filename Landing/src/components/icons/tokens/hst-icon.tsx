function HstIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="hst-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#hst-mask)">
        <path fill="#545EFF" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="M15.952 16C18.188 16 20 14.21 20 12s-1.812-4-4.048-4c-1.958 0-3.592 1.374-3.967 3.2H16a.8.8 0 0 1 0 1.6h-4.015c.375 1.826 2.01 3.2 3.967 3.2Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M4.8 8a.8.8 0 0 0-.8.8v6.4a.8.8 0 0 0 .8.8h6.4a.8.8 0 0 0 .8-.8V8.8a.8.8 0 0 0-.8-.8H4.8Zm7.198 3.2h-3.27L7.2 12.8h4.798v-1.6Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}

export default HstIcon;
