// ============================================
// src/components/ui/Alert.tsx
// ============================================
import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  X,
  Loader2,
} from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info" | "loading";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  onClose,
  className = "",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="alert__icon" />;
      case "error":
        return <XCircle className="alert__icon" />;
      case "warning":
        return <AlertCircle className="alert__icon" />;
      case "info":
        return <Info className="alert__icon" />;
      case "loading":
        return <Loader2 className="alert__icon alert__icon--spin" />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert--success";
      case "error":
        return "alert--error";
      case "warning":
        return "alert--warning";
      case "info":
        return "alert--info";
      case "loading":
        return "alert--loading";
    }
  };

  return (
    <div className={`alert ${getAlertClass()} ${className}`}>
      <div className="alert__content">
        {getIcon()}
        <span className="alert__message">{message}</span>
      </div>
      {onClose && type !== "loading" && (
        <button
          onClick={onClose}
          className="alert__close"
          type="button"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ============================================
// src/components/ui/Modal.tsx
// ============================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  type?: "default" | "danger";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  type = "default",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${type === "danger" ? "modal--danger" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button onClick={onClose} className="modal__close" type="button">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

// ============================================
// src/components/ui/ConfirmDialog.tsx
// ============================================
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  type = "warning",
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`confirm-dialog confirm-dialog--${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-dialog__icon">
          {type === "danger" && <AlertCircle className="w-12 h-12" />}
          {type === "warning" && <AlertCircle className="w-12 h-12" />}
          {type === "info" && <Info className="w-12 h-12" />}
        </div>

        <div className="confirm-dialog__content">
          <h3 className="confirm-dialog__title">{title}</h3>
          <p className="confirm-dialog__message">{message}</p>
        </div>

        <div className="confirm-dialog__actions">
          <button onClick={onClose} className="btn btn-secondary" type="button">
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`btn ${type === "danger" ? "btn-danger" : "btn-primary"}`}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// src/components/ui/PromptDialog.tsx
// ============================================
interface PromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  message: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  inputType?: "text" | "number";
  min?: number;
  max?: number;
}

export const PromptDialog: React.FC<PromptDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  placeholder = "",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  inputType = "text",
  min,
  max,
}) => {
  const [value, setValue] = React.useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value);
      setValue("");
      onClose();
    }
  };

  const handleCancel = () => {
    setValue("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="prompt-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="prompt-dialog__header">
          <h3 className="prompt-dialog__title">{title}</h3>
          <button onClick={handleCancel} className="modal__close" type="button">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="prompt-dialog__content">
          <p className="prompt-dialog__message">{message}</p>
          <input
            type={inputType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="prompt-dialog__input"
            autoFocus
            min={min}
            max={max}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
              if (e.key === "Escape") handleCancel();
            }}
          />
        </div>

        <div className="prompt-dialog__actions">
          <button
            onClick={handleCancel}
            className="btn btn-secondary"
            type="button"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="btn btn-primary"
            type="button"
            disabled={!value.trim()}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// src/components/ui/StrategyDialog.tsx
// ============================================
interface StrategyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rating?: number) => void;
  strategy: {
    titre: string;
    description: string;
  };
}

export const StrategyDialog: React.FC<StrategyDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  strategy,
}) => {
  const [rating, setRating] = React.useState<number | null>(null);
  const [showRating, setShowRating] = React.useState(false);

  if (!isOpen) return null;

  const handleUse = () => {
    setShowRating(true);
  };

  const handleConfirmRating = () => {
    onConfirm(rating ?? undefined);
    setRating(null);
    setShowRating(false);
    onClose();
  };

  const handleSkipRating = () => {
    onConfirm(undefined);
    setRating(null);
    setShowRating(false);
    onClose();
  };

  const handleCancel = () => {
    setRating(null);
    setShowRating(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="strategy-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="strategy-dialog__header">
          <h3 className="strategy-dialog__title">✨ {strategy.titre}</h3>
          <button onClick={handleCancel} className="modal__close" type="button">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="strategy-dialog__content">
          {!showRating ? (
            <>
              <div className="strategy-dialog__description">
                <p>{strategy.description}</p>
              </div>
              <div className="strategy-dialog__actions">
                <button
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  type="button"
                >
                  Fermer
                </button>
                <button
                  onClick={handleUse}
                  className="btn btn-primary"
                  type="button"
                >
                  <CheckCircle className="w-4 h-4" />
                  J&apos;ai utilisé cette stratégie
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="rating-section">
                <p className="rating-section__label">
                  Comment évaluez-vous l&apos;efficacité de cette stratégie ?
                </p>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`rating-star ${rating && rating >= star ? "rating-star--active" : ""}`}
                      type="button"
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                {rating && (
                  <p className="rating-value">Note sélectionnée: {rating}/5</p>
                )}
              </div>
              <div className="strategy-dialog__actions">
                <button
                  onClick={handleSkipRating}
                  className="btn btn-secondary"
                  type="button"
                >
                  Passer
                </button>
                <button
                  onClick={handleConfirmRating}
                  className="btn btn-primary"
                  type="button"
                  disabled={!rating}
                >
                  Valider l&apos;évaluation
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
