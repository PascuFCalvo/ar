// This file will contain the popup logic for mobile view for TrabajoCard
export function showPopup(content, onClose) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "trabajo-popup-overlay";
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      onClose();
      document.body.removeChild(overlay);
    }
  };

  // Create popup
  const popup = document.createElement("div");
  popup.className = "trabajo-popup";
  popup.innerHTML = content;

  // Add close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "trabajo-popup-close";
  closeBtn.innerText = "×";
  closeBtn.onclick = () => {
    onClose();
    document.body.removeChild(overlay);
  };
  popup.appendChild(closeBtn);

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
