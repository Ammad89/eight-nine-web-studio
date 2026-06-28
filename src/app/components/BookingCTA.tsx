import { useState } from "react";
import { ArrowRight, MessageCircle, Calendar, Phone } from "lucide-react";
import { getActiveSite } from "../../theme-engine";

type Tab = "enquiry" | "availability" | "consultation";

interface Props {
  headline?: string;
  subtext?: string;
  sessionType?: string;
}

const SESSION_OPTIONS = [
  "Family Photography",
  "Pet Photography",
  "Personal Branding",
  "Event Photography",
  "Wedding Photography",
  "Other",
];

const TIME_OPTIONS = ["Morning (8am - 12pm)", "Afternoon (12pm - 5pm)", "Evening (5pm - 8pm)"];

const TAB_LABELS: Record<Tab, string> = {
  enquiry: "Website Enquiry",
  availability: "Availability Request",
  consultation: "Discovery Call Request",
};

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full name",
  phone: "Phone number",
  email: "Email address",
  sessionType: "Session type",
  sessionInterest: "Session interest",
  preferredDate: "Preferred date",
  backupDate: "Backup date",
  preferredCallDate: "Preferred call date",
  preferredCallTime: "Preferred call time",
  message: "Additional information",
  discussion: "What they would like to discuss",
};

function createMailto(tab: Tab, form: HTMLFormElement, contactEmail: string, sourceLabel: string) {
  const data = new FormData(form);
  const service = String(data.get("sessionType") || data.get("sessionInterest") || "General").trim();
  const fullName = String(data.get("fullName") || "Website visitor").trim();
  const subject = `${TAB_LABELS[tab]} - ${service}`;
  const lines = [
    `Enquiry type: ${TAB_LABELS[tab]}`,
    `Submitted by: ${fullName}`,
    "",
    "Details:",
  ];

  data.forEach((value, key) => {
    const cleanValue = String(value).trim();
    if (!cleanValue) return;
    lines.push(`${FIELD_LABELS[key] || key}: ${cleanValue}`);
  });

  lines.push("", `Source: ${sourceLabel} website`);

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-10">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-2xl">&#10003;</span>
      </div>
      <p className="text-white text-lg font-medium mb-2" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        {message}
      </p>
      <p className="text-white/50 text-sm">Please send the email to complete your enquiry.</p>
    </div>
  );
}

function inputClass(extra = "") {
  return `bg-white/10 border border-white/15 text-white placeholder:text-white/30 px-5 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors duration-500 w-full ${extra}`;
}

