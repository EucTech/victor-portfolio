import Image from "next/image";

/**
 * First-visit curtain: the monogram settles, a gold rule draws across,
 * then the panel lifts away. Pure CSS so it can never trap the page,
 * and skipped for the rest of the session by the inline script in layout.
 */
export function IntroCurtain() {
  return (
    <div aria-hidden="true" className="intro-curtain">
      <div className="intro-curtain__inner">
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={227}
          height={174}
          priority
          className="intro-curtain__mark h-16 w-auto md:h-20"
        />
        <span className="intro-curtain__rule" />
        <span className="intro-curtain__name font-display">Victor Chiemerie</span>
      </div>
    </div>
  );
}

export const introSkipScript = `try{if(sessionStorage.getItem('vc-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-seen')}sessionStorage.setItem('vc-intro','1')}catch(e){}`;
