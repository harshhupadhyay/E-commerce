import React from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  // If no image is selected, don't render anything
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "zoom-out",
      }}
    >
      {/* Click image or close button */}
      <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-30px",
            right: "0px",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <img
          src={imageUrl}
          alt="Enlarged view"
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "6px",
          }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
