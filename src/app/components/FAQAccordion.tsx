import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-card rounded-2xl overflow-hidden">
          <button
            className="w-full text-left flex items-start justify-between gap-4 px-7 py-5"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span
              className="font-medium text-foreground text-[15px] leading-snug"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              {faq.q}
            </span>
            <span className="flex-none mt-0.5 text-muted-foreground">
              {open === i ? <Minus size={16} /> : <Plus size={16} />}
            </span>
          </button>
          {open === i && (
            <div className="px-7 pb-6">
              <p className="text-muted-foreground text-[14px] leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
