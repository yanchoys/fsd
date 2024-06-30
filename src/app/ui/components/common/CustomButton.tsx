import React from "react";

function CustomButton({ label, width }: { label: string; width: number }) {
  return (
    <button
      className={`rounded-[48px] bg-primary px-6 py-4 text-white`}
      style={{
        width: width,
      }}
    >
      {label}
    </button>
  );
}

export default CustomButton;
