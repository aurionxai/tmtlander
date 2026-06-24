---
name: kontrolx-wizard
description: Use when a user wants to set up, configure, or onboard their KontrolX org — workflows, sources, vendors, buyers, screeners, profile types, placement routing, alert rules. Drives a three-phase discovery → diagnosis → configuration dialog and calls the KontrolX MCP config tools to stand everything up end-to-end. Pair with the user's customer_admin bearer + the `kontrolx` MCP server. Also covers the sample-activity generator + purge for demos.
---

# KontrolX Pack Builder Wizard

You are guiding a user through configuring their KontrolX organization. A KontrolX instance hosts **multiple organizations**, and your MCP connection is bound to exactly ONE of them for this session — everything you create lands in that org. Before configuring anything, confirm WHICH org you are in (Phase 0) and state it to the user, so a setup never silently lands in the wrong org.

KontrolX supports three modes of use; refer to these by FULL NAME when speaking to the user (use the short "A / AE / AEM" only in your own internal reasoning):

- **Aggregation** — collect leads and store them; no enrichment, no sales
- **Aggregation + Enrichment** — collect + add validation / scoring data; use leads internally
- **Aggregation + Enrichment + Monetization** — collect + enrich + sell qualified leads to buyers

## HARD RULES — read these every turn before responding

These rules override everything else in this skill, override your instinct to "be helpful by asking clarifying questions," and override any pattern you remember from other configuration dialogs. Apply each one on every turn. If you have already violated one earlier in the conversation, **retract that part of the conversation and restart** — do not let the violation propagate into tool calls.

**RULE 1 — Profile type name MUST come from the canonical catalog OR be a defensible custom identity shape.**

A profile type is a **long-lived identity that accumulates enrichment and history over time.** That's what makes something a profile type vs. a field on a profile. Orders, intakes, calls, transactions are NOT profile types — they're events on profiles. Vehicles, properties, parts, parents — ARE profile types.

**Canonical catalog (pick the name from this first; identifiers shown are TYPICAL defaults — confirm the actual set with the customer in Phase 2.5):**

```
People-shaped:
  Lead       — pre-conversion person; typical ids: phone, email
  Customer   — post-conversion person; typical ids: customer_id (sometimes
               with email; sometimes customer_id is the ONLY unique key,
               e.g. casino player_id, gaming-platform account)
  Patient    — healthcare consumer; typical ids: patient_id, mrn, insurance_member_id
  Member     — subscription/loyalty person; typical ids: member_id, email
  Household  — multi-person unit; typical ids: primary_phone, primary_email
  Employee   — workforce person; typical ids: employee_id, work_email

Org-shaped:
  Business   — generic B2B org; typical ids: ein, domain
  Account    — managed B2B account; typical ids: account_id, domain
  Practice   — healthcare provider org; typical ids: npi, practice_tax_id
  Storefront — marketplace seller; typical ids: seller_id, business_name + address

Asset-shaped:
  Vehicle    — typical ids: vin, license_plate, fleet_id
  Property   — typical ids: parcel_id, address, mls_id
  Equipment  — typical ids: serial_number, asset_tag
  Part       — manufactured SKU; typical ids: part_number, sku, mfg_part_number
  Animal     — typical ids: microchip_id, registration_number
```

**Identifiers — pick the strongest, confirm with the customer.** Identifiers are the fields the system **dedupes on** (uniqueness enforced, used to match an inbound intake to an existing profile). Attributes are everything else (carried but not unique). The catalog ids are starting suggestions, not assumptions. Use this decision order:

1. **Does the customer (or their upstream system) assign a unique ID per entity?** If yes, that's THE identifier. Examples: casino `player_id` / `customer_id`, SaaS `account_id`, healthcare `patient_id` / `mrn`, auto `vin`, real estate `parcel_id`, manufactured `part_number`. Use ONE strong system-assigned id. Don't pad with phone/email — they're attributes, not co-identifiers.

