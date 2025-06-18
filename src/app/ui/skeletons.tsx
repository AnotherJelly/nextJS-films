export function SkeletonToggle () {
  return (
    <div className='toggle-skeleton'></div>
  )
}

function SkeletonCard () {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-img" />
      <div className="card-description">
        <div className="skeleton-line title" />
        <div className="skeleton-line year" />
        <div className="skeleton-line duration" />
        <div className="card-tags">
          <span className="skeleton-line tag" />
          <span className="skeleton-line tag" />
        </div>
        <div className="skeleton-line rating" />
      </div>
    </div>
  );
}

export function SkeletonCards () {
  return (
    <div className="card-wrapper">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}