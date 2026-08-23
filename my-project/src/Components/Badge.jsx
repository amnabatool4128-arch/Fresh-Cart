import React from "react";

const VARIANTS = {
  success: "bg-primary/10 text-primary",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  neutral: "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300",
  danger: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const Badge = ({ children, variant = "neutral" }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${VARIANTS[variant]}`}
  >
    {children}
  </span>
);

export default Badge;
