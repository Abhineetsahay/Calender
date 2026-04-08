import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  month: string;
  year: number;
  imgLoaded: boolean;
  onLoad: () => void;
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
}

export default function HeroImage({
  src,
  alt,
  month,
  year,
  imgLoaded,
  onLoad,
  palette,
  isMobile,
}: HeroImageProps) {
  return (
    <div className={`relative w-full ${isMobile ? "h-56" : "h-full"} bg-stone-200 overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={onLoad}
        priority
        style={{
          objectFit: "cover",
          display: "block",
          opacity: imgLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          filter: "brightness(0.88) saturate(1.05)",
        }}
      />

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: isMobile ? 80 : 120,
        background: "#fff",
        clipPath: isMobile
          ? "polygon(0 60%, 100% 0, 100% 100%, 0 100%)"
          : "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)",
      }} />

      <div className={`absolute z-5 text-right ${isMobile ? "bottom-7 right-5" : "bottom-10 right-7"}`}>
        <div
          style={{ color: palette.accent }}
          className="text-xs md:text-sm tracking-widest font-bold uppercase font-serif drop-shadow-md"
        >
          {year}
        </div>
        <div className="text-3xl md:text-5xl font-bold text-black leading-none drop-shadow-lg -tracking-tighter">
          {month.toUpperCase()}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: isMobile ? 24 : 36,
          left: 0,
          width: isMobile ? 80 : 110,
          height: isMobile ? 56 : 80,
          background: palette.bg,
          clipPath: "polygon(0 0, 100% 40%, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}
