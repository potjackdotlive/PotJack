function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      data-type="plus-icon"
      className={className}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 3.75V12m0 0v8.25M12 12H3.75M12 12h8.25"
        opacity=".8"
      />
    </svg>
  );
}

export default PlusIcon;
