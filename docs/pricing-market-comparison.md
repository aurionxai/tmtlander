# KontrolX — Pricing & Market Comparison (Source of Record)

**Version:** V5 · July 2026
**Companion pages:** `../kontrolx_pricing_v5.html`, `../kontrolx_one_pager_v5.html`

This document is the source-of-record for every figure quoted on the KontrolX
pricing and market-comparison page. Two kinds of numbers appear here:

1. **KontrolX capacity figures** — load-test measurements on production-class
   hardware, re-runnable container by container. Not projections.
2. **Competitor figures** — list pricing from public pricing pages and
   verified third-party pricing guides, captured **July 2026**. Vendors change
   pricing without notice; re-verify before quoting externally.

> ⚠️ Competitor pricing is directional (list ranges, not negotiated deals) and
> should be treated as "as published, July 2026." Always link the live source
> when using these figures in a customer-facing claim.

---

## 1. Plans (flat price, measured capacity, dedicated infrastructure)

| Plan | Price | Included leads/mo | Measured ceiling | Notes |
|------|-------|-------------------|------------------|-------|
| **Embed** | $1,495/mo | 1M | — | Middleman mode beside your CRM; intake, screening, routing, webhooks out. No rip-and-replace. |
| **Base · Own** | $2,995/mo | 1M | **13M** | Everything: portals, AI, BI, ledger. Dedicated database + pipeline. |
| **Growth** | $4,995/mo | 10M | **41M** | Same-day config upgrade — no migration. |
| **Enterprise** | $9,995+/mo | 100M | **115M** | Custom SLA, database tiers beyond. Sovereign KB add-on +$499. |

Every tier is a dedicated single-tenant deployment (own database, own pipeline,
own capacity envelope).

---

## 2. Measured capacity (load-test results, July 2026)

| Metric | Result | What it means |
|--------|--------|---------------|
| Lead acknowledgement | **< 300 ms** | Every lead acknowledged and durably persisted. |
| Burst absorption | **6,500 leads** at once | Spike absorbed with zero rejections; queue cleared in 2.5 min. |
| Database ceiling (smallest prod DB) | **115M leads/mo** | Measured saturation ceiling on the smallest production database tier. |
| Crash recovery | **100%** | Entire pipeline crash-recoverable via durable workflows end to end. |
| Tier ceilings | **13M / 41M / 115M** | Base / Growth / Enterprise measured leads/mo. |

Methodology: tested container by container — saturation knees, burst
absorption, and database ceilings are measured and re-runnable. Capacity tiers
are engineering documents, not marketing copy.

> **TODO:** attach the raw load-test run IDs / dashboards backing each figure
> above before this doc is treated as externally citable.

---

## 3. Apples-to-apples capability comparison

KontrolX ships each capability as standard. Competitor cells reflect list
pricing **plus** the third-party tools required to match the capability.

| Capability | KontrolX | boberdoo | LeadConduit | Phonexa | LeadsPedia |
|------------|----------|----------|-------------|---------|------------|
| Base platform pricing | Flat, all-in | $500–3K/mo + per action | $1K–5K/mo + per event | $700–3K/mo + usage | $1.5K–2.5K/mo |
| Ping/post, routing, returns | Included | Yes | Yes (billed per event) | Yes | Yes |
| Screeners: DNC / blacklist / dedupe / rules | Included | Partial | Yes (billed per event) | Partial | Partial |
| Enrichment orchestration + vendor costs | Included | Partial | Via integrations — every call billed | Partial | Partial |
| Human-in-loop async forms | Included | Custom dev $10–30k | Custom dev | No | No |
| Double-entry ledger, commissions, statements | Included | QuickBooks + glue dev | No | Books360 add-on | Partial |
| Branded buyer/vendor portals | Auto-built | Softr/Clinked $139–399/mo | same add-on | Partial | Partial |
| Custom per-audience dashboards | Included | Explo $999–1,995/mo | same add-on | No | No |
| BI datasets & metrics | Included | Tableau $15–115/user/mo | same add-on | Reports only | Reports only |
| AI assistant on every screen | Included | Nothing to buy — nearest is ThoughtSpot @ $50/user/mo, 25 queries | No | No | No |
| Agent surface (MCP/A2A) — AI operates the system | ~90 tools | Doesn't exist | Doesn't exist | Doesn't exist | Doesn't exist |
| Knowledge base / RAG, per-partner access | Included | Custom RAG $25k+ | No | No | No |
| Error drill-ins + webhook replay | Included | Support tickets | Partial | Partial | Partial |
| Dedicated single-tenant infrastructure | Standard | Enterprise only | Enterprise only | Enterprise only | Enterprise only |