export default function BookingCTA({
  headline = "Ready when you are.",
  subtext = "Family session, brand shoot or special event - get in touch and we'll find a time that works. No obligation. Just a conversation.",
  sessionType = "",
}: Props) {
  const site = getActiveSite();
  const [activeTab, setActiveTab] = useState<Tab>("enquiry");
  const [submitted, setSubmitted] = useState<Partial<Record<Tab, boolean>>>({});

  const submit = (tab: Tab) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = createMailto(tab, e.currentTarget, site.contact.email, site.brand.name);
    setSubmitted(prev => ({ ...prev, [tab]: true }));
  };

  const tabs: { id: Tab; label: string; short: string; Icon: typeof Calendar }[] = [
    { id: "enquiry", label: "Send an Enquiry", short: "Enquiry", Icon: MessageCircle },
    { id: "availability", label: "Check Availability", short: "Availability", Icon: Calendar },
    { id: "consultation", label: "Book a Discovery Call", short: "Discovery Call", Icon: Phone },
  ];

  return (
    <section className="py-28 sm:py-36 bg-primary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">Get In Touch</p>
        <h2
          className="text-4xl sm:text-5xl font-medium text-white mb-7 leading-tight"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {headline}
        </h2>
        <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          {subtext}
        </p>

        {/* Quick CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex items-center gap-[18px] pl-8 pr-3.5 py-3.5 bg-white text-black text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:bg-white/90 transition-colors duration-500"
          >
            <span className="group-hover:[order:1]">Email Directly</span>
            <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><ArrowRight size={14} /></span>
          </a>
          <a
            href="https://wa.me/971569358629"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-[18px] pl-8 pr-3.5 py-3.5 border border-white/25 text-white text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:border-white/55 transition-colors duration-500"
          >
            <span className="group-hover:[order:1]">WhatsApp</span>
            <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><MessageCircle size={14} /></span>
          </a>
        </div>

        {/* Tabbed forms */}
        <div className="bg-white/[0.06] rounded-3xl p-6 sm:p-10 text-left max-w-2xl mx-auto">

          {/* Tab selector */}
          <div className="flex bg-white/10 rounded-full p-1 mb-8 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-full text-[10px] tracking-[0.1em] uppercase font-medium transition-colors duration-500 ${
                  activeTab === tab.id ? "bg-white text-black" : "text-white/55 hover:text-white"
                }`}
              >
                <tab.Icon size={11} className="flex-none hidden sm:block" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </div>

          {/* ── Tab 1: Full Enquiry Form ── */}
          {activeTab === "enquiry" && (
            submitted.enquiry ? (
              <SuccessMessage message="Your email app should open with your enquiry." />
            ) : (
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={submit("enquiry")}>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Full Name *</label>
                  <input required name="fullName" type="text" placeholder="Your full name" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Phone Number *</label>
                  <input required name="phone" type="tel" placeholder="+971 56 935 8629" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Email Address *</label>
                  <input required name="email" type="email" placeholder="you@example.com" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Session Type *</label>
                  <select
                    required
                    name="sessionType"
                    defaultValue={sessionType}
                    className={`${inputClass("text-white/70")} rounded-full`}
                  >
                    <option value="" disabled>Select a service</option>
                    {SESSION_OPTIONS.map(o => (
                      <option key={o} value={o} className="text-foreground bg-background">{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Preferred Date</label>
                  <input name="preferredDate" type="date" className={`${inputClass("text-white/70")} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Additional Information</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about your session idea, location preferences, or anything else that would help us prepare..."
                    className={`${inputClass("resize-none")} rounded-2xl`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-[18px] pl-8 pr-5 py-3.5 bg-white text-black text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:bg-white/90 transition-colors duration-500"
                  >
                    <span className="group-hover:[order:1]">Send Enquiry</span>
                    <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><ArrowRight size={14} /></span>
                  </button>
                </div>
              </form>
            )
          )}

          {/* ── Tab 2: Availability Checker ── */}
          {activeTab === "availability" && (
            submitted.availability ? (
              <SuccessMessage message="Your email app should open with your availability request." />
            ) : (
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={submit("availability")}>
                <p className="sm:col-span-2 text-white/55 text-sm leading-relaxed -mt-2 mb-2">
                  Not ready to commit? Just tell us your preferred date and session type - we'll let you know if we're available, with no obligation to book.
                </p>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Your Name *</label>
                  <input required name="fullName" type="text" placeholder="Your name" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Email Address *</label>
                  <input required name="email" type="email" placeholder="you@example.com" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Preferred Date *</label>
                  <input required name="preferredDate" type="date" className={`${inputClass("text-white/70")} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Backup Date (optional)</label>
                  <input name="backupDate" type="date" className={`${inputClass("text-white/70")} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Session Type *</label>
                  <select
                    required
                    name="sessionType"
                    defaultValue={sessionType}
                    className={`${inputClass("text-white/70")} rounded-full`}
                  >
                    <option value="" disabled>Select a service</option>
                    {SESSION_OPTIONS.map(o => (
                      <option key={o} value={o} className="text-foreground bg-background">{o}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-[18px] pl-8 pr-5 py-3.5 bg-white text-black text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:bg-white/90 transition-colors duration-500"
                  >
                    <span className="group-hover:[order:1]">Check Availability</span>
                    <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><Calendar size={14} /></span>
                  </button>
                </div>
              </form>
            )
          )}

          {/* ── Tab 3: Discovery Call ── */}
          {activeTab === "consultation" && (
            submitted.consultation ? (
              <SuccessMessage message="Your email app should open with your discovery call request." />
            ) : (
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={submit("consultation")}>
                <p className="sm:col-span-2 text-white/55 text-sm leading-relaxed -mt-2 mb-2">
                  Book a free 20-minute call to discuss your goals, ask questions and see if we're the right fit - before you commit to anything.
                </p>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Full Name *</label>
                  <input required name="fullName" type="text" placeholder="Your full name" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Email Address *</label>
                  <input required name="email" type="email" placeholder="you@example.com" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Phone Number *</label>
                  <input required name="phone" type="tel" placeholder="+971 56 935 8629" className={`${inputClass()} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Session Interest</label>
                  <select
                    name="sessionInterest"
                    defaultValue={sessionType}
                    className={`${inputClass("text-white/70")} rounded-full`}
                  >
                    <option value="" disabled>Select a service</option>
                    {SESSION_OPTIONS.map(o => (
                      <option key={o} value={o} className="text-foreground bg-background">{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Preferred Call Date *</label>
                  <input required name="preferredCallDate" type="date" className={`${inputClass("text-white/70")} rounded-full`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Preferred Call Time *</label>
                  <select required name="preferredCallTime" defaultValue="" className={`${inputClass("text-white/70")} rounded-full`}>
                    <option value="" disabled>Select a time</option>
                    {TIME_OPTIONS.map(o => (
                      <option key={o} value={o} className="text-foreground bg-background">{o}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-white/50 text-[10px] tracking-[0.2em] uppercase">What would you like to discuss?</label>
                  <textarea
                    name="discussion"
                    rows={3}
                    placeholder="Tell us a little about your project, goals or any specific questions you have..."
                    className={`${inputClass("resize-none")} rounded-2xl`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-[18px] pl-8 pr-5 py-3.5 bg-white text-black text-xs tracking-[0.12em] uppercase font-medium rounded-full hover:bg-white/90 transition-colors duration-500"
                  >
                    <span className="group-hover:[order:1]">Book Discovery Call</span>
                    <span className="group-hover:[order:0] flex items-center justify-center w-5 h-5"><Phone size={14} /></span>
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </section>
  );
}
