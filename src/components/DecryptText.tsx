import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#0123456789";
const FRAMES = 24;
const FRAME_MS = 45;

interface DecryptTextProps {
  text: string;
  className?: string;
  as?: "h1" | "span" | "div";
}

/**
 * The one signature motion moment: text resolves from scrambled
 * characters into the real string, like a decryption — tied directly to
 * the subject (not decoration). Runs once on mount; respects
 * prefers-reduced-motion by skipping straight to the resolved text.
 */
const DecryptText = ({ text, className, as: Tag = "span" }: DecryptTextProps) => {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    let frame = 0;

    const tick = () => {
      frame += 1;
      const revealCount = Math.floor((frame / FRAMES) * text.length);
      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      setDisplay(next);

      if (frame < FRAMES) {
        timer.current = setTimeout(tick, FRAME_MS);
      } else {
        setDisplay(text);
      }
    };

    tick();
    return () => clearTimeout(timer.current);
  }, [text]);

  return <Tag className={className}>{display}</Tag>;
};

export default DecryptText;
