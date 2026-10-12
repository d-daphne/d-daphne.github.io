import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, RefreshCw, Database } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { dataRoles } from '@/data/portfolio';

const TINTS = ['var(--periwinkle)', 'var(--petal)', 'var(--lilac)', 'var(--orchid)'];

export function DataSection() {
  const [showSqlPlayground, setShowSqlPlayground] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(
    "SELECT work_order_id, asset_type, service_pattern, refresh_latency_ms\nFROM municipal_assets\nWHERE status = 'ACTIVE' AND priority = 'HIGH'\nORDER BY refresh_latency_ms ASC;"
  );
  const [queryResult, setQueryResult] = useState<any[] | null>([
    { work_order_id: "WO-2026-881", asset_type: "Pumping Station", service_pattern: "Daily Peak", refresh_latency_ms: 12 },
    { work_order_id: "WO-2026-882", asset_type: "Traffic Signal", service_pattern: "Continuous", refresh_latency_ms: 15 },
    { work_order_id: "WO-2026-885", asset_type: "Water Gateway", service_pattern: "Hourly Batch", refresh_latency_ms: 18 }
  ]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setQueryResult([
        { work_order_id: "WO-2026-881", asset_type: "Pumping Station", service_pattern: "Daily Peak", refresh_latency_ms: 12 },
        { work_order_id: "WO-2026-882", asset_type: "Traffic Signal", service_pattern: "Continuous", refresh_latency_ms: 15 },
        { work_order_id: "WO-2026-885", asset_type: "Water Gateway", service_pattern: "Hourly Batch", refresh_latency_ms: 18 },
        { work_order_id: "WO-2026-890", asset_type: "Transit Node", service_pattern: "Realtime Star Schema", refresh_latency_ms: 8 }
      ]);
    }, 400);
  };

  return (
    <SectionShell kicker="Where I work with numbers" title="Data & Systems">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Toggle between Work Roles & SQL Playground */}
        <div className="flex items-center justify-between mb-4 shrink-0 px-2">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-muted-foreground">
            {showSqlPlayground ? 'Interactive SQL Query Engine' : 'Professional Work Experience'}
          </span>
          <button
            onClick={() => setShowSqlPlayground(!showSqlPlayground)}
            className="px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold border border-border bg-card/90 hover:bg-white text-[#45324d] flex items-center space-x-2 shadow-xs transition-all hover:scale-105 cursor-pointer backdrop-blur"
          >
            {showSqlPlayground ? (
              <>
                <Database className="w-4 h-4 text-[#ab93db]" />
                <span>View Experience Cards</span>
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4 text-[#ab93db]" />
                <span>Open SQL Playground</span>
              </>
            )}
          </button>
        </div>

        {!showSqlPlayground ? (
          <div className="grid h-full gap-6 overflow-y-auto pr-1 md:grid-cols-2">
            {dataRoles.map((role, i) => (
              <motion.article
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-[2.25rem] border border-border p-6 sm:p-8 overflow-y-auto shadow-md backdrop-blur-md"
                style={{
                  background: `linear-gradient(160deg, color-mix(in oklab, ${TINTS[i % TINTS.length]} 48%, transparent), color-mix(in oklab, var(--background) 90%, transparent))`,
                }}
              >
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.26em] text-muted-foreground">
                  {role.period}
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-[#45324d]">{role.org}</h3>
                <p className="text-sm font-extrabold text-muted-foreground">
                  {role.role} · {role.location}
                </p>

                <ul className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                  {role.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-border/50">
                  {role.tools.map((t) => (
                    <span key={t} className="rounded-full bg-card px-3 py-1.5 text-xs sm:text-sm font-extrabold text-[#45324d] shadow-2xs border border-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="h-full overflow-y-auto rounded-[2.25rem] border border-border p-6 sm:p-8 bg-card/90 shadow-md space-y-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-[#45324d] flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-[#ab93db]" />
                  Star Schema & Municipal Data Query Engine
                </h3>
                <p className="text-sm text-muted-foreground font-semibold mt-1">
                  Test sample SQL queries engineered for Power BI star schemas and AWS QuickSight analytics.
                </p>
              </div>
              <button
                onClick={handleRunQuery}
                disabled={isExecuting}
                className="px-5 py-2.5 rounded-full bg-[#45324d] text-white text-xs sm:text-sm font-extrabold flex items-center space-x-2 shadow hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isExecuting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
                <span>{isExecuting ? 'Executing...' : 'Run Query'}</span>
              </button>
            </div>

            {/* Editor Box */}
            <div className="bg-[#1E1E2E] rounded-2xl border border-slate-700 p-5 font-mono text-sm text-[#C8CEEE] shadow-inner">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="w-full bg-transparent outline-none resize-none text-slate-100 leading-relaxed font-mono focus:ring-0 text-sm"
              />
            </div>

            {/* Output Table */}
            {queryResult && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-bold">
                  <span>Query Output (Live Data Models)</span>
                  <span className="text-emerald-600 font-extrabold">{queryResult.length} Rows returned in 12ms</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm font-mono text-slate-700">
                    <thead className="bg-slate-100 text-slate-800 font-bold">
                      <tr>
                        <th className="px-4 py-2.5">work_order_id</th>
                        <th className="px-4 py-2.5">asset_type</th>
                        <th className="px-4 py-2.5">service_pattern</th>
                        <th className="px-4 py-2.5">refresh_latency_ms</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      {queryResult.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2.5 text-[#ab93db] font-bold">{row.work_order_id}</td>
                          <td className="px-4 py-2.5">{row.asset_type}</td>
                          <td className="px-4 py-2.5">{row.service_pattern}</td>
                          <td className="px-4 py-2.5 text-emerald-600 font-bold">{row.refresh_latency_ms}ms</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
