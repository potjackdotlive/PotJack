function HpoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="hpo-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#hpo-mask)">
        <path fill="#000" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="M13.412 10.588V4h-2.824v6.588h2.824Zm0 2.824v-2.824H20v2.824h-6.588Zm0 0V20h-2.824v-6.588h2.824ZM4 10.587h6.588v2.825L4 13.411v-2.824Z"
        />
      </g>
    </svg>
  );
}

export default HpoIcon;
