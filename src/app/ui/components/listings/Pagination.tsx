"use client";

import Link from "next/link";
import { generatePagination } from "~/app/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("pageNum")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageNum", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = `flex h-12 w-12 items-center justify-center text-sm border 
    ${position === "first" || position === "single" ? "rounded-l-md" : ""} 
    ${position === "last" || position === "single" ? "rounded-r-md" : ""} 
    ${isActive ? "z-10 bg-primary border-primary text-white" : ""} 
    ${!isActive && position !== "middle" ? "hover:bg-gray-100" : ""} 
    ${position === "middle" ? "text-gray-300" : ""}`;

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = `flex h-12 w-12 items-center justify-center rounded-md border 
    ${isDisabled ? "pointer-events-none text-gray-300" : ""} 
    ${!isDisabled ? "hover:bg-gray-100" : ""} 
    ${direction === "left" ? "mr-2" : ""} 
    ${direction === "right" ? "ml-2" : ""}`;

  const icon =
    direction === "left" ? (
      <ArrowBackIcon className="w-4" />
    ) : (
      <ArrowForwardIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
