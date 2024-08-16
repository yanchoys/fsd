import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <main className="flex flex-col">
      <div className="flex h-screen items-center">
        <CircularProgress disableShrink sx={{ color: "primary" }} />
      </div>
    </main>
  );
}
