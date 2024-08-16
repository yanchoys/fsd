import Image from "next/image";
import parse from "html-react-parser";

import { SearchCard } from "../../../ui/components/home/SearchCard";
import NewsletterForm from "~/app/ui/components/common/Newsletter/NewsletterForm";
import { getBlogContent, getLocationsList } from "../../actions";
import { redirect } from "next/navigation";

const BlogSidebar = async () => {
  const locationsList = (await getLocationsList())!;

  return (
  <div className="md:mt-24 flex-col gap-5 -m-3">
  <div className="flex h-min flex-col gap-5 justify-center items-center rounded-[10px] bg-[#F7F7F7] p-6">
    <h5 className="text-2xl font-medium">
      Find your perfect place now
    </h5>
    <SearchCard size="big" locationsList={locationsList} />
  </div>
  <div className="flex h-min flex-col gap-5 rounded-[10px] bg-[#F7F7F7] p-6 mt-5">
    <NewsletterForm isTextBlack={true} />
    <div className="flex h-[190px] w-full shrink-0">
      <Image
        alt="Blog image"
        src="/newsletter_img.jpeg"
        className="rounded-sm"
        quality={10}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          objectFit: "cover",
          height: "190px",
          width: "100%",
        }}
      />
    </div>
  </div>
</div>
)}

export default async function Blogpage({params} : {params: {id:string}}) {
  const currentBlogsHTML = await getBlogContent(params.id)
  
  if (!currentBlogsHTML) {
    return redirect('/404')
  }

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] flex-col items-center justify-center">
          <div className="flex-col md:flex lg:flex-row gap-10 p-10">
            {parse(currentBlogsHTML)}
            <BlogSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}