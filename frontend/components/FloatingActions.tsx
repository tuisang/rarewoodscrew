"use client";

import { useState } from "react";

export default function FloatingActions() {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const phone = "+254726461196";
  const whatsappMsg = encodeURIComponent("Hello Rarewoods Crew! I would like to enquire about your woodworking services.");

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      {/* Phone reveal panel */}
      {phoneVisible && (
        <div
          style={{
            background: "#32302c",
            border: "1px solid rgba(216,160,91,0.3)",
            borderLeft: "3px solid #994700",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "fade-up 0.25s ease forwards",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: "10px", color: "#8c7263", letterSpacing: "0.12em", fontFamily: "Libre Franklin, sans-serif" }}>
              CALL US
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "15px", fontWeight: 700, color: "#994700", letterSpacing: "0.02em" }}>
              {phone}
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {/* Copy */}
            <button
              onClick={copyPhone}
              title="Copy number"
              style={{
                background: copied ? "#4ade80" : "#f3ede6",
                border: "1px solid #e0c0af",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14532d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              )}
            </button>
            {/* Call link */}
            <a
              href={`tel:${phone}`}
              title="Call now"
              style={{
                background: "#f3ede6",
                border: "1px solid #e0c0af",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            {/* Close */}
            <button
              onClick={() => setPhoneVisible(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8c7263",
                fontSize: "16px",
                padding: "0 4px",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Buttons Row */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

        {/* Phone Button */}
        <button
          onClick={() => setPhoneVisible(!phoneVisible)}
          title="Call us"
          style={{
            width: "52px",
            height: "52px",
            background: phoneVisible ? "#994700" : "#fef8f1",
            border: `2px solid ${phoneVisible ? "#994700" : "rgba(130,85,22,0.4)"}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            if (!phoneVisible) {
              e.currentTarget.style.background = "#f3ede6";
              e.currentTarget.style.borderColor = "#994700";
            }
          }}
          onMouseLeave={(e) => {
            if (!phoneVisible) {
              e.currentTarget.style.background = "#fef8f1";
              e.currentTarget.style.borderColor = "rgba(130,85,22,0.4)";
            }
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={phoneVisible ? "#ffffff" : "#994700"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </button>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${phone.replace("+", "")}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          style={{
            width: "52px",
            height: "52px",
            background: "#25D366",
            border: "2px solid #25D366",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#20c05a";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#25D366";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {/* WhatsApp SVG icon */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

