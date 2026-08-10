export default function Button({ children, onClick, variant = "primary", className = "", ...rest }) {
  return (
    <button className={`btn btn--${variant}${className ? ` ${className}` : ""}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
