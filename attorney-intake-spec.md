# Attorney Partner Intake — Workflow Spec

> **Live page:** https://aurionxai.github.io/tmtlander/attorneys.html
> **Audience:** law-firm decision-makers (managing partners, principals)
> **Estimated time to complete:** ~2 minutes
> **Goal:** capture qualified partnership leads and book a 20-min strategy call
>
> **For reviewers:** review each step, mark suggested changes inline (✏️ or "EDIT:"), and return.
> Anything in a bold-italic box below is a question for you to weigh in on.

---

## Step 0 — Welcome message

**Bot says:**
> "Welcome — let's see how we can help your firm grow. Takes about 2 minutes. 💼"

***Reviewer Q:*** *Is this opener right, or should it lead with a specific value prop (e.g. "Get pre-qualified cases delivered this week")?*

---

## Step 1 — Practice areas (multi-select)

**Bot asks:**
> "Which practice areas does your firm handle? **Tap all that apply** 👇"

**Type:** Multi-select cards. Continue button enables once at least one is selected.

**Options:**

| Icon | Title | Description |
|------|-------|-------------|
| 🚗 | Auto Accident | Car, truck, motorcycle, rideshare |
| 🏗️ | Workers' Comp | On-the-job injuries |
| ⚕️ | Personal Injury | Slip & fall, premises, dog bites |
| 🏥 | Nursing Home | Neglect, abuse, falls |
| 🩺 | Medical Malpractice | Misdiagnosis, surgical errors |
| ♿ | SSDI / Disability | Federal disability claims |

***Reviewer Q:*** *Should we add Mass Tort, Class Action, Employment Law, Civil Rights, or Wrongful Death (all of which the firm site lists as active practice areas)?*

---

## Step 2 — Services needed (multi-select)

**Bot asks:**
> "Where does your firm need help most? **Pick everything that fits** 👇"

**Type:** Multi-select cards (single column on mobile so descriptions stay readable).

**Options:**

| Icon | Title | Description |
|------|-------|-------------|
| 🎯 | **Buy cases** | Pre-qualified, signed cases delivered weekly |
| 🏥 | **Medical records** | We pull records, get providers paid, prep the demand |
| 📞 | **Intake center** | 24/7 live intake that pre-qualifies and signs |
| 📣 | **Marketing** | TV, digital, SEO — fill your pipeline |
| 🤝 | **Co-counsel / referral splits** | Refer cases for a negotiated fee split |
| 💵 | **Lit funding / case advances** | Non-recourse cash advances against settlements |
| ⚖️ | **Trial / appellate support** | Bring in trial attorneys for complex cases |

***Reviewer Q:*** *Are these the 7 right services? Anything else we sell that should be here (e.g. CLE training, practice management consulting, AI/tech tooling)?*

---

## Step 3 — Monthly case volume (single-select)

**Bot asks:**
> "Roughly how many cases does your firm sign per month?"

**Options:**

- 1–5 cases
- 5–15 cases
- 15–50 cases
- 50+ cases

***Reviewer Q:*** *Are these the right buckets? Do we serve solo practitioners (1–5) or is that too small to be worth our time?*

---

## Step 4 — Biggest bottleneck (single-select)

**Bot asks:**
> "What's the biggest bottleneck for your firm right now?"

**Options:**

- 📥 Not enough leads
- 🚧 Capacity / staffing
- 💸 Marketing cost / ROI
- 📋 Records turnaround

***Reviewer Q:*** *Is "Conversion rate" or "Cash flow / case funding" a more common pain point than what's listed? Should we add one?*

---

## Step 5 — Firm contact form

**Bot says:**
> "Last step. Drop your details and a partner manager will reach out within 1 business day. 📞"

**Fields:**

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Firm name | text | ✅ | "Smith & Associates" |
| First name | text | ✅ | "Your first name" |
| Last name | text | optional | "Last name" |
| Email | email (must contain @) | ✅ | "you@yourfirm.com" |
| Direct phone | tel (validated) | ✅ | "(555) 000-0000" |
| Best time for a 20-min strategy call | select | ✅ | ASAP / Mornings (9am–12pm) / Afternoons (12pm–5pm) / Evenings (5pm–7pm) |

**Submit button:** "📅 Book my strategy call"