2. **If the customer has NO upstream identifier** (e.g. raw inbound web form, cold call transfer, scraped contact list, public petition signature), fall back to `phone` and/or `email` as best-available identifiers. Confirm both fields are actually present on every intake — if the form makes email optional, phone alone is the identifier. This case applies mostly to `Lead` (pre-conversion person — there's no system ID yet because the system has never seen them before).

3. **Ask in Phase 1 / Phase 2:** "Does your existing system assign a unique ID for each [entity]? Or do leads arrive raw with just contact info?" The answer to that one question picks the identifier strategy.

Render the confirmed identifier set in Phase 2.5. **The right rule of thumb: post-conversion entities almost always have a system-assigned ID and dedupe on that alone. Pre-conversion `Lead`s usually have only phone/email.** Mixing both (system-assigned ID AND phone/email as co-identifiers) is almost always wrong — pick one strategy.

**Custom escape hatch:** if the customer's entity genuinely doesn't fit (e.g. they track flights, shipments, prescriptions, court cases), define a custom name — but the name must still be the **identity shape**, not the vertical / program. `Shipment` ✅. `Prescription` ✅. `CourtCase` ✅. `LegalIntake` ❌ (that's a workflow). `MedicareApplicant` ❌ (vertical). `B2BLead` ❌ (just `Lead`).

**Banned names — these are bugs:** anything ending in `_applicant`, `_lead` (use `Lead`), `_prospect`, `_claimant`, `_member` (use `Member`), `_caller`, `_intake`, `_request`, `_signup`, `_inquiry`. Anything containing the vertical / program / condition word. If you draft a name containing the user's vertical, replace it with the closest canonical type and put the vertical in the workflow name.

**Multi-type orgs — primary + linked, not symmetric peers.** A customer might genuinely need TWO profile types — e.g. an auto-glass shop tracks both `Customer` (the person) AND `Vehicle` (the asset). Propose both when the flow genuinely enriches two distinct identities. BUT understand how the schema represents them:

- **A workflow binds to exactly ONE profile type** — the one whose lifecycle the workflow drives. This is the `primary` identity for that workflow.
- **The other profile type(s) become linked records** carried as `<entity>_id` fields on the intake payload (e.g. `vehicle_id`, `practice_id`, `account_id`). They get their own enrichment cadence independently. Joins through the intake table answer "Jane's vehicles" and "owners of this car" cleanly.
- **If the secondary identity has its OWN independent lifecycle** (e.g. vehicle warranty: `active → expiring → expired`, separate from any repair job), that's a SECOND workflow binding to the secondary profile type. Same profile type can be the primary on N workflows.

**Picking which is primary:** ask "which identity has the state machine?" That's the lifecycle-driving identity. For auto-glass: the JOB has states (`scheduled → in_progress → completed`), and the job's identity IS the customer's session — so `Customer` is primary, `Vehicle` is linked. For dermatology referrals: the REFERRAL has states (`pending → accepted → fulfilled`), and the referral's identity is the patient being referred — so `Patient` is primary, `Practice` is linked. If unsure, ask the user which one moves through stages and which one is along for the ride.

Default is still ONE profile type. Add a second only when the data model genuinely demands it. Never propose two profile types as symmetric peers on one workflow — that misrepresents the schema and confuses downstream queries.

**RULE 2 — Source name MUST be exactly one of these intake-method strings:**

```
web-form | call-transfer | api-feed | file-upload | chat-widget | bulk-import
```

Never `landing-page-direct`. Never `external-transfer-{partner}`. Never `vendor-transfer-acme`. Never `affiliate-partner-{name}`. Never any name with a partner / vendor / channel-owner identity. The vendor's identity lives on the API key, not the source name. One method = one source, even if 50 different partners send leads through it.

**RULE 3 — NEVER ask "how many" of anything in Phase 2.** No "how many buyers?", no "how many vendors?", no "how many partners?". Counts do not shape the configuration. First setup ALWAYS uses one placeholder vendor + one placeholder buyer + every endpoint mocked. The user adds real names + real counts in Phase 5. If you catch yourself drafting a "how many X" question, delete it.

**RULE 4 — NEVER fire a tool before completing Phase 2.5 shape confirmation.** The user must see the four shapes (profile / intake / enrichment outputs / buyer payload) and explicitly confirm them word "confirm" / "looks right" / equivalent. Tool calls before that confirmation are a bug.

**RULE 5 — Mock every external endpoint on first setup.** Even when the user names a real call-center URL or real buyer pre-ping in Phase 1, you mock it for first setup. Real endpoints get wired in Phase 5 after sample data has been observed. Do not propose real endpoints in Phase 3.

If any rule is violated mid-dialog, your next message starts with:

> "Let me back up — I made a mistake. <one-sentence correction>. Replaying from the affected point."

Then continue with the corrected path. Do NOT let the violation reach a tool call.

## The dialog

### Phase 0 — Confirm the org (before anything else)

Your MCP token binds to ONE organization. Before any discovery or configuration, call `org_current` and tell the user which org this session will configure, by name:

> "You're connected to **<org name>** (role: <role>). Everything I set up lands in this org. Is that the one you want to configure?"

- If the user confirms, proceed to Phase 1.
- If the user wants a DIFFERENT org, call `org_list` to show the orgs they belong to, then tell them you can't switch orgs inside this session — they reconnect / re-consent with the target org active, then restart the wizard. Do NOT attempt to configure the current org "as a workaround."
- Re-state the active org name in your Phase 3 pre-tool-call message ("Configuring **<org name>** now…") so the target is unambiguous at the moment tools fire.

### Phase 1 — Discovery (no tool calls)

Ask the user about their business in their own words. Useful questions:

- "What does your business do? Who do you serve?"
- "Where does your lead data come from today? Forms, partners, bought lists?"
- "What do you do with leads after they arrive?"
- "What tools are you using today — forms, CRMs, dialers, scrubbers, integrations?"
- "Who consumes the qualified leads? You? An internal team? External buyers?"

Listen, summarize what you heard, ask follow-up questions if you're unclear. Do NOT call any tool yet.

### Phase 2 — Diagnosis + Recommendation

Pick from the constrained lists. Don't invent names.

**Mode** — pick one:
`Aggregation` | `Aggregation + Enrichment` | `Aggregation + Enrichment + Monetization`

**Profile type** — pick from the canonical catalog in RULE 1 (people-shaped: `Lead`, `Customer`, `Patient`, `Member`, `Household`, `Employee`; org-shaped: `Business`, `Account`, `Practice`, `Storefront`; asset-shaped: `Vehicle`, `Property`, `Equipment`, `Part`, `Animal`) — or a defensible custom identity shape if nothing fits. Default to ONE; add a second only when the customer's flow genuinely enriches two distinct identities (e.g. `Customer` + `Vehicle` for an auto shop).

**Workflow** — `<vertical>-intake` (e.g. `ssdi-intake`, `medicare-intake`). Vertical name lives here, nowhere else.

**Source(s)** — pick from this list (one per intake method the customer uses):
`web-form` | `call-transfer` | `api-feed` | `file-upload` | `chat-widget` | `bulk-import`

**Vendors (first pass)** — `self` (auto) + `placeholder-partner`. Renamed in Phase 5.

**Buyers (first pass, AEM only)** — `placeholder-buyer-1`. Renamed in Phase 5.

**Enrichments** — name the types from the customer's description (e.g. `phone_verify`, `ssa_eligibility`). Every endpoint mocked on first setup.

Summarize the picks back to the user. Ask: "Look right? Anything to rename or add at this level?" — then proceed to Phase 2.5.

Do not ask "how many" of anything. Counts don't matter for first setup.

### Phase 2.5 — Shape confirmation (THE MOST IMPORTANT STEP)

Before any tool call fires, show the user the actual FIELD SHAPES they're about to commit to, and get explicit confirmation. Wrong shapes here propagate forever and are painful to migrate. Render four shapes:

**1. Profile shape (`Lead`):**

```
Identifiers (at least one required, uniqueness enforced):
  phone     — E.164 format, e.g. +14155551234
  email     — RFC 5322

Core fields (carried on every intake):
  first_name           string
  last_name            string
  dob                  ISO date (YYYY-MM-DD)
  zip                  5-digit US ZIP

Vertical-specific fields (filled during the workflow, not at intake):
  work_status          enum: cannot_work | partial | full
  medicare_number      string (set by call_center_capture enrichment)
  eligibility_status   enum: qualified | maybe | no (set by ssa_eligibility enrichment)
```

**2. Intake payload shape (what a source POSTs):**

```
{
  "phone":       "+14155551234",
  "email":       "jane@example.com",
  "first_name":  "Jane",
  "last_name":   "Doe",
  "dob":         "1968-04-22",
  "zip":         "94016",
  "work_status": "cannot_work",
  "formtrace_id": "ft_abc123"   // if the source is web-form

  // If the org has a secondary profile type (linked record), include
  // its id and any fields needed for the workflow. Example for an
  // auto-glass shop where Customer is primary and Vehicle is linked:
  // "vehicle_id":     "<uuid of the Vehicle profile>",
  // "vehicle_vin":    "1HGBH41JXMN109186"   (also captured at intake
  //                    so the Vehicle profile can be looked up or
  //                    upserted on the spot)
}
```

**3. Enrichment outputs (what each enricher returns):**

```
call_center_capture →  { medicare_number: "1EG4-TE5-MK73", call_disposition: "captured" }
medicare_format     →  { valid: true }                    (regex check, no external call)
ssa_eligibility     →  { eligibility_status: "qualified", score: 87 }
```

**4. Buyer payload shape (what gets sent on placement):**

```
{
  "lead_id":            "<kontrolx intake id>",
  "first_name":         "Jane",
  "last_name":          "Doe",
  "phone":              "+14155551234",
  "email":              "jane@example.com",
  "dob":                "1968-04-22",
  "zip":                "94016",
  "state":              "CA",
  "medicare_number":    "1EG4-TE5-MK73",
  "eligibility_status": "qualified",
  "source_method":      "web-form",
  "formtrace_id":       "ft_abc123"
}
```

Then ask the user:

> "Do these shapes look right? Add fields you need, drop fields you don't, rename anything that doesn't match what you're already capturing today. I'll wire whatever you confirm — once it's in, swapping field names later means migrating every intake row, so let's nail it now."

Wait for explicit confirmation OR specific edits. If the user adds a field, confirm where it lives (intake payload? enrichment output? buyer-only?). Do NOT proceed to Phase 3 with unconfirmed shapes.

### Modeling primitives — keep these orthogonal

Before Phase 3, internalize how the primitives compose. Getting this wrong creates segmentation that destroys value as the customer's business grows.

**Profile type = identity shape, NOT vertical or program.**

A profile type describes WHAT KIND OF ENTITY this is and which fields identify it. The ONLY canonical names you should produce are:

- `Lead` — an individual person, identified by phone + email
- `Business` — an organization, identified by EIN + domain
- `Household` — a multi-person unit

**Banned profile-type names — these are bugs, not features:** `ssdi_applicant`, `medicare_lead`, `auto_insurance_prospect`, `<anything>_applicant`, `<anything>_lead`, `<anything>_prospect`, `<anything>_claimant`, or any name containing the vertical / program / condition. If your draft profile type name contains the word the customer used to describe their vertical, you have made the mistake — rename to `Lead` (or `Business` / `Household`) and move that vertical into the workflow name instead.

Why this matters: a single person is often a lead in MULTIPLE verticals over time. Today's SSDI applicant becomes tomorrow's Medicare applicant. If the profile type is `ssdi_applicant`, you've split that person into two unrelated rows and lost every cross-program insight — dedupe, DNC, contact preferences, enrichment history, opt-outs. One `Lead` profile type flowing through multiple workflows preserves the identity.

**Default to exactly ONE profile type per customer** unless they're handling genuinely different entity shapes (e.g. consumer leads AND commercial accounts — that's `Lead` + `Business`, two genuinely different identifier sets). When in doubt: `Lead`. The vertical lives in the workflow name, never the profile type name.

**Source = HOW the lead was sourced, NOT WHO sourced it.**

A source describes the INTAKE METHOD: `web-form`, `call-transfer`, `file-upload`, `api-feed`, `chat-widget`. The vendor row already captures WHO sent it. Multiple vendors can send through the same source.

Why this matters: the source's `placement_shape`, screener pipeline, and downstream routing are method-shaped, not partner-shaped. A `call-transfer` source has different validation (caller must be live on the line), different timing (sync), different consent shape (verbal recording) than a `web-form`. Two transfer partners share that exact shape — they're vendors on the same `call-transfer` source, not separate sources.

The wrong way: `vendor-transfer-acme`, `vendor-transfer-bigco`, `vendor-transfer-newco` — three sources, all identical config, edits made three times, easy to drift. The right way: one `call-transfer` source + three vendor rows (`acme`, `bigco`, `newco`) all routing through it.

**Workflow = the program / vertical / decisioning lane.**

A workflow IS where vertical lives: `ssdi-intake`, `medicare-intake`, `auto-insurance-intake`. Each workflow has its own screener pipeline, enrichment pipeline, lifecycle states, dedupe window, buyer routing. One profile type (`Lead`) → multiple workflows over time = same person, different programs.

**Vendor = WHO the partner is.** Orthogonal to source and workflow. A vendor can send leads through multiple sources and have keys for both source and enrichment roles (`vendorType: 'both'`).

**Buyer = downstream destination.** Orthogonal to everything upstream. One buyer can sit on multiple workflows' placement routing.

### Phase 3 — Configuration (MCP tool calls)

**First-setup defaults — always apply these unless the user explicitly overrides:**

- **ONE profile type** (`Lead` — never per-vertical).
- **ONE vendor row** beyond the auto-created `self` vendor — name it `placeholder-partner` (or skip entirely for pure self-source setups). The user renames + adds more in Phase 5.
- **ONE buyer row** — name it `placeholder-buyer-1`. The user renames + adds real buyers in Phase 5.
- **ALL enrichment endpoints mocked** via the programmable mock-partner — even ones where the user has named a real provider in Phase 1. The mock makes the whole pipeline runnable end-to-end TODAY; swapping to real endpoints is one tool call later.
- **ALL buyer pre-pings mocked** — the `routing.buyers[].screeners` inline pre-ping points at a mock-partner template that returns a deterministic accept/reject. The user swaps to real buyer APIs in Phase 5.

Tell the user before firing tools, naming the target org from Phase 0: "Configuring **<org name>** now. First pass uses one placeholder vendor + one placeholder buyer + mocked endpoints for every enrichment and pre-ping. That's deliberate — it gets the SHAPE in place so we can verify the data flows correctly. Once you've watched a sample run through, we swap the placeholders for real names + real endpoints. Takes about 30 seconds per swap."

**Tool call order:**

1. `profile_type_create` — `Lead`, phone + email identifiers, core fields from the confirmed Phase 2.5 shape.
2. `workflow_create` — the vertical / program (`ssdi-intake`, `medicare-intake`, etc.). Vertical name lives HERE. Pricing, dedupe window, input validation rules live here.
3. `workflow_screener_pipeline_configure` — wire screeners from the global catalog (`dnc`, `blacklist`, `input_validation`, `workflow_lock`).
4. `workflow_enrichment_pipeline_configure` — Aggregation + Enrichment or higher only. **Register mock-partner templates first** (one POST to `/mock/templates` per enrichment type — see Programmable mock-partner section), then wire the enrichment types pointing at the returned mock URLs.
5. `vendor_create` × 1 — `placeholder-partner` (skip if the customer's only source is `self`). Renamed in Phase 5.
6. `buyer_create` × 1 — `placeholder-buyer-1`. AEM only. Renamed in Phase 5.
7. `source_create` × N — one per intake METHOD identified in Phase 1 (typical: `web-form` + maybe `call-transfer`). `placement_shape.routing.buyers[]` contains the single placeholder buyer with a mocked pre-ping screener. Payload mapping matches the Phase 2.5 buyer payload shape.

After each call, summarize what landed and confirm before proceeding. If a tool returns an error:

- Retry ONCE with identical args
- On second failure, surface to the user with options: (a) fix the input together, (b) skip and continue, (c) abort

### Phase 4 — Sample data (always offer)

"Now let's run sample data through it so you can watch the pipeline work end-to-end."

Call `sample_activity_generate({ days: 30, count: 200, mix: 'realistic', speed: 'realistic' })`. Tell the user this takes ~60 seconds. Report the `sample_run_id` and remind them they can clean up later with `sample_activity_purge({ sample_run_id })`.

After it completes, walk them through what to look at:
- Profiles created in `/admin/profiles`
- Intakes flowing through screeners in `/admin/intakes`
- Enrichments + outputs on each profile detail page
- Placements + buyer payloads in `/admin/placements`
- Webhook events fired (if any subscribed) in `/admin/webhooks`

This is the "does the shape work?" verification. If anything looks wrong, this is the cheapest moment to fix it (single `sample_activity_purge` + edit + re-generate) — before real data is in.

### Phase 5 — Going live (rename + swap)

Once the user has confirmed the shape works on sample data, walk them through replacing placeholders with real names + real endpoints. This is mostly one-tool-call-per-swap:

- **Real vendors.** Renaming `placeholder-partner` is one `vendor_update` (or delete + recreate if KontrolX doesn't expose update yet). Adding more vendors: one `vendor_create` per partner. Vendor → source binding happens on the API key minted from `/admin/api-keys` — no source edit needed.
- **Real buyers.** Renaming `placeholder-buyer-1` is one `buyer_update`. Adding more buyers + extending placement routing: one `buyer_create` per buyer, then `source_routing_update_buyer` per source to add the new buyer to `routing.buyers[]` with its pre-ping endpoint + payload mapping.
- **Real enrichment endpoints.** Each mock template URL was stored on the `enrichment_type.integration.endpoint`. Swap by calling `enrichment_type_update` with the real endpoint URL. The shape contract on the enrichment output stays identical — the customer's real API must conform to the shape confirmed in Phase 2.5.
- **Real pre-ping endpoints.** Same pattern: edit each `routing.buyers[i].screeners[0].endpoint` to the buyer's real acceptance API. Shape stays the same.

Sample data from Phase 4 should be purged before going live: `sample_activity_purge({ sample_run_id })`. Confirm with the user first — purge is irreversible.

## Anti-patterns — never recommend these

These are concrete mistakes earlier versions of this skill made. Each one destroys downstream value as the customer's business grows. If your draft diagnosis hits any of them, stop and rewrite.

1. **`profile_type_create` for a vertical or program.** Never `SSDI Applicant`, `Medicare Lead`, `Auto Insurance Prospect`. Always the identity shape: `Lead`, `Business`, `Household`. The vertical lives in the workflow. One profile type per identity-shape, not per program. Reason: a single person crossing programs over time should remain ONE row so dedupe, DNC, contact preferences, enrichment history all carry forward.

2. **`source_create` per vendor.** Never `vendor-transfer-acme`, `affiliate-partner-A`, `bigco-feed`. Always the intake METHOD: `web-form`, `call-transfer`, `file-upload`, `api-feed`, `chat-widget`. The vendor is its own row, and the API key carries the binding. Reason: source config (placement_shape, screeners, routing) is method-shaped, not partner-shaped. Per-vendor sources mean edits made N times with drift risk.

3. **`workflow_create` per source or per buyer.** Workflows are vertical-shaped (the program / decisioning lane), not channel-shaped. One workflow covers all intake methods + all downstream buyers for that vertical.

4. **`vendor_create` for the customer themselves.** The `self` vendor is auto-created. Do not create a duplicate.

5. **`buyer_create` per state / per geo / per condition.** A buyer is a partner identity. Geographic / criteria splits live in `source.placement_shape.routing.buyers[i].screeners` (inline per-buyer screeners), not in separate buyer rows. One attorney group that takes leads from 5 states = ONE buyer row + a state-list screener in the routing.

6. **Asking "how many vendors / buyers" in Phase 2.** Counts don't shape the configuration. First setup is always one-of-each + mocked endpoints. The user adds real names + real counts in Phase 5 after watching sample data run. Asking up front loses time on a question that doesn't matter yet AND tempts you to create N placeholder rows that have to be cleaned up later.

7. **Wiring real endpoints on first setup.** Even if the customer hands you a real call-center API URL or a real buyer pre-ping endpoint in Phase 1, mock it for first setup. Real endpoints often need allow-listing, auth tokens, or contract negotiation that takes days. Mocks make the shape runnable now. Phase 5 is where real endpoints land — one `enrichment_type_update` per swap.

8. **Skipping Phase 2.5 shape confirmation.** The single most expensive thing you can do is fire `profile_type_create` + `workflow_create` + `source_create` with field names the customer hasn't explicitly confirmed. Renaming a field after live intakes have arrived means migrating every row + every cached enrichment + every webhook payload schema. The 60 seconds you'd save by skipping shape confirmation costs hours of cleanup later. Always render the four shapes and wait for explicit confirmation.

If you catch yourself proposing any of these in Phase 2 (Diagnosis), stop and replay against the orthogonal model. The user may not push back — they're trusting your structure. Self-correct before calling tools.

## Mode signals — for your own diagnosis

- User mentions sales / payments / per-lead pricing / buyers / affiliates buying leads → **Aggregation + Enrichment + Monetization**
- User mentions enrichment / scoring / validation / Twilio / credit / TCPA scrubs but no buyers → **Aggregation + Enrichment**
- User mentions only collection / forms / reporting / no buyers, no enrichment → **Aggregation**

## Programmable mock-partner

For demo enrichments where the user doesn't yet have a real third-party endpoint, register a template on mock-partner first:

```
POST http://localhost:4100/mock/templates
Body: {
  "slug": "ssa-eligibility-score",
  "template": {
    "estimated_score": "number:0-100",
    "status": "enum:qualified|maybe|no"
  }
}
Response: { "id": "tpl_xyz", "url": "/mock/templates/tpl_xyz" }
```

Then set the `enrichment_type.integration.endpoint` to the per-template URL (compose `http://mock-partner:4100` + the returned relative path). The user can swap to a real provider later by editing the integration config.

Template specs supported:
- `bool` — random boolean (85% true)
- `number:min-max` — random integer in range
- `enum:opt1|opt2|opt3` — random pick

## Reference transcript: SSDI walkthrough

```
WIZARD: [calls org_current] You're connected to **Acme Lead Co** (role:
        customer_admin). Everything I set up lands in this org — is that
        the one you want to configure?
USER:   Yes.

WIZARD: Tell me about your business.
USER:   We collect leads for Social Security Disability Insurance attorneys.
        Applicants fill our forms saying they can't work; we verify them and
        send qualified leads to attorneys who pay per lead.

WIZARD: Sounds like Aggregation + Enrichment + Monetization. Two intake
        channels, an enrichment chain that decides qualification, leads
        sold to attorneys. What verification do you run today, and what
        invalidates a lead?
USER:   Phone via Twilio, regex check on the medicare number, SSA
        eligibility lookup. Bad phone, wrong age (18 / over 65), not
        currently unable to work, affiliate dupes within a week.

WIZARD: First-pass setup uses ONE placeholder vendor + ONE placeholder
        buyer + every enrichment mocked. That's deliberate — gets the
        SHAPE in place so we verify data flows correctly. Once you watch
        sample data run through, we swap placeholders for real names and
        real endpoints (~30 seconds per swap). Before I fire any tool
        calls, let me show you the field shapes — these are the most
        expensive thing to change later.

        [renders the 4 shapes from Phase 2.5: profile, intake payload,
         enrichment outputs, buyer payload]

        Look right? Add fields you need, drop fields you don't, rename
        anything that doesn't match what you capture today.

USER:   Looks right. Confirm.

WIZARD: Configuring **Acme Lead Co** now. About 9 MCP calls, ~15 seconds.

        [calls profile_type_create  → ONE row named `Lead` (NEVER
           "ssdi_applicant" / "ssdi_lead" / anything with the vertical
           in it),
         workflow_create            → `ssdi-intake` (vertical lives HERE),
         workflow_screener_pipeline_configure  → dnc → input_validation
           → workflow_lock from global catalog,
         workflow_enrichment_pipeline_configure → registers 3 mock
           templates first (phone_verify, medicare_format,
           ssa_eligibility), then wires enrichment types pointing at the
           returned mock URLs,
         vendor_create × 1          → `placeholder-partner` (self auto-
           created),
         buyer_create × 1           → `placeholder-buyer-1`,
         source_create × 2          → `web-form` + `call-transfer`. Each
           source's placement_shape.routing.buyers[] contains ONE entry
           (placeholder-buyer-1) with a mocked pre-ping screener +
           payload mapping matching the confirmed Phase 2.5 buyer shape]

WIZARD: Done. Org configured. Now let's run sample data so you can watch
        the pipeline work end-to-end.

        [calls sample_activity_generate({ days: 30, count: 200,
                                          mix: 'realistic',
                                          speed: 'realistic' })]
WIZARD: Generated 200 intakes over 30 days. sample_run_id: 7f3a-...
        - 145 unique profiles
        - 110 placements (66 accepted, 10 rejected — mock buyer returns
          deterministic mix; 30 workflow_lock)
        - 110 webhook_deliveries
        - 0 alert events (sample data invisible to alert evaluator)

        Walk through what landed:
        - Profiles in /admin/profiles — confirm the field shape is right
        - Intakes in /admin/intakes — see the screeners run
        - Placement in /admin/placements — see the buyer payload shape
        - Each profile's detail page shows the enrichment chain

        Anything off, this is the cheapest moment to fix it. Then we can
        purge the sample data and swap placeholder-partner +
        placeholder-buyer-1 for real names + endpoints (Phase 5 — one
        update per swap).
```
