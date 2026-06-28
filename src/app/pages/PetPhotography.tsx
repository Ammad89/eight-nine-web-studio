import petImg1 from "../../imports/optimized/happy-young-woman-spending-time-with-lovely-spotte-2026-01-05-04-49-04-utc.jpg";
import petImg2 from "../../imports/optimized/a-soft-coated-wheaten-terrier-running-through-the-2026-03-13-01-52-31-utc.jpg";
import petImg3 from "../../imports/optimized/happy-dog-standing-on-a-rock-in-nature-2026-03-24-11-37-42-utc.jpg";
import petImg4 from "../../imports/optimized/cute-puppy-sitting-alert-in-green-grass-2026-03-19-08-12-02-utc.jpg";
import ServicePageRenderer from "../../theme-engine/renderers/ServicePageRenderer";
import { petServicePage } from "../../themes/eight-nine-luxury/pages";

const portfolioImages = [
  { src: petImg1, alt: "Woman with her Australian Shepherd on the grass" },
  { src: petImg2, alt: "Wheaten Terrier running through a bluebell field" },
  { src: petImg3, alt: "Dog standing on a rock with mountain backdrop" },
  { src: petImg4, alt: "German Shepherd puppy sitting alert in green grass" },
];

export default function PetPhotography() {
  return (
    <ServicePageRenderer
      page={petServicePage}
      portfolioImages={portfolioImages}
      showPackages={false}
      portfolioAspect="square"
      heroObjectPosition="object-[center_40%]"
      portfolioLabel="Pet Portfolio"
      portfolioHeading="Recent sessions."
      processLabel="How It Works"
      processHeading="A session built around your pet."
      testimonialsLabel="Sample Client Stories"
      testimonialsHeading="In their owners' words."
      testimonialsSubtext="Draft testimonial examples for client review. Replace with verified pet-session quotes before launch."
      faqsLabel="FAQs"
      faqsHeading="Common questions."
      bookingHeadline="Let's photograph your animal."
      bookingSubtext="Spaces are limited each month. Get in touch to check availability and discuss what you have in mind."
      bookingSessionType="Pet Photography"
    />
  );
}
