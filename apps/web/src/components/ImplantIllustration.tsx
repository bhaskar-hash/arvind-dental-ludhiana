/** A labelled illustration of an implant's three parts (not a patient image). */
export function ImplantIllustration() {
  const badge =
    "absolute flex h-8 w-8 items-center justify-center rounded-full bg-brand-red font-body text-[15px] font-bold text-white";
  return (
    <figure className="rounded-[28px] border border-brand-line bg-white px-7 pb-5 pt-7 shadow-[0_30px_60px_-32px_rgba(43,10,15,0.4)]">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px]">
        <svg viewBox="0 0 300 400" className="h-full w-full" role="img" aria-label="An implant: a crown on top, an abutment at the gum line, and a titanium fixture in the jawbone">
          <rect x="0" y="200" width="300" height="200" fill="#F1E3CF" />
          <circle cx="40" cy="260" r="6" fill="#E6D2B4" />
          <circle cx="70" cy="320" r="8" fill="#E6D2B4" />
          <circle cx="250" cy="250" r="7" fill="#E6D2B4" />
          <circle cx="230" cy="340" r="5" fill="#E6D2B4" />
          <circle cx="40" cy="370" r="5" fill="#E6D2B4" />
          <path d="M0 168 Q 75 150 150 166 T 300 168 V 210 H 0 Z" fill="#E7A9A4" />
          <path d="M-20 70 C -16 52 30 50 44 62 C 54 72 56 120 52 166 L -20 166 Z" fill="#FFFFFF" stroke="#D8CBC7" strokeWidth="2" />
          <path d="M320 70 C 316 52 270 50 256 62 C 246 72 244 120 248 166 L 320 166 Z" fill="#FFFFFF" stroke="#D8CBC7" strokeWidth="2" />
          <rect x="124" y="204" width="52" height="138" rx="10" fill="#A9B1BA" />
          <path d="M124 330 L150 378 L176 330 Z" fill="#A9B1BA" />
          <path d="M120 226 h60 M120 252 h60 M120 278 h60 M120 304 h60 M124 330 h52" stroke="#8C949D" strokeWidth="6" strokeLinecap="round" />
          <path d="M134 206 L138 158 H162 L166 206 Z" fill="#C9CFD5" stroke="#9AA2AA" strokeWidth="2" />
          <path d="M98 162 C 94 118 98 70 118 58 C 134 49 166 49 182 58 C 202 70 206 118 202 162 Z" fill="#FFFFFF" stroke="#CDBFBB" strokeWidth="2.5" />
          <path d="M118 78 C 128 70 140 68 150 70" stroke="#EFE7E5" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
        <span className={badge} style={{ left: "74%", top: "23%" }} aria-hidden>1</span>
        <span className={badge} style={{ left: "62%", top: "42%" }} aria-hidden>2</span>
        <span className={badge} style={{ left: "64%", top: "65.5%" }} aria-hidden>3</span>
      </div>
      <figcaption className="mt-3.5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-body text-sm font-semibold">
        <span><span className="text-brand-red">1</span> Crown</span>
        <span><span className="text-brand-red">2</span> Abutment</span>
        <span><span className="text-brand-red">3</span> Implant fixture</span>
      </figcaption>
    </figure>
  );
}
