import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, MessageSquare, Share2, X, ChevronLeft } from "lucide-react";

type Screen = string;

interface Props {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const STATUS_STEPS = [
  { id: 0, label: "Request Received", labelBn: "অনুরোধ গৃহীত হয়েছে", done: true },
  { id: 1, label: "Ambulance Assigned", labelBn: "অ্যাম্বুলেন্স নিযুক্ত", done: true },
  { id: 2, label: "En Route", labelBn: "পথে আছে", done: false, active: true },
  { id: 3, label: "Patient Picked Up", labelBn: "রোগী নেওয়া হচ্ছে", done: false },
  { id: 4, label: "Arrived at Hospital", labelBn: "হাসপাতালে পৌঁছেছে", done: false },
  { id: 5, label: "Case Closed", labelBn: "কেস বন্ধ", done: false },
];

export function SOSScreen({ onBack }: Props) {
  const [step, setStep] = useState(2);
  const [eta, setEta] = useState(7);
  const [showCancel, setShowCancel] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setEta((e) => Math.max(0, e - 1));
    }, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="size-full flex flex-col bg-white relative overflow-hidden">
      {/* Header */}
      <div className="relative shrink-0" style={{ background: "linear-gradient(135deg, #ff3b30 0%, #ff6b35 100%)", paddingTop: 56, paddingBottom: 24, paddingInline: 24 }}>
        <button onClick={onBack} className="absolute top-14 left-4 text-white/80 p-1">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <p className="text-white/80 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Emergency Response</p>
          <h1 className="text-white text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>SOS Activated</h1>
          <p className="text-white/70 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>জরুরি প্রতিক্রিয়া সক্রিয়</p>
        </div>

        {/* Pulse animation */}
        <div className="flex justify-center mt-6 relative">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-white/40"
              style={{ width: 80, height: 80 }}
              animate={{ scale: [1, 2.5 + i * 0.5], opacity: [0.6, 0] }}
              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          <div className="size-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center z-10">
            <span className="text-white text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>SOS</span>
          </div>
        </div>
      </div>

      {/* Content scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* ETA Card */}
        <div className="bg-red-50 rounded-3xl p-5 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Estimated Arrival</p>
              <p className="text-4xl text-red-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>
                {eta} <span className="text-lg font-medium">min</span>
              </p>
            </div>
            <div className="bg-red-600 rounded-2xl px-4 py-3 text-white text-center">
              <p className="text-xs opacity-80" style={{ fontFamily: "Inter, sans-serif" }}>Distance</p>
              <p className="text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>2.3 km</p>
            </div>
          </div>
        </div>

        {/* Ambulance details */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Assigned Ambulance</p>
          <div className="space-y-3">
            {[
              { label: "Vehicle No.", value: "WB 23 AB 4521" },
              { label: "Driver", value: "Rahul Mondal" },
              { label: "EMT", value: "Dr. Priya Chatterjee" },
              { label: "Type", value: "ALS Ambulance" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                <span className="text-sm text-gray-900" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ height: 160, background: "linear-gradient(135deg, #e8f4f8 0%, #dce8f0 100%)" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            {/* Fake map grid */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
              {[20, 40, 60, 80].map((y) => (
                <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#888" strokeWidth="1" />
              ))}
              {[20, 40, 60, 80].map((x) => (
                <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#888" strokeWidth="1" />
              ))}
            </svg>
            {/* Ambulance dot */}
            <motion.div
              className="absolute size-4 bg-orange-500 rounded-full border-2 border-white shadow-md"
              animate={{ x: [0, 30, 55], y: [0, -20, -40] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ bottom: "40%", left: "30%" }}
            />
            {/* You dot */}
            <div className="absolute size-5 bg-red-600 rounded-full border-2 border-white shadow-md" style={{ bottom: "25%", right: "30%" }}>
              <motion.div className="absolute -inset-2 rounded-full bg-red-400/40" animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
            <p className="text-xs text-gray-500 mt-2 relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>Live Tracking Active</p>
          </div>
        </div>

        {/* Status timeline */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Status Timeline</p>
          <div className="space-y-3">
            {STATUS_STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="size-4 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      background: s.done ? "#f67e49" : s.active ? "#ff3b30" : "#e5e7eb",
                    }}
                  >
                    {(s.done || s.active) && <div className="size-2 rounded-full bg-white" />}
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div className="w-0.5 h-6 mt-1" style={{ background: s.done ? "#f67e49" : "#e5e7eb" }} />
                  )}
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: s.active ? 700 : 400,
                      color: s.done || s.active ? "#1a1a2e" : "#9ca3af",
                    }}
                  >
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>{s.labelBn}</p>
                  {s.active && (
                    <motion.span
                      className="text-xs text-red-500"
                      animate={{ opacity: [1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      ● In Progress
                    </motion.span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family alert */}
        <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3 border border-green-100">
          <div className="size-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">✓</div>
          <div>
            <p className="text-sm text-green-800" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Family Notified</p>
            <p className="text-xs text-green-600" style={{ fontFamily: "Inter, sans-serif" }}>3 contacts received live tracking link</p>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Action Buttons */}
      <div className="shrink-0 bg-white px-5 pt-3 pb-8 flex gap-3 border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#f67e49] text-white rounded-2xl py-3.5"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14 }}>
          <Phone size={16} />
          Call Ambulance
        </button>
        <button className="size-12 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-600">
          <MessageSquare size={18} />
        </button>
        <button className="size-12 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-600">
          <Share2 size={18} />
        </button>
        <button
          onClick={() => setShowCancel(true)}
          className="size-12 flex items-center justify-center bg-red-50 rounded-2xl text-red-500">
          <X size={18} />
        </button>
      </div>

      {/* Cancel modal */}
      {showCancel && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowCancel(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Cancel Emergency?</h3>
            <p className="text-sm text-gray-500 mb-5" style={{ fontFamily: "Inter, sans-serif" }}>Are you sure you want to cancel? The ambulance has already been dispatched.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 py-3 bg-gray-100 rounded-2xl text-gray-700"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                Keep Active
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-red-500 text-white rounded-2xl"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
