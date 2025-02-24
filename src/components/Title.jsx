import React from "react";

export default function Title({ title }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="bg-primary w-4 h-10 rounded-sm"></div>
      <h1 className="text-lg font-medium text-primary">{title}</h1>
    </div>
  );
}
