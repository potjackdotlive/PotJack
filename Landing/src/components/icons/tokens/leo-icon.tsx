function LeoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="leo-mask"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#fff" d="M0 0h24v24H0V0Z" />
      </mask>
      <g mask="url(#leo-mask)">
        <path fill="url(#leo-gradient)" d="M24 0H0v24h24V0Z" />
        <path
          fill="#fff"
          d="M16 10.828V6.372L11.877 4l-1.797.977.73.429 1.044-.554 3.257 1.936v3.434h-1.778v1.698L16 10.828Zm-10.222-.606V8.246L9.053 6.24l2.767 1.48.01-.028.344-.63-3.12-1.77-4.137 2.53-.01 2.4h.87Zm2.425.635 2.464 1.057v-1.692H8.042l-3.126 1.492-.028 4.132 1.785 1.257.477-.653-1.373-.987V12.12l2.426-1.263Zm4.758 7.777-1.118.457-2.954-1.554v-3.371h-.89v3.828L11.804 20l1.438-.583-.281-.783Zm4.372-3.005v-1.407h.889v1.795l-4.057 2.96-2.61-2.097v-2.063l-2.353-2.373h5.225l-1.983 2.368v1.714l1.738 1.348 3.15-2.245Zm.009-8.617 1.769 1.41v4.16l-3.412 2.126-.4-.629 2.923-1.907V8.766L16.835 7.72l.507-.714v.006Z"
        />
      </g>
      <defs>
        <linearGradient
          id="leo-gradient"
          x1="12"
          x2="12"
          y1="4"
          y2="20.005"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6E93D" />
          <stop offset=".13" stopColor="#F8E330" />
          <stop offset=".35" stopColor="#F7C730" />
          <stop offset=".64" stopColor="#F59C2E" />
          <stop offset=".98" stopColor="#EB5E2C" />
          <stop offset="1" stopColor="#EB5C2C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LeoIcon;
