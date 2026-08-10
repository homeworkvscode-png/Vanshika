export default function PageDots({ count, activeIndex, onSelect }) {
  return (
    <div className="page-dots" role="tablist" aria-label="Pages">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          className={`page-dot ${i === activeIndex ? "page-dot--active" : ""}`}
          onClick={() => onSelect(i)}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Page ${i + 1}`}
        />
      ))}
    </div>
  );
}
