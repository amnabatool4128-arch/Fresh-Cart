import React from "react";

const QuantityStepper = ({ quantity, onIncrease, onDecrease, size = "md" }) => {
  const height = size === "sm" ? "h-8" : "h-9";

  return (
    <div
      className={`inline-flex items-center gap-3 bg-surface dark:bg-slate-700 rounded-lg select-none ${height}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="cursor-pointer px-3 h-full text-gray-600 dark:text-slate-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded transition-colors"
      >
        -
      </button>
      <span className="w-4 text-center text-sm font-medium text-gray-800 dark:text-white">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="cursor-pointer px-3 h-full text-gray-600 dark:text-slate-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
