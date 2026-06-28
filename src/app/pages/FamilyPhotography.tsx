import familyImg1 from "../../imports/optimized/happy-family-laughing-while-lying-in-green-grass-2026-03-25-05-03-58-utc.jpg";
import familyImg2 from "../../imports/optimized/young-happy-mixed-race-family-relaxing-and-sitting-2026-03-25-08-29-12-utc.jpg";
import familyImg3 from "../../imports/optimized/loving-family-together-in-sunny-field-outdoors-2026-01-05-05-42-43-utc.jpg";
import familyImg4 from "../../imports/optimized/happy-family-sitting-in-the-autumn-grass-2026-03-26-09-13-29-utc.jpg";
import ServicePageRenderer from "../../theme-engine/renderers/ServicePageRenderer";
import { familyServicePage } from "../../themes/eight-nine-luxury/pages";

const portfolioImages = [
  { src: familyImg1, alt: "Family laughing together lying in the grass" },
  { src: familyImg2, alt: "Mixed-race family sitting on the grass with two children" },
  { src: familyImg3, alt: "Couple with young child in a sunny outdoor field" },
  { src: familyImg4, alt: "Family sitting together in autumn grass" },
];

export default function FamilyPhotography() {
  return (
    <ServicePageRenderer
      page={familyServicePage}
      portfolioImages={portfolioImages}
      heroObjectPosition="object-[center_55%]"
      portfolioLabel="Family Portfolio"
      portfolioHeading="A selection of real family sessions."
      processLabel="What to Expect"
      processHeading="Three stages. Zero stress."
      testimonialsLabel="Sample Kind Words"
      testimonialsHeading="What families could say."
      testimonialsSubtext="Draft testimonial examples for client review. Replace with verified client quotes before launch."
      faqsLabel="Frequently Asked"
      faqsHeading="Your questions, answered."
      bookingHeadline="Let's photograph your family."
      bookingSubtext="Reach out to check availability or ask any questions. Sessions book out quickly - especially at golden hour."
      bookingSessionType="Family Photography"
    />
  );
}
