import React from "react";
import { toast } from "sonner";

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Success Toast
export const showSuccessToast = (message: string, options: ToastOptions = {}) => {
  const { duration = 3000, action } = options;
  
  return toast.success(
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <i className="fa-solid fa-check text-green-600 text-sm"></i>
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      duration,
      action,
      style: {
        background: "white",
        border: "1px solid #10b981",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)",
        padding: "16px",
      },
    }
  );
};

// Error Toast
export const showErrorToast = (message: string, options: ToastOptions = {}) => {
  const { duration = 4000, action } = options;
  
  return toast.error(
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <i className="fa-solid fa-times text-red-600 text-sm"></i>
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      duration,
      action,
      style: {
        background: "white",
        border: "1px solid #ef4444",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(239, 68, 68, 0.15)",
        padding: "16px",
      },
    }
  );
};

// Info Toast
export const showInfoToast = (message: string, options: ToastOptions = {}) => {
  const { duration = 3000, action } = options;
  
  return toast.info(
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <i className="fa-solid fa-info text-blue-600 text-sm"></i>
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      duration,
      action,
      style: {
        background: "white",
        border: "1px solid #3b82f6",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)",
        padding: "16px",
      },
    }
  );
};

// Warning Toast
export const showWarningToast = (message: string, options: ToastOptions = {}) => {
  const { duration = 4000, action } = options;
  
  return toast.warning(
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
        <i className="fa-solid fa-exclamation text-yellow-600 text-sm"></i>
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      duration,
      action,
      style: {
        background: "white",
        border: "1px solid #f59e0b",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(245, 158, 11, 0.15)",
        padding: "16px",
      },
    }
  );
};

// Loading Toast
export const showLoadingToast = (message: string) => {
  return toast.loading(
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{message}</p>
      </div>
    </div>,
    {
      position: "top-center",
      style: {
        background: "white",
        border: "1px solid #6b7280",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(107, 114, 128, 0.15)",
        padding: "16px",
      },
    }
  );
};
