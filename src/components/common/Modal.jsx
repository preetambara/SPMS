import Icon from "../Icon";

export function Modal({ open, title, subtitle, onClose, children, footer, width = 560 }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        style={{ width }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-head">
          <div>
            <h3 style={{ fontSize: 16.5 }}>{title}</h3>
            {subtitle && (
              <p className="muted" style={{ fontSize: 13, marginTop: 3 }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
