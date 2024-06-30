import React from "react";

function CustomIconBackground({ children }: { children: React.ReactElement }) {
  return (
    <div className="flex items-center justify-center rounded-full bg-primary bg-opacity-10 p-4">
      {children}
    </div>
  );
}

export default CustomIconBackground;
