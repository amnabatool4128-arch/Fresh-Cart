import React from "react";

const EmptyState = ({ icon, title, subtitle, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center text-center py-20 px-6">
    {icon && <div className="mb-5 text-gray-300 dark:text-slate-600">{icon}</div>}
    <p className="text-xl font-semibold text-gray-900 dark:text-white">{title}</p>
    {subtitle && (
      <p className="text-gray-500 dark:text-slate-400 mt-2 max-w-sm text-sm">{subtitle}</p>
    )}
    {actionLabel && (
      <button
        onClick={onAction}
        className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-lg font-medium text-sm transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
