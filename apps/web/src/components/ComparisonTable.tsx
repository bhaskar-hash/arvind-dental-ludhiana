import type { ComparisonTable as ComparisonTableData } from "@/lib/services";

export function ComparisonTable({ table }: { table: ComparisonTableData }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse font-body text-sm">
        <thead>
          <tr className="border-b-2 border-brand-black">
            {table.columns.map((col) => (
              <th key={col} className="py-3 pr-4 font-headline text-base">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className="border-b border-black/10">
              <td className="py-3 pr-4 font-semibold align-top">{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i} className="py-3 pr-4 opacity-75 align-top">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.footnote ? (
        <p className="font-body text-xs opacity-50 mt-3">{table.footnote}</p>
      ) : null}
    </div>
  );
}
