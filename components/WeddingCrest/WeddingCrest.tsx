type WeddingCrestProps = {
  className?: string;
};

export function WeddingCrest({ className }: WeddingCrestProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M80 140C48 122 27 97 30 66c2-23 19-43 43-51"
          strokeWidth="1.4"
          opacity="0.42"
        />
        <path
          d="M80 140c32-18 53-43 50-74-2-23-19-43-43-51"
          strokeWidth="1.4"
          opacity="0.42"
        />
        <path
          d="M80 124C63 105 50 91 50 71c0-16 12-29 30-40 18 11 30 24 30 40 0 20-13 34-30 53Z"
          strokeWidth="2.4"
        />
        <path
          d="M50 72c18 3 27 16 30 34 3-18 12-31 30-34"
          strokeWidth="1.8"
        />
        <path d="M80 31v75" strokeWidth="1" opacity="0.5" />
        <path
          d="M80 17c3 5 7 8 12 10-5 2-9 5-12 10-3-5-7-8-12-10 5-2 9-5 12-10Z"
          strokeWidth="1.35"
        />
        <path
          d="M37 48c8 0 14 4 18 11-8 1-15-3-18-11Zm86 0c-8 0-14 4-18 11 8 1 15-3 18-11ZM32 78c8-2 15 0 20 6-8 3-15 1-20-6Zm96 0c-8-2-15 0-20 6 8 3 15 1 20-6Z"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1"
          opacity="0.7"
        />
      </g>
      <circle cx="80" cy="106" r="2.4" fill="currentColor" opacity="0.72" />
    </svg>
  );
}
