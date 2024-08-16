import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" flex h-[calc(100vh_-_436px)] flex-col items-center justify-center">
      <p className="text-center text-9xl font-bold text-primary">404</p>
      <div className="py-3 text-center text-3xl font-medium">
        Looks like you are lost.
      </div>
      <h6 className="max-w-[410px] text-wrap text-center text-[#676D73]">
        We can’t seem to find the page you’re looking for. Try searching for
        something else.
      </h6>
      <Link href="/">
        <button className="mt-4 rounded-full bg-primary px-4 py-2 text-sm text-white transition-colors">
          Go Home
        </button>
      </Link>
    </main>
  );
}
