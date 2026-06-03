# TheMoneyTeam.Law — Consumer Knockout Questions

Plain-English export of every disqualifying ("knockout") question across the
consumer case evaluator. Built from the live flow code (`src/flows/`,
`src/flows/v2/`).

Use this list to:
- Pre-screen visitors **before** opening the full chat (a "Do I qualify?"
  tile on a landing page)
- Write ad copy that mirrors the criteria
- Brief an intake call agent on the bare-minimum decisions
- Drive a separate qualification widget that lives outside the chat

Every "knockout" path on the live chat also offers to **text the visitor a
local-bar-association link** before the conversation ends, so a DQ doesn't
have to be a dead end.

---

## 0. Universal (asked in every flow, before the area-specific gates)

**Q0.1 — Have you already hired an attorney for this case, or has the claim already been settled?**

| Answer | Outcome |
|---|---|
| ✅ **No** | Continue — proceed to the area-specific flow |
| ❌ **Yes, hired attorney** | **DQ** — *"We can only step in for people who don't have representation yet. Switch is easy: call your current attorney and tell them you no longer want them on the case. Then come back."* |
| ❌ **Claim already settled** | **DQ** — *"Once a claim is settled, we can't reopen it."* (For Medical Malpractice this is a hard DQ; for all others it ends the chat but the link-text offer is still made.) |

---

## 1. AUTO ACCIDENT

### 1.1 Role
**Q — Were you the driver, a passenger, or a pedestrian?**

- Driver → goes to fault gate (Q1.2)
- Passenger → skips fault, goes straight to insurance gate (Q1.4)
- Pedestrian → goes to crossing gate (Q1.3)

### 1.2 Driver fault
**Q — Did you cause the accident?**

| Answer | Outcome |
|---|---|
| **No / Fault not yet determined** | Continue to passenger-presence check (Q1.5) |
| **Yes (at fault)** | Continue to passenger-presence check, but path ends in **DQ** for the driver themselves. Their passengers may still have a case — see Q1.5. |

### 1.3 Pedestrian crossing
**Q — Were you in a crosswalk, on a sidewalk, or did you have the walk signal when it happened?**

| Answer | Outcome |
|---|---|
| ✅ **Yes** (crosswalk / sidewalk / walk signal) | Continue |
| ✅ **I don't know** | Continue (counts as no admission) |
| ❌ **No** (jaywalking, against signal, etc.) | **DQ** — generic no-network message |

### 1.4 Insurance coverage
**Q — Do you know if either vehicle had insurance?**

| Answer | Outcome |
|---|---|
| ✅ Yes — both vehicles | Continue |
| ✅ At least the vehicle I was in | Continue |
| ✅ Not sure / I don't know | Continue |
| ❌ **Neither vehicle** | **DQ** — without any coverage there's nothing to recover against |

### 1.5 Passengers (driver path only)

If the driver had passengers, the chat offers a side-channel referral
(name / phone / email) for the passengers' own potential case. This is **not** a
knockout for the original visitor — it's an addition.

If the driver was **at fault** AND had **no passengers** to refer, the driver
themselves is **DQ'd** (we don't have at-fault-driver coverage in network).

### 1.6 Time bucket
**Q — When did the accident happen?**

| Answer | Outcome |
|---|---|
| ✅ Within the last 30 days | Continue to 30-day branch (Q1.7) |
| ✅ 90 days to 1 year ago | Continue to 90-day branch (Q1.9) |
| ❌ **More than 1 year ago** | **DQ** — statute of limitations risk |

### 1.7 30-day branch — were you hurt?
**Q — Were you physically hurt in the accident?**

| Answer | Outcome |
|---|---|
| ✅ Yes — I have injuries | Continue (Q1.8) |
| ✅ Sore but haven't seen a doctor | Continue, bot urges seeing a doctor |
| ❌ **Property damage only — no injuries** | **DQ** — *"Property-damage-only cases aren't a fit. If anything hurts in the next few days, even something minor, reach back out right away."* |

### 1.8 30-day injuries — qualifying multi-pick (all pass)
**Q — Select everything that applies to your injuries.**

Any selection from the 12-option list qualifies. Options include neck/back
pain, ligament strains, whiplash, anxiety, head injury, broken bones, ligament
tears, internal bleeding, scarring, PTSD, wrongful death, other.

### 1.9 90-day-to-1-year branch — were you hurt?
**Q — Were you physically hurt in the accident?**

| Answer | Outcome |
|---|---|
| ✅ Yes — injuries AND I received medical treatment | Continue to treatment-mix gate (Q1.10) |
| ❌ **Sore but haven't seen a doctor** | **DQ** — too old to start treatment now |
| ❌ **Property damage only — no injuries** | **DQ** |

