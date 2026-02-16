function CroIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="cro-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#cro-mask)">
        <path fill="#051221" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="M12.003 4 5 8.001v8L12.003 20 19 16.001v-8L12.003 4Zm4.924 10.816-4.924 2.813-4.927-2.813V9.184l4.927-2.813 4.924 2.813v5.632Z"
        />
        <path
          fill="#fff"
          d="m15.267 13.87-3.268 1.867-3.271-1.867v-3.736l3.27-1.87 3.269 1.87-1.36.778-1.909-1.092-1.907 1.092v2.177L12 14.182l1.908-1.091 1.359.779Z"
        />
      </g>
    </svg>
  );
}

export default CroIcon;
