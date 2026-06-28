import weddingImg1 from "../../imports/optimized/celebratory-evening-couple-cheers-with-champagne-2026-03-24-05-10-35-utc.jpg";
import weddingImg2 from "../../imports/optimized/smiling-people-celebrating-new-year-s-eve-with-spa-2026-03-24-09-00-03-utc.jpg";
import weddingImg3 from "../../imports/optimized/friends-celebrate-new-year-s-eve-with-sparklers-2026-03-24-07-23-58-utc.jpg";
import weddingImg4 from "../../imports/optimized/friends-celebrating-with-champagne-on-yellow-backg-2026-03-17-08-58-10-utc.jpg";

import ServicePageRenderer from "../../theme-engine/renderers/ServicePageRenderer";
import { weddingServicePage } from "../../themes/eight-nine-luxury/pages";

const portfolioImages = [
  {
    src: weddingImg1,
    alt: "Bride and groom celebrating together",
  },
  {
    src: weddingImg2,
    alt: "Wedding reception celebration",
  },
  {
    src: weddingImg3,
    alt: "Couple with sparklers",
  },
  {
    src: weddingImg4,
    alt: "Wedding evening celebration",
  },
];

export default function WeddingPhotography() {
  return (
    <ServicePageRenderer
      page={weddingServicePage}
      portfolioImages={portfolioImages}
      showPackages={false}
      portfolioAspect="portrait"
      heroObjectPosition="object-center"
      portfolioLabel="Wedding Portfolio"
      portfolioHeading="A selection from recent weddings."
      includedLabel="What's Included"
      includedHeading="One package. Everything you need."
      includedSubtext="Draft package structure for client review. Final pricing and deliverables should be confirmed before launch."
      testimonialsLabel="Sample Couple Feedback"
      testimonialsHeading="Their words."
      testimonialsSubtext="Draft testimonial examples for client review. Replace with verified couple feedback before launch."
      faqsLabel="FAQs"
      faqsHeading="Questions from couples."
      bookingHeadline="Tell us about your day."
      bookingSubtext="Every wedding is different. Reach out with your date, location and what matters most, and we'll take it from there."
      bookingSessionType="Wedding Photography"
    />
  );
}
