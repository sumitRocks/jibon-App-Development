import { useState } from "react";
import { ChevronLeft, Search, MapPin, Clock, Bed, Phone } from "lucide-react";
import { BottomNav } from "./BottomNav";

const FILTERS = ["All", "Trauma", "Cardiac", "Stroke", "Children", "Maternity", "Govt", "Private"];

const HOSPITALS = [
  {
    id: 1,
    name: "SSKM Hospital",
    nameBn: "এসএসকেএম হাসপাতাল",
    distance: "0.8 km",
    eta: "4 min",
    emergency: true,
    icu: "12/20",
    beds: "45 available",
    wait: "~15 min",
    type: ["Govt", "Trauma", "Cardiac", "Stroke"],
    rating: 4.2,
    address: "244, A.J.C. Bose Road, Kolkata",
  },
  {
    id: 2,
    name: "Medical College Hospital",
    nameBn: "মেডিকেল কলেজ হাসপাতাল",
    distance: "1.4 km",
    eta: "7 min",
    emergency: true,
    icu: "8/15",
    beds: "23 available",
    wait: "~25 min",
    type: ["Govt", "Trauma", "Children", "Maternity"],
    rating: 4.0,
    address: "88, College Street, Kolkata",
  },
  {
    id: 3,
    name: "Apollo Gleneagles",
    nameBn: "অ্যাপোলো গ্লেনেগলস",
    distance: "2.1 km",
    eta: "10 min",
    emergency: true,
    icu: "5/10",
    beds: "18 available",
    wait: "~10 min",
    type: ["Private", "Cardiac", "Stroke"],
    rating: 4.7,
    address: "58, Canal Circular Rd, Kolkata",
  },
  {
    id: 4,
    name: "Fortis Hospital",
    nameBn: "ফোর্টিস হাসপাতাল",
    distance: "3.2 km",
    eta: "14 min",
    emergency: true,
    icu: "6/12",
    beds: "31 available",
    wait: "~20 min",
    type: ["Private", "Trauma", "Cardiac"],
    rating: 4.5,
    address: "730, Anandapur, Kolkata",
  },
  {
    id: 5,
    name: "Park Clinic",
    nameBn: "পার্ক ক্লিনিক",
    distance: "1.9 km",
    eta: "9 min",
    emergency: false,
    icu: "4/8",
    beds: "10 available",
    wait: "~30 min",
    type: ["Private", "Maternity", "Children"],
    rating: 4.3,
    address: "4, Gorky Terrace, Kolkata",
  },
];

type Screen = string;

interface Props {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function HospitalsScreen({ onBack, onNavigate }: Props) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = HOSPITALS.filter((h) => {
    const matchesFilter = filter === "All" || h.type.includes(filter);
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="size-full flex flex-col bg-[#f8f8fa]">
      {/* Header */}
      <div className="shrink-0 bg-white pt-14 pb-4 px-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-1 -ml-1 text-gray-600">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>
              Nearest Hospitals
            </h1>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>নিকটতম হাসপাতাল · Park Street, Kolkata</p>
          </div>
          <div className="ml-auto flex gap-1 bg-gray-100 rounded-xl p-1">
            <button
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                background: view === "list" ? "#f67e49" : "transparent",
                color: view === "list" ? "white" : "#6b7280",
              }}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                background: view === "map" ? "#f67e49" : "transparent",
                color: view === "map" ? "white" : "#6b7280",
              }}
              onClick={() => setView("map")}
            >
              Map
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          <Search size={16} className="text-gray-400" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="shrink-0 px-3 py-1.5 rounded-xl text-xs transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: filter === f ? 700 : 500,
                background: filter === f ? "#f67e49" : "#f0f0f4",
                color: filter === f ? "white" : "#6b7280",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === "map" ? (
        <div className="flex-1 relative" style={{ background: "#e8f0ec" }}>
          {/* Fake map */}
          <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
            {[10, 25, 40, 55, 70, 85].map((y) => (
              <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#666" strokeWidth="1" />
            ))}
            {[15, 30, 45, 60, 75, 90].map((x) => (
              <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#666" strokeWidth="1" />
            ))}
            <line x1="10%" y1="20%" x2="80%" y2="70%" stroke="#888" strokeWidth="3" strokeLinecap="round" />
            <line x1="30%" y1="10%" x2="70%" y2="90%" stroke="#888" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {/* Pins */}
          {[
            { x: "50%", y: "55%", label: "You", color: "#ff3b30" },
            { x: "38%", y: "38%", label: "SSKM", color: "#f67e49" },
            { x: "62%", y: "42%", label: "Apollo", color: "#f67e49" },
            { x: "44%", y: "68%", label: "Fortis", color: "#f67e49" },
          ].map((pin) => (
            <div key={pin.label} className="absolute flex flex-col items-center" style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -100%)" }}>
              <div
                className="rounded-full size-8 flex items-center justify-center text-white shadow-lg border-2 border-white"
                style={{ background: pin.color, fontSize: 8, fontWeight: 700, fontFamily: "Inter" }}
              >
                {pin.label === "You" ? "📍" : "H"}
              </div>
              <div className="mt-1 bg-white/90 rounded px-1.5 py-0.5 shadow text-xs" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 9 }}>{pin.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {filtered.map((h) => (
            <div key={h.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#1a1a2e" }}>{h.name}</h3>
                    {h.emergency && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-lg" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>24/7</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{h.nameBn}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-gray-400" />
                    <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{h.address}</p>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <p className="text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#f67e49" }}>{h.distance}</p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{h.eta} away</p>
                </div>
              </div>

              <div className="flex gap-2 mb-3 flex-wrap">
                {h.type.map((t) => (
                  <span key={t} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg" style={{ fontFamily: "Inter, sans-serif" }}>{t}</span>
                ))}
              </div>

              <div className="flex gap-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <Bed size={13} className="text-gray-400" />
                  <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>{h.beds}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>ICU:</span>
                  <span className="text-xs text-gray-600" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{h.icu}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />
                  <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>{h.wait}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-sm"
                  style={{ background: "#f67e49", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  <Phone size={14} />
                  Call Now
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm border border-gray-200 text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  <MapPin size={14} />
                  Directions
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p style={{ fontFamily: "Inter, sans-serif" }}>No hospitals found</p>
            </div>
          )}
          <div className="h-4" />
        </div>
      )}

      <BottomNav active="map" onNavigate={onNavigate} />
    </div>
  );
}
