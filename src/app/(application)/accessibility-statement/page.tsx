import { StaticPageWrapper } from "~/app/ui/components/common";
import { getStaticPage } from "../actions";
import parse from "html-react-parser";

export default async function Page() {
  const accessibilityHTML = await getStaticPage("accessibility_statement");

  return (
    <StaticPageWrapper
      img={{
        alt: "Accessibility statement picture",
        src: "/accessibility-statement.jpeg",
      }}
      title="Accessibility Statement"
      subtitle="Last modified: May 15, 2024"
    >
      {accessibilityHTML ? parse(accessibilityHTML) : "Under construction"}
    </StaticPageWrapper>
  );
}
