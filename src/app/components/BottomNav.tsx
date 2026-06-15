import svgPaths from "../../imports/Mock02/svg-1oxw9z5kap";

type Screen =
  | "home" | "sos" | "hospitals" | "bloodbanks" | "contacts"
  | "medicalid" | "history" | "assistant" | "settings" | "map";

interface BottomNavProps {
  active: string;
  onNavigate: (screen: Screen) => void;
  profileImg?: string;
}

export function BottomNav({ active, onNavigate, profileImg }: BottomNavProps) {
  const activeColor = "#F67E49";
  const inactiveColor = "#9CA3AF";

  return (
    <div
      className="w-full backdrop-blur-[22px] bg-white/95 shrink-0"
      style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center justify-between pb-8 pt-4 px-7">
        {/* Home */}
        <button className="flex flex-col items-center gap-0.5" onClick={() => onNavigate("home")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d={svgPaths.p550ea80} fill={active === "home" ? activeColor : inactiveColor} />
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: active === "home" ? activeColor : inactiveColor, fontWeight: 500 }}>Home</span>
          {active === "home" && <span className="size-1.5 rounded-full" style={{ background: activeColor }} />}
        </button>

        {/* Map/Hosp */}
        <button className="flex flex-col items-center gap-0.5" onClick={() => onNavigate("map")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d={svgPaths.p3969ed70} stroke={active === "map" ? activeColor : inactiveColor} />
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: active === "map" ? activeColor : inactiveColor, fontWeight: 500 }}>Map/Hosp</span>
          {active === "map" && <span className="size-1.5 rounded-full" style={{ background: activeColor }} />}
        </button>

        {/* ID Card */}
        <button className="flex flex-col items-center gap-0.5" onClick={() => onNavigate("medicalid")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d={svgPaths.p3fbc1380} stroke={active === "medicalid" ? activeColor : inactiveColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p2032bb00} stroke={active === "medicalid" ? activeColor : inactiveColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: active === "medicalid" ? activeColor : inactiveColor, fontWeight: 500 }}>ID Card</span>
          {active === "medicalid" && <span className="size-1.5 rounded-full" style={{ background: activeColor }} />}
        </button>

        {/* History */}
        <button className="flex flex-col items-center gap-0.5" onClick={() => onNavigate("history")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d={svgPaths.p2606a200} stroke={active === "history" ? activeColor : inactiveColor} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
            <path d={svgPaths.pc38d600} stroke={active === "history" ? activeColor : inactiveColor} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: active === "history" ? activeColor : inactiveColor, fontWeight: 500 }}>History</span>
          {active === "history" && <span className="size-1.5 rounded-full" style={{ background: activeColor }} />}
        </button>

        {/* Settings */}
        <button className="flex flex-col items-center gap-0.5" onClick={() => onNavigate("settings")}>
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 24, height: 24, border: active === "settings" ? `2px solid ${activeColor}` : "2px solid #e5e7eb" }}
          >
            {profileImg ? (
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">P</div>
            )}
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: active === "settings" ? activeColor : inactiveColor, fontWeight: 500 }}>Settings</span>
          {active === "settings" && <span className="size-1.5 rounded-full" style={{ background: activeColor }} />}
        </button>
      </div>
    </div>
  );
}
