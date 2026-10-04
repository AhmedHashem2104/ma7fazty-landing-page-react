// Small line icons (Ionicons-like, matching the app) and the store logos, inline so nothing extra loads.

const PATHS: Record<string, string> = {
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm-7 9a7 7 0 0 0 14 0M12 19v3M8 22h8',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
  wallet: 'M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3M3 7h17a1 1 0 0 1 1 1v3m0 0h-4a2 2 0 0 0 0 4h4m0-4v4',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
  bell: 'M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9Zm4 13a2 2 0 0 0 4 0',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4',
  check: 'm5 12 4.5 4.5L19 7',
  chat: 'M4 5h16v11H9l-5 4V5Zm5 6h.01M12 11h.01M15 11h.01',
  coffee: 'M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h1.5a2.5 2.5 0 0 1 0 5H17M7 3v2m4-2v2',
  up: 'M12 19V5m-6 6 6-6 6 6',
  down: 'M12 5v14m6-6-6 6-6-6',
  sparkle: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Zm6 12 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z',
  swap: 'M7 4 3 8l4 4M3 8h14m0 12 4-4-4-4m4 4H7',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4.2-4.2',
  wifi: 'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01',
  cash: 'M2 7h20v10H2V7Zm10 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM6 10v4m12-4v4',
  bank: 'M3 10 12 4l9 6M5 10v8m4.7-8v8m4.6-8v8M19 10v8M3 20h18',
  card: 'M3 6h18v12H3V6Zm0 4h18M7 15h3',
  home: 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6',
  tv: 'M3 6h18v12H3V6Zm5 15h8',
};

export function Icon({ name, className }: { name: string; className?: string }) {
  if (name === 'apple') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.72-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.3-3.52ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.69.97.07 1.96-.5 2.56-1.24Z"
        />
      </svg>
    );
  }
  if (name === 'google') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#00D7FE" d="M3.6 2.3c-.2.2-.3.6-.3 1v17.4c0 .4.1.8.3 1l9.7-9.7-9.7-9.7Z" />
        <path fill="#FFCE00" d="m16.5 15.2-3.2-3.2 3.2-3.2 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2Z" />
        <path fill="#FF3A44" d="m16.5 15.2-3.2-3.2-9.7 9.7c.4.4 1 .4 1.7 0l11.2-6.5Z" />
        <path fill="#00F076" d="M16.5 8.8 5.3 2.4c-.7-.4-1.3-.4-1.7 0l9.7 9.6 3.2-3.2Z" />
      </svg>
    );
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d={PATHS[name] ?? ''} />
    </svg>
  );
}
