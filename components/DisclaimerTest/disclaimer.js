import React from "react";

const TermsOfUse = () => {
  return (
    <>
      <style>
        {`
          ol {
            list-style-type: decimal; /* Ensures numbers appear */
            margin: 1rem 0;
            padding-left: 2rem;
          }
          li {
            margin-bottom: 0.5rem;
            line-height: 1.5;
          }
        `}
      </style>

      {/* Center the entire content */}
      <div className="flex items-center justify-center pt-16">
        <div className="md:w-11/12 w-full overflow-hidden p-4">
          <p>
            The Bar Council of India does not permit advertisement or
            solicitation by advocates in any form or manner. By accessing this
            website,{" "}
            <a
              style={{ color: "#E6321B" }}
              href="https://www.aarnalaw.com/"
            >
              https://www.aarnalaw.com
            </a>
            , you acknowledge and confirm that you are seeking information
            relating to Aarna Law of your own accord and that there has been no
            form of solicitation, advertisement or inducement by Aarna Law or
            its members. The content of this website is for informational
            purposes only and should not be interpreted as soliciting or
            advertisement. By accessing the website of{" "}
            <a
              style={{ color: "#E6321B" }}
              href="https://www.aarnalaw.com/"
            >
              https://www.aarnalaw.com
            </a>
            , you hereby acknowledge the following:
          </p>

          <ol>
            <li>You are visiting the Aarna Law website, with your own free will.</li>
            <li>
              You further acknowledge that Aarna Law is in no manner advertising
              or soliciting their work and the content posted on this website is
              only for information purposes and not for the purpose of
              advertising.
            </li>
            <li>
              You are visiting this website with an intent to acquire
              information about our law firm and the services we provide.
            </li>
            <li>
              Any information or article posted by Aarna Law on this website in
              no manner amounts to a Legal opinion/advice. Accordingly, Aarna
              Law takes no responsibility/ liability for any act done by you as
              a consequence of you relying on the matter/information posted on
              this website.
            </li>
            <li>
              Any information obtained or material downloaded from this website
              is completely at the user’s volition, and any transmission,
              receipt or use of this website is not intended to and will not
              create any lawyer-client relationship.
            </li>
            <li>
              Information on this website may not constitute the most up-to-date
              legal or other information.
            </li>
            <li>
              Third party links contained on this website re-directing users to
              such third-party websites should neither be construed as legal
              reference / legal advice, nor considered as referrals to,
              endorsements of, or affiliations with, any such third party
              website operators.
            </li>
            <li>
              The communication platform provided on this website should not be
              used for exchange of any confidential, business or politically
              sensitive information.
            </li>
            <li>The contents of this website are the intellectual property of Aarna Law.</li>
            <li>
              We prioritize your privacy. Before proceeding, we encourage you to
              read our privacy policy, which outlines the below, and terms of
              use to understand how we handle your data:
              <ol style={{ listStyleType: "lower-alpha" }}>
                <li>The types of information we collect and why we collect them.</li>
                <li>How we use your information to provide a personalized experience.</li>
                <li>The measures we take to ensure the security of your data.</li>
                <li>Your rights and choices in managing your personal information.</li>
                <li>
                  How we may share information with trusted partners for specific
                  purpose.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
