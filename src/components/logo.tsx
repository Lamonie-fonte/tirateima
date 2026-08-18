type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <div className={`logo ${compact ? "logo-compact" : ""}`}>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path d="M24 4C18 13 10 21 10 30a14 14 0 0 0 28 0C38 21 30 13 24 4Z" />
          <path className="logo-wave" d="M15 31c5-4 12 4 19-1" />
          <path className="logo-check" d="m18 27 4 4 9-10" />
        </svg>
      </span>
      <span className="logo-type">
        <strong>Tira-Teima</strong>
        {!compact ? <small>Cagece</small> : null}
      </span>
    </div>
  );
}
