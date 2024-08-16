import { StaticPageWrapper } from "~/app/ui/components/common";
import parse from "html-react-parser";
import { getStaticPage } from "../actions";

export default async function Page() {
  const privacyPolicyHTML = await getStaticPage("privacy_policy");

  return (
    <StaticPageWrapper
      img={{
        alt: "Privacy policy picture",
        src: "/privacy-policy.jpeg",
      }}
      title="Privacy Policy"
      subtitle="Last modified: May 15, 2024"
    >
      {privacyPolicyHTML ? parse(privacyPolicyHTML) : "Under construction"}
    </StaticPageWrapper>
  );
}
