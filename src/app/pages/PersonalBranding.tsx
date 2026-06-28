import brandingImg1 from "../../imports/optimized/athletic-woman-crouches-on-bridge-in-activewear-2026-03-25-07-26-56-utc.jpg";
import brandingImg2 from "../../imports/optimized/jumping-hurdler-top-view-2026-01-05-05-51-32-utc.jpg";
import brandingImg3 from "../../imports/optimized/young-woman-doing-gymnastics-top-view-2026-03-09-06-04-47-utc.jpg";
import brandingImg4 from "../../imports/optimized/young-woman-in-a-lake-rubbing-her-eyes-2026-03-09-05-46-08-utc.jpg";
import ServicePageRenderer from "../../theme-engine/renderers/ServicePageRenderer";
import { personalBrandingServicePage } from "../../themes/eight-nine-luxury/pages";

const portfolioImages = [
  { src: brandingImg1, alt: "Woman in activewear crouching on a bridge" },
  { src: brandingImg2, alt: "Aerial view of athlete jumping a hurdle" },
  { src: brandingImg3, alt: "Top-down view of gymnast on dark floor" },
  { src: brandingImg4, alt: "Woman emerging from a lake in mountain light" },
];

export default function PersonalBranding() {
  return (
    <ServicePageRenderer
      page={personalBrandingServicePage}
      portfolioImages={portfolioImages}
      showPackages
      portfolioAspect="portrait"
      heroObjectPosition="object-[center_35%]"
      statsLabel="Why It Matters"
      statsHeading="Your image is working before you say a word."
      portfolioLabel="Branding Portfolio"
      portfolioHeading="Clients we've worked with."
      industriesLabel="Industries Served"
      industriesHeading="We work across sectors."
      testimonialsLabel="Sample Client Results"
      testimonialsHeading="What could change for them."
      testimonialsSubtext="Draft testimonial examples for client review. Replace with verified personal-branding results before launch."
      faqsLabel="FAQs"
      faqsHeading="Questions we hear often."
      bookingHeadline="Start with a conversation."
      bookingSubtext="A free discovery call to understand your brand, your goals and what the right session looks like for you."
      bookingSessionType="Personal Branding"
    />
  );
}
