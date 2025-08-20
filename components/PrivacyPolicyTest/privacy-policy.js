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
          .para{
          padding-left: 1rem;
          }
        `}
      </style>

      {/* Center the entire content */}
      <div className="flex items-center justify-center pt-16">
        <div className="md:w-11/12 w-full overflow-hidden p-4">
          <p className="py-3">
            Aarna Law ("<b>Aarna</b>", "<b>we</b>", "<b>our</b>", or "<b>us</b>") is committed to protecting your privacy.
            This Privacy Policy ("<b>Policy</b>") describes how we collect, use, disclose, and protect personal information
            provided to us or collected through our website located at <a style={{color: "#e6321b"}} href="https://www.aarnalaw.com/" target="_blank">https://www.aarnalaw.com</a> (the “<b>Website</b>”).
          </p>
          <p>
            By accessing or using our Website, you agree to the terms of this Policy and consent to our collection,
            use, and disclosure of your personal information in accordance with the terms herein.
          </p>

          <h3 className="py-3"><strong>1. General</strong></h3>
          <p className="para">
            This Policy is framed in accordance with the Information Technology Act, 2000 and the applicable Rules
            including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data
            or Information) Rules, 2011, as amended from time to time ("Applicable Law").
          </p>

          <h3 className="py-3"><strong>2. Information We Collect</strong></h3>
          <p className="para">We may collect the following categories of personal information:</p>
          <ol type="a" style={{ listStyleType: "lower-alpha" }}>
            <li>Contact details: Your name, job title, organization, telephone number, and email address;</li>
            <li>Business information: Instructions, payments, communications relating to ongoing or prospective engagements;</li>
            <li>Legal or compliance data: Details related to litigation or compliance matters, where legally required;</li>
            <li>Public data: Information from publicly available sources, credit agencies, or integrity databases;</li>
            <li>Application materials: CV, educational qualifications, career preferences, and other application-related documents;</li>
            <li>Website interaction data: IP address, cookies, and usage statistics (collected through cookies or third-party tools, subject to applicable law).</li>
          </ol>

          <p className="para"><em>Note: You are under no obligation to provide any personal information to access our Website. Any information shared is voluntary.</em></p>

          <h3 className="py-3"><strong>3. Sensitive Personal Information</strong></h3>
          <p className="para">We do not solicit, request, or require you to share sensitive personal data or information, including but not limited to:</p>
          <ol type="a" style={{ listStyleType: "lower-alpha" }}>
            <li>Passwords;</li>
            <li>Financial information;</li>
            <li>Health or biometric data;</li>
            <li>Sexual orientation;</li>
            <li>Medical history;</li>
            <li>Any government identifiers.</li>
          </ol>
          <p className="para"><em>Any such information shared with us voluntarily is at your own risk, and we disclaim any liability arising out of its collection, use, or protection.</em></p>

          <h3 className="py-3"><strong>4. Use of Information</strong></h3>
          <p className="para">We may use the personal information provided by you for the following purposes:</p>
          <ol type="a" style={{ listStyleType: "lower-alpha" }}>
            <li>To communicate with you, including sending our newsletter, legal updates, or alerts;</li>
            <li>To respond to inquiries submitted through the Website;</li>
            <li>To evaluate CVs and job applications (no guarantee of response or engagement);</li>
            <li>For compliance with applicable legal or regulatory obligations;</li>
            <li>To maintain and improve our Website's performance and user experience.</li>
          </ol>
          <p className="para"> <em>We do not use your personal information to advertise, solicit work, or for marketing purposes beyond sharing informational updates.</em></p>

          <h3 className="py-3"><strong>5.	Legal Basis for Processing</strong></h3>
          <p >Where required under Applicable Law, we process your personal information only with your consent or when legally necessary, such as for compliance or legitimate business interests related to our professional legal services.</p>

          <h3 className="py-3"><strong>6.	Your Rights & Choices</strong></h3>
          <p className="para">You may exercise the following rights, subject to Applicable Law:</p>
           <ol type="a" style={{ listStyleType: "lower-alpha" }}>
           <li>Request access to your personal information;</li>
           <li>Unsubscribe from newsletters or email communications via the “Unsubscribe” link in our emails;</li>
           <li>Request correction or deletion of your information;</li>
           <li>Withdraw consent (where processing is based on consent).</li>
           <li>We reserve the right to take up to 30 days to process such requests.</li>
          </ol>

          <h3 className=""><strong>7.	Data Retention</strong></h3>
          <p className="para py-2">We employ appropriate technical and organizational security measures to protect your personal information against unauthorized access, use, or disclosure. However, no system can be completely secure. You acknowledge this risk when submitting data online.</p>
          <p className="para">In compliance with Applicable Law, we may disclose personal information to governmental authorities for the purpose of verification, investigation (including cyber incidents), or as otherwise required by law.</p>

          <h3 className="py-3"><strong>8. Third Party Links</strong></h3>
          <p className="para">Our Website may include links to third-party websites. We are not responsible for the privacy practices or the content of such websites. We advise you to review the privacy policies of these third parties before sharing any personal data.</p>

          <h3 className="py-3"><strong>9. Use of Cookies and Maps</strong></h3>
          <p className="para py-2">Our Website may use cookies or analytics tools for improving user experience.</p>
          <p className="para">Maps used are sourced from Google and are published under open licenses. They do not imply any political or legal position on geographical boundaries.</p>

          <h3 className="py-3"><strong>10. Intellectual Property</strong></h3>
          <p className="para">All content on our Website including logos, texts, images, and designs are the property of Aarna Law or its licensors. Unauthorized use, reproduction, or redistribution is prohibited and may result in legal action.</p>

          <h3 className="py-3"><strong>11. Limitation of Liability</strong></h3>
          <p className="para">We provide the Website and content on an “AS IS” and “AS AVAILABLE” basis, without warranties of any kind. We disclaim all liability for losses or damages resulting from use of the Website or reliance on its contents.</p>

          <h3 className="py-3"><strong>12. Indemnification</strong></h3>
          <p className="para">You agree to indemnify and hold harmless Aarna Law and its affiliates against any claims, losses, or damages arising out of your misuse of the Website or violation of this Policy.</p>

          <h3 className="py-3"><strong>13. Changes to this Policy</strong></h3>
          <p className="para">We may update this Privacy Policy from time to time. Changes will be effective immediately upon posting on our Website. We encourage you to review this Policy periodically. Continued use of the Website constitutes your acceptance of the updated Policy.</p>

          <h3 className="py-3"><strong>14. Governing Law and Dispute Resolution</strong></h3>
          <p className="para">This Policy and any disputes arising hereunder shall be governed by the laws of India.</p>
          <p className="para pt-2">Any disputes shall be resolved through arbitration by a sole arbitrator in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Bangalore, India. The arbitration proceedings shall be conducted in English. Courts at Bangalore shall have exclusive jurisdiction.</p>

          <h3 className="py-3"><strong>15.	Contact Us</strong></h3>
          <p className="para">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
          <p className="para py-2" style={{color: "#e6321b"}}><a href="mailto:info@aarnalaw.com">Email: info@aarnalaw.com </a></p>
          <p className="para">Address: No. 5, 2nd Main Road, Vyalikaval, Bengaluru 560003</p>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
