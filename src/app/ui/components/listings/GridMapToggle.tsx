import React, { type Dispatch, type SetStateAction } from "react";
import { type DateRangeType } from "../home/SearchCard";
import Image from "next/image";

function GridMapToggle({
  isMapMode,
  setIsMapMode,
  updateSearchParams,
}: {
  isMapMode: boolean;
  setIsMapMode: Dispatch<SetStateAction<boolean>>;
  updateSearchParams: (
    params: string[],
    values: string[] | DateRangeType,
  ) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-3xl border-2 bg-white shadow-xl">
      <button
        className={`flex-1 rounded-3xl p-2 pl-3 !text-primary transition-all duration-300 ease-in-out ${
          !isMapMode && "bg-primary text-white"
        }`}
        onClick={() => {
          if (isMapMode !== false) {
            setIsMapMode(false);
            updateSearchParams(["isMapMode"], ["false"]);
          }
        }}
      >
        <Image
          width={18}
          height={18}
          src="/grid_mode.svg"
          alt="Grid mode"
          className="transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </button>
      <button
        className={`flex-1 rounded-3xl p-2 pl-3 !text-primary transition-all duration-300 ease-in-out ${
          isMapMode && "bg-primary text-white"
        }`}
        onClick={() => {
          if (isMapMode !== true) {
            setIsMapMode(true);
            updateSearchParams(["isMapMode"], ["true"]);
          }
        }}
      >
        <Image
          width="18"
          height="18"
          src="/map_mode.svg"
          alt="Map mode"
          className="transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </button>
    </div>
  );
}

export default GridMapToggle;