### 1.10 90-day treatment mix
**Q — Who have you seen for treatment since the accident?** (multi-select)

| Pick | Outcome |
|---|---|
| ✅ Specialist (any combo) | Skip Big-Bills, go straight to Q1.12 injuries |
| ✅ Only Doctor / Urgent care / ER (no specialist) | Continue to Q1.11 Big-Bills |
| ❌ Nothing selected | **DQ** |

### 1.11 Big medical bills ($10k+)
**Q — Honest question — are your medical bills in the range of $10,000 or more?**

| Answer | Outcome |
|---|---|
| ✅ **Yes — $10k or more** | **QUALIFIES** |
| ✅ No, but still treating | Continue to injuries (Q1.12) — soft-only DQ rule still applies |
| ❌ **Treatment ended / no big bill / one-time visit** | **DQ** |

### 1.12 90-day injuries — soft-only DQ
**Q — Select all that apply to your injuries.**

| Pick | Outcome |
|---|---|
| ✅ Any "hard" injury — concussion, broken bones, ligament tears, internal bleeding, scarring, PTSD, wrongful death, other | **QUALIFIES** |
| ❌ **Only "soft" injuries** — neck/back pain, ligament strains, muscle strain/whiplash, anxiety/emotional distress | **DQ** |

---

## 2. GENERAL PERSONAL INJURY (GPI)

### 2.1 Negligence timing
**Q — Were you hurt because of someone else's negligence, and did it happen within the last year?**

| Answer | Outcome |
|---|---|
| ✅ Yes — within 1 year | Continue |
| ❌ **More than a year ago** | **DQ** |

### 2.2 Allowed to be there
**Q — Were you somewhere you were allowed to be — like a customer, guest, or just out in public?**

| Answer | Outcome |
|---|---|
| ✅ Yes | Continue |
| ❌ **No** (trespass / restricted area) | **DQ** |

### 2.3 Location
**Q — Where did it happen?** Retail store · Private business · Private residence · Public park · Public area · School · Government building.

No DQ on any pick — captured for context.

### 2.4 Time bucket
**Q — When did the incident happen?**

| Answer | Outcome |
|---|---|
| ✅ Within the last 30 days | 30-day branch (Q2.5) |
| ✅ 90 days to 1 year ago | 90-day branch (Q2.6) |
| ❌ **More than 1 year ago** | **DQ** |

### 2.5 GPI 30-day branch
- Treatment willingness asked, no DQ.
- Any injury selection → **QUALIFIES**.

### 2.6 GPI 90-day branch
- Treatment-mix gate: specialist → injuries; only Doctor/Urgent/ER → Big-Bills.
- **Big-Bills gate ($50,000+** — higher than Auto because the case has to clear a higher value bar to be worth pursuing at this age**)**:
  - ✅ $50k+ → **QUALIFIES**
  - ✅ Still treating → injuries (soft-only rule applies)
  - ❌ Treatment ended / no big bill → **DQ**
- Soft-only injuries → **DQ**; any hard → **QUALIFIES**.

---

## 3. WORKERS' COMP (WC)

### 3.1 Where it happened
**Q — Were you hurt at work or while doing your job?**

| Answer | Outcome |
|---|---|
| ✅ Yes — at work | Continue to WC |
| ↪ Commuting | **Pivots to AUTO flow** (bot: "Since this happened during your commute, we'd actually like to have it reviewed as an auto accident — if WC ends up being part of it, an attorney will sort it out.") |
| ↪ Not work-related | **Pivots to GPI flow** (bot: "Sounds like this might be better handled as a personal injury claim — let's take a look at it from that angle.") |
| ❌ No | **DQ** |

### 3.2 Time bucket
**Q — Has it been less than a year since you got hurt — or since your last WC payment?**

| Answer | Outcome |
|---|---|
| ✅ Yes — within the last year | Continue |
| ✅ Got a payment within the last year (resets the clock) | Continue |
| ❌ **No — over a year** | **DQ** |

### 3.3 Injuries
- Any **hard** injury → **QUALIFIES** immediately.
- **Soft-only** injuries → continue to off-work gate (Q3.4).

### 3.4 Off-work duration (soft-only path only)
**Q — Has the injury kept you out of work for more than 3 months?**

| Answer | Outcome |
|---|---|
| ✅ Yes | **QUALIFIES** |
| ❌ **No** | **DQ** |

---

## 4. NURSING HOME (NH)

