import React from "react";

export default function ErrorMessage({ errorMsg }) {
  if (!errorMsg) return null;
  return (
    <div className="text-red-400 bg-red-900 p-2 rounded-lg w-fit">
      {errorMsg}
    </div>
  );
}
