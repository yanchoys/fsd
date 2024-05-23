import React from "react";

function NumbersCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[#F7F7F7] px-5 py-10">
      <h3 className="text-3xl font-bold text-primary">{number}</h3>
      <p className="text-md font-medium">{title}</p>
      <p className="mt-2 text-sm text-[#676D73]">{description}</p>
    </div>
  );
}

export default NumbersCard;