**Consent footer (small print under the button):**
> "By submitting you consent to a follow-up call, text, and email from TheMoneyTeam.Law Firm regarding partnership services. No obligation, no commitment."

***Reviewer Q:*** *Do we need bar number, state(s) admitted, or firm size (# attorneys) here? Or does that come up on the strategy call?*
***Reviewer Q:*** *Is the consent language sufficient for our jurisdiction(s)? Anything compliance wants added?*

---

## Step 6 — Success screen

**Header:** 📅 "You're On the Calendar, *[FirstName]*!"

**Subhead:**
> "Thanks for the details. Here's what's happening for **[FirmName]**:"

**Checklist (shown statically):**
- ✅ *N* practice area(s) captured
- ✅ *N* service(s) of interest noted
- ✅ Strategy call requested — *[today's date]*

**"What happens next" panel (mockup with simulated send animation — no real services fire yet):**

| Icon | Title | Detail | Status |
|------|-------|--------|--------|
| 📅 | Calendar invite | [their email] | Sending → ✓ Sent (~0.8s) |
| 📧 | Service overview + pricing PDF | [their email] | Sending → ✓ Sent (~1.5s) |
| 💬 | SMS confirmation | [their phone] | Sending → ✓ Sent (~2.2s) |
| 📞 | Call from your partner manager | Within 1 business hour OR during selected window | 🕒 Scheduled |

**Bottom button:** "← Submit another firm"

***Reviewer Q:*** *Is "1 business hour" the SLA we want to promise for an ASAP request, or is "1 business day" more realistic?*
***Reviewer Q:*** *Should we offer a "Schedule directly via Calendly" link as an alternative to waiting for the partner manager?*

---

## Captured lead payload (what the backend receives)

```json
{
  "leadType": "attorney_partner",
  "firm": "Smith & Associates",
  "name": "Jane Smith",
  "email": "jane@smithlaw.com",
  "phone": "(555) 123-4567",
  "callTime": "morning",
  "practiceAreas": ["Auto Accident", "Personal Injury"],
  "services": ["Buy cases", "Medical records"],
  "monthlyVolume": "5-15",
  "bottleneck": "leads",
  "submittedAt": "2026-05-26T14:32:00.000Z",
  "sourceUrl": "https://aurionxai.github.io/tmtlander/attorneys.html"
}
```

---

## "Ask a question" knowledge base (header button)

Attorneys can tap **❓ Ask a question** in the chat header at any time to open a side panel with pre-loaded FAQs. 18 topics currently:

| Topic | Sample phrasing the matcher catches |
|-------|--------------------------------------|
| **Pricing** | fee, cost, pricing, how much, split, commission |
| **Case supply** | what kinds of cases, what do you sell, case mix |
| **Onboarding speed** | how long, when do I get, turnaround |
| **Volume** | how many, capacity, monthly, throughput |
| **Case quality** | pre-qualified, screening, vetting, tire-kicker |
| **Geographic coverage** | states, where, nationwide, jurisdiction |
| **Credentials** | experience, results, track record, awards |
| **Mayweather brand** | floyd, money team, endorsement, ambassador |
| **Intake center** | 24/7, live agent, bilingual |
| **Medical records** | retrieval, pull records, demand package |
| **Marketing** | TV, SEO, digital, CPL |
| **Co-counsel** | referral, fee split |
| **Lit funding** | advance, non-recourse, cash advance |
| **Trial support** | second-chair, verdict, appellate |
| **Sign-up process** | strategy call, onboarding, get started |
| **Confidentiality** | private, data, will you steal my clients |
| **Direct phone** | call, contact, reach someone |
| **Bar / ethics** | compliance, rules, conflict |

***Reviewer Q:*** *Which of these answers need to be reworded? Is any FAQ missing? Are any of the numbers (CPL, settlement amounts, response SLAs) wrong and need updating?*

---

## How to suggest edits

1. **Copy this file** (`attorney-intake-spec.md`) into a doc / email / wherever.
2. **Mark changes inline** with ✏️ or "EDIT:" notations next to each item.
3. **Reply to the bracketed Reviewer Q questions** above with your call.
4. **For new questions** to add to the flow, paste a draft Q + the option list.
5. Send back — we'll make the changes and re-publish.
