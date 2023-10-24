import React, { useRef, useState } from "react";
import "./imageModal.css";

const ImageModal = ({ image, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [modalX, setModalX] = useState(0);
  const [modalY, setModalY] = useState(0);

  const modalRef = useRef(null);

  const handleScroll = (e) => {
    // Increase or decrease the zoom level based on scroll direction
    if (e.deltaY > 0) {
      setZoomLevel((prevZoom) => prevZoom - 0.1);
    } else {
      setZoomLevel((prevZoom) => prevZoom + 0.1);
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      // Left mouse button
      setIsDragging(true);
      setDragStartX(e.clientX);
      setDragStartY(e.clientY);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const offsetX = e.clientX - dragStartX;
      const offsetY = e.clientY - dragStartY;
      setModalX((prevX) => prevX + offsetX);
      setModalY((prevY) => prevY + offsetY);
      setDragStartX(e.clientX);
      setDragStartY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="image-modal" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={modalRef}
        style={{
          transform: `translate(${modalX}px, ${modalY}px) scale(${zoomLevel})`,
          transition: "transform 0.1s ease", // Faster transition
        }}
      >
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <img src={image} alt="Profile" />
      </div>
    </div>
  );
};

export default ImageModal;
