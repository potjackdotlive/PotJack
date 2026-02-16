function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      data-type="minus-icon"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M3.75 12h16.5"
        opacity=".8"
      />
    </svg>
  );
}

export default MinusIcon;
