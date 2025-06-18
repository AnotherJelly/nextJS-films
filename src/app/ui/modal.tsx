'use client';

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode; }) {
  if (!open) return (
    <div className="modal-overlay"></div>
  );

  return (
    <div className="modal-overlay open">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}