**Stack cost to match one KontrolX Base:** platform $1.5–3k + portal $250 +
dashboards $999 + BI seats $270 + custom dev ≈ **$3.5–5.5k/mo before lead
metering**, with zero AI operation.

---

## 4. What the meter costs at volume

| Leads / month | KontrolX | Per-event platforms* | boberdoo |
|---------------|----------|----------------------|----------|
| 100,000 | $2,995 flat | $1.5k–2.5k | $500–1.5k |
| 1,000,000 | $2,995 flat | $15k–25k | $1.5k–3k+ |
| 10,000,000 | $4,995 flat | $150k+ (custom) | custom |

\* LeadConduit-style event pricing: ~$0.005/event × 3–5 events per lead (ping,
post, integration calls). KontrolX flat pricing is backed by measured ceilings
(13M / 41M / 115M leads/mo per tier).

---

## 5. The DIY receipt (10-seat team)

Assembling the same surface area from best-in-class tools:

| Line item | Monthly |
|-----------|---------|
| Salesforce Enterprise ×10 | $1,750 |
| Tableau (2 Creator + 8 Viewer) | $270 |
| Airtable Business ×10 | $450 |
| Workato glue (entry) | $1,700+ |
| Client portal tool | $269 |
| …still need ping/post (boberdoo) | $500+ |
| **Monthly, before implementation** | **$4,939+** |

Plus **$50k+ implementation**, none of it lead-native, and Salesforce's AI tier
alone is $550/user/mo.

---

## 6. Source register

Replace each placeholder with the live URL + capture date used to verify the
figure. Keep this table current — it is what makes the comparison defensible.

| Vendor / tool | Figure(s) used | Source | Captured |
|---------------|----------------|--------|----------|
| boberdoo | $500–3K/mo + per action; portal, dashboard, RAG add-ons | _public pricing page — add URL_ | Jul 2026 |
| LeadConduit (ActiveProspect) | $1K–5K/mo + per event (~$0.005/event) | _public pricing page — add URL_ | Jul 2026 |
| Phonexa | $700–3K/mo + usage; Books360 add-on | _public pricing page — add URL_ | Jul 2026 |
| LeadsPedia | $1.5K–2.5K/mo | _public pricing page — add URL_ | Jul 2026 |
| Salesforce Enterprise | $175/user/mo (×10 = $1,750); AI tier $550/user/mo | _salesforce.com/pricing — add URL_ | Jul 2026 |
| Tableau | $15–115/user/mo (Viewer/Creator) | _tableau.com/pricing — add URL_ | Jul 2026 |
| Airtable Business | $45/user/mo (×10 = $450) | _airtable.com/pricing — add URL_ | Jul 2026 |
| Workato | entry glue ~$1,700+/mo | _workato.com/pricing — add URL_ | Jul 2026 |
| Softr / Clinked | $139–399/mo portals | _add URL_ | Jul 2026 |
| Explo | $999–1,995/mo embedded dashboards | _add URL_ | Jul 2026 |
| ThoughtSpot | $50/user/mo, 25 queries | _add URL_ | Jul 2026 |
| KontrolX capacity | <300 ms, 6,500 burst, 13M/41M/115M ceilings, 100% recovery | _internal load-test run IDs — add links_ | Jul 2026 |
