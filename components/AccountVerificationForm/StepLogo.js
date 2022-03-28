export function StepLogo({ src, alt }) {
  return (
    <div className="flex justify-center">
      {/* Square sized svgs recommended for consistency between product logo and institution (square) logo */}
      <img className="rounded-lg w-14 h-14 sm:w-16 sm:h-16" src={src} alt={alt} />
    </div>
  );
}
