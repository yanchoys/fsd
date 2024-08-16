import toast from "react-hot-toast";
import dayjs from "dayjs";

export const truncateText = (text: string, includedLetters: number) => {
  return (
    text.substring(0, includedLetters) +
    (text.length > includedLetters ? "..." : "")
  );
};

export const capitalize = (word: string) => {
  return `${word.at(0)?.toUpperCase()}${word.substring(1).toLowerCase()}`;
};

export const formatDateMMMDD = (date: Date | string) => {
  return dayjs(date).format("MMM DD");
};

export const formatDateMMM_DD_YYYY = (date: Date | string) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getCurrentDates = () => {
  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().add(6, "day").format("YYYY-MM-DD");
  return { startDate, endDate };
};

export const removeEmptyValues = (
  obj: Record<string, string | number | null | undefined>,
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== "" && v !== null),
  );
};

export function toastNotifier(errorMessage: string | undefined) {
  if (!errorMessage) {
    toast.success("Success", {
      duration: 8000,
      position: "top-center",
    });
  } else {
    toast.error(errorMessage ?? "Something went wrong", {
      duration: 8000,
      position: "top-center",
    });
  }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
