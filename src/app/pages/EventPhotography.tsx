import eventImg1 from "../../imports/optimized/smiling-people-celebrating-new-year-s-eve-with-spa-2026-03-24-09-00-03-utc.jpg";
import eventImg2 from "../../imports/optimized/friends-celebrate-new-year-s-eve-with-sparklers-2026-03-24-07-23-58-utc.jpg";
import eventImg3 from "../../imports/optimized/celebratory-evening-couple-cheers-with-champagne-2026-03-24-05-10-35-utc.jpg";
import eventImg4 from "../../imports/optimized/friends-celebrating-with-champagne-on-yellow-backg-2026-03-17-08-58-10-utc.jpg";
import ServicePageRenderer from "../../theme-engine/renderers/ServicePageRenderer";
import { eventServicePage } from "../../themes/eight-nine-luxury/pages";

const portfolioImages = [
  { src: eventImg1, alt: "Group celebrating New Year with sparklers" },
  { src: eventImg2, alt: "Friends raising sparklers at a New Year event" },
  { src: eventImg3, alt: "Couple toasting champagne at an evening celebration" },
  { src: eventImg4, alt: "Friends celebrating with champagne and confetti" },
];

export default function EventPhotography() {
  return (
    <ServicePageRenderer
      page={eventServicePage}
      portfolioImages={portfolioImages}
      showPackages={false}
      portfolioAspect="portrait"
      heroObjectPosition="object-[center_40%]"
      categoriesLabel="What We Cover"
      categoriesHeading="Every kind of event.\nThe same standard of care."
      portfolioLabel="Event Portfolio"
      portfolioHeading="Recent events covered."
      processLabel="How It Works"
      processHeading="From brief to delivery.\nFive steps."
      includedLabel="Sample Package Includes"
      includedHeading="No surprises. No extras."
      includedSubtext="Draft deliverables for client review. Final usage rights and turnaround should be confirmed before launch."
      bookingHeadline="Planning an event?"
      bookingSubtext="Get in touch with your event date, type and scale. We'll confirm availability and put together a coverage proposal."
      bookingSessionType="Event Photography"
    />
  );
}
