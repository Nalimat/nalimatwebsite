import { Fragment } from "react";
import type { StackGroup } from "@/content/website-stack";

/** Renders `backtick` spans in a usage note as inline code. */
function Usage({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded-[0.3rem] bg-cream px-1.5 py-0.5 font-mono text-[0.8125rem] text-navy [overflow-wrap:anywhere]"
          >
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Two-column technology table (Technology | Where it's used), grouped into
 * row sections, with column, row and row-group headers.
 *
 * Below the sm breakpoint each row stacks (name above its description) so the
 * text keeps a readable width. Changing a table's display can drop its
 * semantics in some screen readers, so the table roles are set explicitly.
 */
export function StackTable({ groups, caption }: { groups: StackGroup[]; caption: string }) {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-surface">
      <table role="table" className="block w-full border-collapse text-left sm:table">
        <caption className="sr-only">{caption}</caption>
        <thead role="rowgroup" className="surface-cream block sm:table-header-group">
          <tr role="row" className="flex gap-1 px-4 py-3.5 sm:table-row sm:p-0">
            <th role="columnheader" scope="col" className="text-sm font-semibold sm:w-[30%] sm:px-6 sm:py-3.5 lg:w-[26%]">
              Technology
              <span aria-hidden className="sm:hidden">
                {" "}
                and where it&apos;s used
              </span>
            </th>
            <th role="columnheader" scope="col" className="sr-only text-sm font-semibold sm:not-sr-only sm:px-6 sm:py-3.5">
              Where it&apos;s used
            </th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.title} role="rowgroup" className="block sm:table-row-group">
            <tr role="row" className="block border-t border-line bg-canvas sm:table-row">
              <th role="rowheader" scope="rowgroup" colSpan={2} className="block px-4 py-3 text-sm font-semibold text-navy sm:table-cell sm:px-6">
                {group.title}
              </th>
            </tr>
            {group.items.map((item) => (
              <tr key={item.name} role="row" className="block border-t border-line px-4 py-4 align-top sm:table-row sm:p-0">
                <th role="rowheader" scope="row" className="block font-medium text-navy sm:table-cell sm:px-6 sm:py-5">
                  <span className="flex items-baseline gap-2.5">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-[2px] bg-accent" />
                    {item.name}
                  </span>
                </th>
                <td role="cell" className="mt-1.5 block pl-4 text-[0.9375rem] text-muted sm:mt-0 sm:table-cell sm:px-6 sm:py-5">
                  <Usage text={item.usage} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
