// frontend/src/components/Spinner.jsx
import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
