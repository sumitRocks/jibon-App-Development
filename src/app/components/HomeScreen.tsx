import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/Mock02/svg-1oxw9z5kap";
import imgProfile from "../../imports/Mock02/8ec55a7e65b48fc7bd20d99f729831ca45aebf3b.png";
import { BottomNav } from "./BottomNav";

type Screen =
  | "home"
  | "sos"
  | "hospitals"
  | "bloodbanks"
  | "contacts"
  | "medicalid"
  | "history"
  | "assistant"
  | "settings"
  | "map";

interface Props {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: Props) {
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    setHolding(true);
    setHoldProgress(0);
    const start = Date.now();
    holdTimer.current = setInterval(() => {
      const p = Math.min((Date.now() - start) / 3000, 1);
      setHoldProgress(p);
      if (p >= 1) {
        clearInterval(holdTimer.current!);
        setHolding(false);
        setHoldProgress(0);
        onNavigate("sos");
      }
    }, 30);
    holdTimeout.current = setTimeout(() => {
      onNavigate("sos");
    }, 3100);
  };

  const cancelHold = () => {
    setHolding(false);
    setHoldProgress(0);
    if (holdTimer.current) clearInterval(holdTimer.current);
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
  };

  return (
    <div
      className="relative size-full flex flex-col items-center justify-between pt-[60px]"
      style={{
        background:
          "linear-gradient(to top, #f4f4f4 0%, white 57.281%, #f67e49 88.125%)",
      }}
    >
      {/* App Bar */}
      <div className="relative w-full shrink-0">
        <div className="flex items-start justify-between px-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d={svgPaths.p34cef800} fill="white" />
            </svg>
            <div className="flex flex-col">
              <span
                className="text-white/80 tracking-tight"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 11 }}
              >
                Current Location
              </span>
              <span
                className="text-white tracking-tight"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600 }}
              >
                Park Street, Kolkata
              </span>
            </div>
          </div>
          {/* Bell */}
          <button
            className="bg-white rounded-full size-11 flex items-center justify-center shadow-md relative"
            onClick={() => onNavigate("assistant")}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M14.25 6C14.25 4.54 13.67 3.14 12.64 2.11C11.61 1.08 10.21 0.5 8.75 0.5C7.29 0.5 5.89 1.08 4.86 2.11C3.83 3.14 3.25 4.54 3.25 6C3.25 12.42 0.5 14.25 0.5 14.25H17C17 14.25 14.25 12.42 14.25 6Z"
                stroke="#1a1a2e"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(2, 2)"
              />
              <path
                d="M3.67 0.5C3.51 0.78 3.28 1.01 3 1.17C2.72 1.33 2.41 1.41 2.09 1.41C1.76 1.41 1.45 1.33 1.17 1.17C0.89 1.01 0.66 0.78 0.5 0.5"
                stroke="#1a1a2e"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(7.9, 17.5)"
              />
            </svg>
            <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {/* SOS Button area */}
      <div className="relative flex items-center justify-center" style={{ height: 235, width: 174 }}>
        {/* Outer glow rings */}
        <div
          className="absolute rounded-full"
          style={{
            width: 330,
            height: 332,
            left: -78,
            top: -49,
            background: "rgba(255,248,248,0.1)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 252,
            height: 252,
            left: -39,
            top: -9,
            background: "rgba(255,248,248,0.1)",
          }}
        />

        {/* Hold progress ring */}
        <AnimatePresence>
          {holding && (
            <svg
              className="absolute"
              width={210}
              height={210}
              style={{ left: -18, top: -18 }}
              viewBox="0 0 210 210"
            >
              <circle
                cx={105}
                cy={105}
                r={95}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={4}
              />
              <circle
                cx={105}
                cy={105}
                r={95}
                fill="none"
                stroke="white"
                strokeWidth={4}
                strokeDasharray={2 * Math.PI * 95}
                strokeDashoffset={2 * Math.PI * 95 * (1 - holdProgress)}
                strokeLinecap="round"
                transform="rotate(-90 105 105)"
              />
            </svg>
          )}
        </AnimatePresence>

        {/* SOS circle */}
        <motion.button
          className="relative rounded-full flex items-center justify-center select-none"
          style={{
            width: 178,
            height: 178,
            background: "red",
            boxShadow:
              "inset 0px 3.8px 91px 0px #fb8d33, 0px 0px 32px 0px #ff8383, 0 8px 40px rgba(255,0,0,0.5)",
            border: "2px solid rgba(255,255,255,0.5)",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
        >
          <div className="flex flex-col items-center">
            <span
              className="text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 40, fontWeight: 700, lineHeight: 1 }}
            >
              SOS
            </span>
            <span
              className="text-white/90 tracking-wide"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 600, marginTop: 4 }}
            >
              {holding
                ? `HOLD ${Math.round(holdProgress * 3)}s...`
                : "HOLD TO CALL"}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Quick Actions Grid */}
      <div className="relative w-full shrink-0">
        <div className="flex flex-col gap-2 px-3">
          {/* Row 1 */}
          <div className="flex gap-[17px]">
            {/* Call 108 */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("hospitals")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative overflow-hidden shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#amb)">
                  <path d={svgPaths.p3cc61f80} fill="#FF383C" />
                </g>
                <defs>
                  <clipPath id="amb">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="text-left">
                <p
                  className="leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "red", fontWeight: 500 }}
                >
                  Call 108
                </p>
                <p
                  className="leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "red", fontWeight: 500 }}
                >
                  (Ambulance)
                </p>
              </div>
            </motion.button>

            {/* Nearest Hospitals */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("hospitals")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="22" height="18" viewBox="0 0 21.75 18" fill="none">
                <path d={svgPaths.p14723c80} fill="black" />
              </svg>
              <p
                className="text-left"
                style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500, lineHeight: 1.2 }}
              >
                Nearest{"\n"}Hospitals
              </p>
            </motion.button>
          </div>

          {/* Row 2 */}
          <div className="flex gap-[17px]">
            {/* Blood Banks */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("bloodbanks")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d={svgPaths.p2966e080} fill="black" />
              </svg>
              <p
                style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500 }}
              >
                Blood Banks
              </p>
            </motion.button>

            {/* Emergency Contacts */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("contacts")}
              className="bg-white flex-1 h-40 rounded-[32px] flex flex-col items-start justify-between p-6 relative shadow-sm"
              style={{ border: "1.2px solid rgba(217,217,217,0.33)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d={svgPaths.pf166c00} fill="black" />
              </svg>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500, lineHeight: 1.2 }}>
                  Emergency
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 19, color: "#1a1a2e", fontWeight: 500, lineHeight: 1.2 }}>
                  Contacts
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="home" onNavigate={onNavigate} profileImg={imgProfile} />
    </div>
  );
}

