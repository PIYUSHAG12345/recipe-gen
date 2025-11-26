// frontend/src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} SmartRecipe. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="mailto:support@smartrecipe.com" className="hover:text-blue-600">
            support@smartrecipe.com
          </a>
          <span>·</span>
          <span>Made for assignment ✔️</span>
        </div>
      </div>
    </footer>
  );
}
