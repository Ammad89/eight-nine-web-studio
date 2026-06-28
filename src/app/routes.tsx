import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import FamilyPhotography from "./pages/FamilyPhotography";
import PetPhotography from "./pages/PetPhotography";
import PersonalBranding from "./pages/PersonalBranding";
import EventPhotography from "./pages/EventPhotography";
import WeddingPhotography from "./pages/WeddingPhotography";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SchemaPreviewPage from "./pages/SchemaPreviewPage";
import Dashboard from "./pages/Dashboard";
import DraftPagePreview from "./pages/DraftPagePreview";
import DashboardV2 from "./pages/DashboardV2";
import { CmsDynamicPage, CmsPublicPage } from "./components/CmsPublicPage";

function HomeRoute() {
  return <CmsPublicPage slug="home" fallback={<Home />} />;
}

function PortfolioRoute() {
  return <CmsPublicPage slug="portfolio" fallback={<Portfolio />} />;
}

function AboutRoute() {
  return <CmsPublicPage slug="about" fallback={<About />} />;
}

function ContactRoute() {
  return <CmsPublicPage slug="contact" fallback={<Contact />} />;
}

function FamilyPhotographyRoute() {
  return <CmsPublicPage slug="family-photography" fallback={<FamilyPhotography />} />;
}

function PetPhotographyRoute() {
  return <CmsPublicPage slug="pet-photography" fallback={<PetPhotography />} />;
}

function PersonalBrandingRoute() {
  return <CmsPublicPage slug="personal-branding" fallback={<PersonalBranding />} />;
}

function EventPhotographyRoute() {
  return <CmsPublicPage slug="event-photography" fallback={<EventPhotography />} />;
}

function WeddingPhotographyRoute() {
  return <CmsPublicPage slug="wedding-photography" fallback={<WeddingPhotography />} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomeRoute },
      { path: "portfolio", Component: PortfolioRoute },
      { path: "about", Component: AboutRoute },
      { path: "contact", Component: ContactRoute },
      { path: "schema-preview/:pageId", Component: SchemaPreviewPage },
      { path: "family-photography", Component: FamilyPhotographyRoute },
      { path: "pet-photography", Component: PetPhotographyRoute },
      { path: "personal-branding", Component: PersonalBrandingRoute },
      { path: "event-photography", Component: EventPhotographyRoute },
      { path: "wedding-photography", Component: WeddingPhotographyRoute },
      { path: "dashboard", Component: Dashboard },
      { path: "dashboard-v2", Component: DashboardV2 },   
      { path: "draft/:slug", Component: DraftPagePreview },
      { path: ":slug", Component: CmsDynamicPage },
    ],
  },
]);
