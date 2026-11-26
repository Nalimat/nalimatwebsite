import { cn } from "@/lib/cn";

/**
 * Concept interface for Invoicy (currently developing), built in HTML/CSS.
 *
 * Shows only what the confirmed product description covers: quotations and
 * invoices, customer and business details, letterhead documents, tax and
 * statuses. All values are generic sample data, and the stage that hosts it
 * labels it as a concept preview. Decorative (aria-hidden): the product is
 * described in text next to it.
 */
export function InvoicyMockup({ className }: { className?: string }) {
  const rows = [
    { item: "Item A", qty: "2", amount: "4,000.00" },
    { item: "Item B", qty: "1", amount: "2,500.00" },
    { item: "Item C", qty: "3", amount: "1,800.00" },
  ];
  return (
    <div aria-hidden className={cn("select-none [perspective:1400px]", className)}>
      <div className="overflow-hidden rounded-[1.1rem] border border-white/15 bg-surface text-navy shadow-[0_40px_80px_-40px_rgb(5_14_25/0.85)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateX(5deg)_rotateY(-7deg)_translateY(-6px)] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
        {/* Window bar */}
        <div className="flex h-9 items-center gap-1.5 bg-navy px-3.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-3 text-[11px] font-semibold tracking-tight text-white">Invoicy</span>
          <span className="eyebrow ml-auto text-[9px] text-on-navy">Concept</span>
        </div>

        <div className="grid grid-cols-[88px_1fr] text-[10.5px] sm:grid-cols-[104px_1fr]">
          {/* Sidebar */}
          <div className="flex flex-col gap-1 border-r border-line bg-cream/60 p-2.5">
            {["Quotations", "Invoices", "Customers", "Business"].map((label, i) => (
              <span
                key={label}
                className={cn(
                  "relative rounded-md px-2 py-1.5 font-medium",
                  i === 0 ? "bg-surface text-navy shadow-[0_1px_2px_rgb(16_36_58/0.08)]" : "text-navy/60",
                )}
              >
                {i === 0 && <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent" />}
                {label}
              </span>
            ))}
          </div>

          {/* Document */}
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold">Quotation</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[9.5px] font-semibold text-accent-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sent
              </span>
            </div>

            <div className="mt-3 rounded-lg border border-line bg-canvas p-3">
              {/* Letterhead */}
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-navy">
                    <span className="h-1.5 w-1.5 translate-x-1 translate-y-1 rounded-[1px] bg-accent" />
                  </span>
                  <span className="font-semibold">Your Business</span>
                </div>
                <span className="font-mono text-[9.5px] text-navy/60">Q-0001</span>
              </div>

              <div className="mt-2.5 flex justify-between text-[9.5px]">
                <div>
                  <p className="text-navy/55">Customer</p>
                  <p className="font-medium">Customer name</p>
                </div>
                <div className="text-right">
                  <p className="text-navy/55">Date</p>
                  <p className="font-medium">DD/MM/YYYY</p>
                </div>
              </div>

              <table className="mt-3 w-full border-collapse text-[9.5px]">
                <thead>
                  <tr className="text-left text-navy/55">
                    <th className="pb-1 font-medium">Description</th>
                    <th className="pb-1 text-right font-medium">Qty</th>
                    <th className="pb-1 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.item} className="border-t border-line">
                      <td className="py-1">{r.item}</td>
                      <td className="py-1 text-right">{r.qty}</td>
                      <td className="py-1 text-right font-mono">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-2 space-y-1 border-t border-line pt-2 text-[9.5px]">
                <div className="flex justify-between text-navy/60">
                  <span>Tax</span>
                  <span className="font-mono">1,494.00</span>
                </div>
                <div className="flex justify-between text-[11px] font-semibold">
                  <span>Total</span>
                  <span className="font-mono">9,794.00</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-md bg-accent-strong px-2.5 py-1.5 text-[9.5px] font-semibold text-white">
                Generate invoice
              </span>
              <span className="rounded-md border border-line px-2.5 py-1.5 text-[9.5px] font-medium">Download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
