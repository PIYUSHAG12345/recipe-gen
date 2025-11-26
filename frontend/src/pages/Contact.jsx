// frontend/src/pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Contact us</h1>
      <p className="text-sm text-gray-600 mb-4">
        This is an assignment project. For any feedback or issues, you can imagine this contact
        form sends an email 🙂
      </p>
      <form className="bg-white rounded-2xl shadow-sm p-5 space-y-3 text-sm">
        <div>
          <label className="font-medium text-gray-700">Your email</label>
          <input
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="font-medium text-gray-700">Message</label>
          <textarea
            rows={4}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Write your feedback here..."
          />
        </div>
        <button
          type="button"
          className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        >
          Send (demo)
        </button>
      </form>
    </div>
  );
}