### 4.1 Symptoms
**Q — Has your loved one experienced any of the following while in a nursing facility's care?** (multi-select)

Options: Bed sores · Broken bones · Malnutrition · Dehydration · Sexual abuse · Other.

| Pick | Outcome |
|---|---|
| ✅ Any specific symptom (alone or combined) | Continue |
| ❌ **Only "Other" — nothing specific** | **DQ** — we can't pre-qualify without one of the named patterns |

### 4.2 Time bucket
**Q — Did this happen within the last year?**

| Answer | Outcome |
|---|---|
| ✅ Yes — within the last year | **QUALIFIES** |
| ✅ I only found out within the last year (discovery rule) | **QUALIFIES** |
| ❌ **No — over a year ago** | **DQ** |

---

## 5. MEDICAL MALPRACTICE (MM)

### 5.1 Type of incident
**Q — What best describes what happened?**

- Wrong / missed diagnosis → 5.2 outcome gate
- Birth injury → 5.4 birth-time gate
- Bed sores → 5.2 outcome gate
- Medication error → 5.5 gravity gate

### 5.2 Outcome would have changed (diagnosis / bed sores)
**Q — Would getting the right diagnosis sooner (or proper care) have meaningfully changed your outcome — your recovery or how long you have to live?**

| Answer | Outcome |
|---|---|
| ✅ Yes — big difference | Continue to 5.3 |
| ✅ Probably / possibly | Continue to 5.3 |
| ❌ **No — outcome would have been the same** | **DQ** — no causation, no case |

### 5.3 MM time gate (diagnosis / bed sores)
**Q — Has it been less than a year since it happened — or since you first suspected something went wrong?**

| Answer | Outcome |
|---|---|
| ✅ Yes — less than 1 year | **QUALIFIES** |
| ❌ **No** | **DQ** |

### 5.4 Birth-injury time
**Q — When did the injury occur?** (child's claim gets extended statute)

| Answer | Outcome |
|---|---|
| ✅ Within the last 3 years | **QUALIFIES** |
| ✅ Within the last 18 years | **QUALIFIES** |
| ❌ **More than 18 years ago** | **DQ** |

### 5.5 Medication-error gravity
**Q — How serious were the consequences of the medication error?**

| Answer | Outcome |
|---|---|
| ✅ **Death** | **QUALIFIES** |
| ✅ **Permanent severe impairment / disability** | **QUALIFIES** |
| ❌ **Other** (recoverable / minor) | **DQ** — case value too low for med-mal economics |

---

## 6. The 6 hard universal blockers (TL;DR for a pre-screen tile)

If you're building a **single pre-screen widget** to put on the landing page
before opening the full chat, these six binary checks knock out the most
common non-qualifying visitors before they spend 2 minutes:

| # | Question | Knockout answer |
|---|---|---|
| 1 | Have you already hired an attorney for this case? | **Yes** |
| 2 | Has the claim already been settled? | **Yes** |
| 3 | Did the incident happen more than 1 year ago? | **Yes** (except Birth-injury MM and certain NH discovery cases) |
| 4 | Was it property damage only — no injuries at all? | **Yes** (auto only) |
| 5 | Were you the at-fault driver with no passengers riding with you? | **Yes** (auto only) |
| 6 | For medication errors / wrong diagnosis: would the outcome have been the same anyway? | **Yes** |

Anything that passes those six lands the visitor in the chat where the
area-specific gates above run.

---

## 7. Notes for product copy

- **Soft vs. hard injuries** is the single biggest filter in the 90-day-to-1-year
  Auto/GPI buckets. If marketing copy wants to set expectations, name the
  hard list explicitly: **broken bones, concussion, ligament tears, internal
  bleeding, scarring, PTSD, wrongful death.**
- The **$10k Auto / $50k GPI** Big-Bills threshold is asked phrasing
  ("Honest question — are your medical bills in the range of $X or more?")
  and is intentionally framed as "honest" so users feel safe answering No.
- **Discovery rule** is worth surfacing — both NH and MM accept "I only
  found out recently" as a qualifying answer when the underlying time
  bucket is over a year. Saves cases that look stale on the surface.
- **Commuting WC** is a hidden win: the visitor came in thinking it was a
  no-go and gets pivoted into AUTO without re-starting. Worth highlighting
  on landing-page FAQ copy.

---

*Generated from `src/flows/` (v1) and `src/flows/v2/` (warm-copy). The
qualification logic is identical between v1 and v2 — only the wording
differs. To regenerate, re-read those files plus
`src/flows/{shared,contact,retainer,info-referral,dq-offer}.ts`.*
