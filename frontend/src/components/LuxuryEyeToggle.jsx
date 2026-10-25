import React from "react";

/**
 * LuxuryEyeToggle
 * A bespoke, haute-couture eyelid toggle for password visibility.
 * - Open State: Sculpted almond eye with iris glint.
 * - Closed State: Graceful sleeping eyelid with couture lashes.
 */
const LuxuryEyeToggle = ({ show, onToggle, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Conceal password" : "Reveal password"}
      title={show ? "Conceal password" : "Reveal password"}
      className={`p-1.5 rounded-full text-[#7c766f] hover:text-[#72252e] hover:bg-[#ede0d7]/40 active:scale-90 transition-all duration-200 cursor-pointer flex items-center justify-center ${className}`}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 ease-out"
      >
        {show ? (
          // OPEN EYE: Haute almond contour with centered iris and light catch
          <g className="transition-all duration-300">
            {/* Eye contour */}
            <path
              d="M2.5 12C4.5 7 8 4.5 12 4.5C16 4.5 19.5 7 21.5 12C19.5 17 16 19.5 12 19.5C8 19.5 4.5 17 2.5 12Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Iris outer ring */}
            <circle
              cx="12"
              cy="12"
              r="3.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Pupil */}
            <circle
              cx="12"
              cy="12"
              r="1.6"
              fill="currentColor"
            />
            {/* Light catch reflection */}
            <circle
              cx="13.2"
              cy="10.8"
              r="0.7"
              fill="#ffffff"
            />
          </g>
        ) : (
          // CLOSED EYE: Elegant sleeping eyelid with couture lashes
          <g className="transition-all duration-300">
            {/* Closed curved lid */}
            <path
              d="M3 10.5C5.5 15.5 8.5 17.5 12 17.5C15.5 17.5 18.5 15.5 21 10.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Center lash */}
            <path
              d="M12 17.5V20.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Left inner lash */}
            <path
              d="M8 16.5L6.5 19.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Right inner lash */}
            <path
              d="M16 16.5L17.5 19.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Left outer lash */}
            <path
              d="M4.5 13L3.2 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Right outer lash */}
            <path
              d="M19.5 13L20.8 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </button>
  );
};

export default LuxuryEyeToggle;
