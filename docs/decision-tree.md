# TheMoneyTeam.Law — Case Evaluator Decision Tree

Authoritative export of the qualification logic running on
`https://aurionxai.github.io/tmtlander/astro-preview/`.

The chat asks the visitor a sequence of questions; each answer either advances
the flow, **disqualifies** (DQ — terminal, with an optional offer to text the
visitor a bar-association link), or **qualifies** (proceeds to contact +
retainer + submit).

---

## 0. Conversation skeleton

```
1. Pick practice area  (Auto · WC · GPI · NH · MedMal · SSDI)
2. Shared front-matter
     a. Full name
     b. Representative status (self · legal rep · friend/family-non-legal)
     c. Attorney / claim gate (hired? settled? no)
3. Area-specific qualification gates  (Auto / WC / GPI / NH / MedMal)
4. Outcome
     - QUALIFIED  →  Contact info  →  Retainer  →  Submit + "What happens next"
     - DQ        →  Offer to text a bar-assoc link  →  Submit if Yes
     - Non-legal rep, qualified  →  Injured-person referral + signed consent
```

Every DQ in this document is wrapped by the **post-DQ link-offer flow**
(§ Appendix A). Every phone capture carries TCPA consent language
(§ Appendix B).

---

## 1. Shared front-matter (runs once per session)

```
NAME            → "What's your full name?"
                   On commit, bot says "Nice to meet you, {First}!"

REP             → "Are you seeking a review for yourself or for someone else?"
                   ├─ Myself           → continue
                   └─ Someone else
                        REP TYPE       → "Legal rep / Guardian, OR friend / family / non-legal?"
                                          ├─ Legal rep         → continue ("answer as the person")
                                          └─ Friend / family   → continue, sets `intakeBlocked=true`
                                              (will end at the info-referral flow, § 8)

ATTORNEY GATE   → "Have you already hired an attorney or settled your claim?"
                   ├─ Yes, hired attorney   → DQ  "switch attorneys" message
                   ├─ Claim already settled → DQ  "matter is closed"
                   │      (Medical Malpractice: settled = DQ outright)
                   └─ No                    → continue into area flow
```

---

## 2. AUTO ACCIDENT

```
ROLE            → "Driver, passenger, or pedestrian?"
                   ├─ Driver        → § 2A
                   ├─ Passenger     → skip to § 2C  (no fault gate)
                   └─ Pedestrian    → § 2B
```

### 2A. Driver

```
FAULT           → "Did you cause the accident?"
                   ├─ Yes (at fault)
                   │      PASSENGERS  → "Were there any passengers in your car?"
                   │                     ├─ No  → DQ
                   │                     └─ Yes
                   │                          REFER  → "Refer them for a free consultation?"
                   │                                    ├─ Yes → collect passenger {name, phone, email}
                   │                                    │         then DQ ("we can't help the at-fault driver
                   │                                    │         but we'll reach out to them")
                   │                                    └─ No  → DQ (no-network message for at-fault)
                   │
                   ├─ No (not at fault) / Fault not yet determined
                   │      PASSENGERS  → "Were there any passengers in your car?"
                   │                     ├─ No  → § 2C
                   │                     └─ Yes
                   │                          REFER → "Refer them?"
                   │                                    ├─ Yes → collect passenger {name, phone, email}
                   │                                    │         → § 2C
                   │                                    └─ No  → § 2C
                   │
                   └─ (no other branches)
```

### 2B. Pedestrian

```
CROSSING        → "Were you in a crosswalk, on a sidewalk, or did you have the walk sign?"
                   ├─ Yes (crosswalk/sidewalk/walk sign)  → § 2D  (skips insurance/claim)
                   ├─ I don't know                         → § 2D
                   └─ No                                   → DQ
```

### 2C. Driver/passenger continuation: insurance → claim → police

```
INSURANCE       → "Does either vehicle have insurance?"
                   ├─ Yes — both                → continue
                   ├─ At least mine             → continue
                   ├─ I don't know              → continue
                   └─ Neither vehicle           → DQ

CLAIM FILED     → "Has an insurance claim already been filed?"
                   ├─ Yes  → optional CLAIM #  → adjuster warning bubble  → § 2D
                   ├─ No   → adjuster warning bubble  → § 2D
                   └─ Don't know → adjuster warning bubble → § 2D
```

### 2D. Police report → time bucket

```
POLICE          → "Was a police report filed at the scene?"
                   ├─ Yes        → AGENCY TYPEAHEAD (HIFLD 23,486 US agencies)
                   │                → optional REPORT NUMBER
                   ├─ Not sure   → continue
                   └─ No report  → "Have you filed one with police/DMV since?" (Yes/No)

TIME BUCKET     → "When did the accident happen?"
                   ├─ Within 30 days        → § 2E
                   ├─ 90 days to 1 year     → § 2F
                   └─ More than 1 year      → DQ
```

### 2E. 30-day branch

```
HURT?           → ├─ Yes — injuries        → TREATMENT
                  ├─ Sore, no doctor        → TREATMENT (bot urges seeing a doctor)
                  └─ Property damage only   → DQ

TREATMENT       → Multi-select Doctor / Urgent care / ER (any combination, or none)

INJURIES        → Multi-select 12 injury types
                   any selection → QUALIFIED
                   12 options: Neck or back pain · Shoulder/knee ligament strains ·
                               Muscle strain/whiplash · Anxiety/emotional distress ·
                               Head injury/concussion · Broken bones · Shoulder/knee
                               ligament tears · Internal bleeding or ruptures ·
                               Scarring or permanent marks · PTSD · Death · Other
```

### 2F. 90-day-to-1-year branch

```
HURT?           → ├─ Yes — injuries + received medical treatment → TREATMENT
                  ├─ Sore, no doctor                              → DQ
                  └─ Property damage only                         → DQ

TREATMENT       → Multi-select Doctor / Urgent care / ER / Specialist (≥1)
                   ├─ Specialist included (any combination) → INJURIES
                   └─ Only Doctor/Urgent/ER (no specialist)  → BIG BILLS

BIG BILLS       → "Big medical bills — like $10,000 or more?"
                   ├─ Yes $10k+                            → QUALIFIED
                   ├─ No, but still treating               → INJURIES
                   └─ Treatment ended / no big bill        → DQ

INJURIES        → Multi-select 12 injury types
                   ├─ ONLY soft injuries (neck/back, ligament strains,
                   │   muscle/whiplash, anxiety/distress)  → DQ
                   └─ Any "hard" injury included (head, broken bones,
                       ligament tears, internal bleeding, scarring, PTSD,
                       death, other)                       → QUALIFIED
```

---

## 3. GENERAL PERSONAL INJURY (GPI)

```
NEGLIGENCE      → "Hurt because of someone else's carelessness within the last year?"
                   ├─ Yes — within 1 year         → continue
                   └─ No — more than a year ago   → DQ

ALLOWED         → "Were you allowed to be in the place where you got hurt?"
                   ├─ Yes (customer/guest/public) → continue
                   └─ No (wasn't supposed to be there) → DQ

LOCATION        → Retail · Private business · Private residence · Public park ·
                  Public area · School · Government building

TIME BUCKET     → ├─ Within 30 days       → § 3A
                  ├─ 90 days to 1 year    → § 3B
                  └─ More than 1 year     → DQ
```

### 3A. GPI 30-day branch

```
TREATMENT       → "Have you seen a doctor — or are you willing to?"
                   ├─ Yes — already seeing one  → INJURIES
                   ├─ Yes — willing to          → INJURIES
                   └─ No, but I'm willing       → INJURIES

INJURIES        → Multi-select 12 injury types  → any selection → QUALIFIED
```

### 3B. GPI 90-day-to-1-year branch

```
TREATMENT       → Multi-select Doctor / Urgent care / ER / Specialist (≥1)
                   ├─ Specialist included           → INJURIES
                   └─ Only Doctor/Urgent/ER         → BIG BILLS

BIG BILLS       → "Big medical bills — like $50,000 or more?"
                   ├─ Yes $50k+                     → QUALIFIED
                   ├─ No, but still treating        → INJURIES
                   └─ Treatment ended / no big bill → DQ

INJURIES        → Multi-select 12 injury types
                   ├─ ONLY soft → DQ
                   └─ Any hard  → QUALIFIED
```

---

## 4. WORKERS' COMP

```
WHERE HURT      → "Were you hurt at work or while doing your job?"
                   ├─ Yes — at work                 → continue
                   ├─ Commuting to/from work        → REDIRECT to AUTO (§ 2)
                   ├─ No — not work-related         → REDIRECT to GPI (§ 3)
                   └─ No                             → DQ

WC INSURANCE    → "Does your employer have Workers' Comp insurance?"
                   ├─ Yes / Unsure / No  → all continue (no DQ here)

TIME GATE       → "< 1 year since you got hurt — or since your last WC payment?"
                   ├─ Yes — within 1 year           → continue
                   ├─ Got a payment within 1 year   → continue (resets clock)
                   └─ No — over a year              → DQ

INJURIES        → Multi-select 12 injury types
                   ├─ Any hard injury               → QUALIFIED
                   └─ ONLY soft injuries
                        OFF WORK 3+ MONTHS?
                          ├─ Yes  → QUALIFIED
                          └─ No   → DQ
```

Redirect note: when a WC visitor picks Commuting / Not-work-related, the chat
pivots `state.area` to Auto or GPI (clearing WC-namespaced data) while
preserving the shared front-matter (name, rep, attorney gate).

---

## 5. NURSING HOME (NH)

```
SYMPTOMS        → Multi-select  Bed sores · Broken bones · Malnutrition ·
                                Dehydration · Sexual abuse · Other
                   ├─ Only "Other" selected   → DQ
                   └─ Any other combination   → continue

FACILITY        → Typeahead lookup against the CMS Nursing Home Compare
                  "Provider Information" dataset (4pq5-n9py, 14,699 facilities).
                  Selecting a row captures {name, address, city, state, zip,
                  CCN}. Free-text fallback if no match.

TIME GATE       → "Did this happen within the last year?"
                   ├─ Yes — within the last year                 → QUALIFIED
                   ├─ I only learned of it within the last year  → QUALIFIED
                   └─ No — more than a year ago                  → DQ
```

---

## 6. MEDICAL MALPRACTICE (MM)

(Attorney gate's "Claim already settled" path is a **hard DQ** here, not just
"matter closed.")

```
TYPE            → ├─ Wrong / missed diagnosis  → § 6A
                  ├─ Birth injury                → § 6B
                  ├─ Bed sores                   → § 6A  (uses the diagnosis path)
                  └─ Medication error            → § 6C
```

### 6A. Diagnosis / Bed sores

```
OUTCOME         → "Would correct care have greatly improved your chances of
                   getting better or living longer?"
                   ├─ Yes — big difference          → TIME GATE
                   ├─ Probably / possibly           → TIME GATE
                   └─ No — outcome would be same    → DQ

TIME GATE       → "< 1 year since it happened (or you first found out)?"
                   ├─ Yes  → QUALIFIED
                   └─ No   → DQ
```

### 6B. Birth injury

```
BIRTH TIME      → "Your child's claim follows them — when did the injury occur?"
                   ├─ Within last 3 years   → QUALIFIED
                   ├─ Within last 18 years  → QUALIFIED
                   └─ Longer than 18 years  → DQ
```

### 6C. Medication error

```
GRAVITY         → "How grave is the injury?"
                   ├─ Death                                  → QUALIFIED
                   ├─ Permanent severe impairment/disability → QUALIFIED
                   └─ Other                                  → DQ
```

---

## 7. Contact + retainer (qualified path)

After any QUALIFIED outcome, **unless `intakeBlocked` is true** (non-legal
rep, see § 8):

```
LEAD PHONE      → Text input with TCPA consent (§ Appendix B)
                  Accepts +1, parens, spaces, dashes; normalised to (xxx) xxx-xxxx.

(SMS VERIFY)    → 2FA code, only if SMS_VERIFY_URL is configured.

LEAD EMAIL      → Text input. Auto-trim + lowercase. Friendly error hints if
                  bad ("Please include an @", "domain like example.com", etc.).

CALL TIME       → Morning · Afternoon · Evening · Anytime

— RETAINER —

ADDRESS         → Street + ZIP only. ZIP triggers zippopotam.us lookup, fills
                  city + state inline ("Beverly Hills, CA"). Stored as
                  {street, city, state, zip, formatted}.

UPLOAD          → Optional: photos / police reports / medical bills.

SIGNATURE       → Inline canvas. Confirms retainer + accuracy of statements.

SUBMIT          → submitLead(area, data, qualified=true)
                   on success: bot bubble "✅ Submitted" + "What happens next"
                              panel with Text/Email/Call status pills, TCPA
                              footnote.
                   on error:    "We couldn't submit just now — please call us."
```

---

## 8. Non-legal-representative path (`intakeBlocked = true`)

When the visitor identifies as friend/family/non-legal rep in § 1, qualification
runs as normal but `intakeBlocked` is set. After the area flow returns
qualified, the chat skips contact + retainer and instead collects the **injured
person's** referral info:

```
WRAP-UP         → (first bubble) "Thanks for the info — case worth reviewing,
                   but you'll need to be the legal representative…"

INJURED NAME    → Text input. Required, first + last.
INJURED PHONE   → Text input with TCPA-for-others consent (§ Appendix B).
INJURED EMAIL   → Text input. Auto-trim/lowercase.
CONSENT         → Signature pad — confirms you have permission to share their
                  details and that we may contact them.

SUBMIT          → submitLead(area, data, qualified=true)
                   "Thanks — we'll reach out to {First} only after they
                    confirm they want to talk."
                   "✅ Referral submitted."
```

---

## Appendix A. Post-DQ link-text offer (wraps every DQ)

```
After any hard DQ reason fires:

OFFER            → (DQ reason) + "Want us to text you a link with your local
                    bar association info so you can find an attorney faster?"
                    ├─ Yes
                    │      LEAD PHONE (with TCPA consent)
                    │      → "✅ Got it — we'll text the link…"
                    │        submitLead(area, {..., dqLinkRequested: true})
                    └─ No
                           → "Take care, and best of luck with your case."
```

---

## Appendix B. TCPA disclaimer text

Visible on every phone-capture step and as a footnote on the submit panel.

**TCPA_SELF** (own phone):
> By providing your phone number you consent to receive text messages from
> TheMoneyTeam.Law about your inquiry, including automated messages.
> Msg & data rates may apply. Reply STOP to opt out, HELP for help.

**TCPA_OTHER** (someone else's phone — passenger referral or injured person):
> By providing this number you confirm you have permission to share it with
> TheMoneyTeam.Law for follow-up. They may receive automated text messages
> from us. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

**Submit-panel footnote** (qualified path):
> By submitting this form you consent to receive calls, texts, and emails
> from TheMoneyTeam.Law (including automated messages). Msg & data rates may
> apply. Reply STOP to opt out, HELP for help. Consent is not a condition
> of any service.

---

## Appendix C. Soft-vs-hard injury sets

Used by the auto / GPI / WC "soft-only DQ" rule.

**SOFT** (any combination of just these → DQ in the 90-day-to-1-year branch
and the WC injury step):
- Neck or back pain
- Shoulder / knee ligament strains
- Muscle strain / whiplash
- Anxiety / emotional distress

**HARD** (any one of these qualifies):
- Head injury / concussion
- Broken bones
- Shoulder / knee ligament tears
- Internal bleeding or ruptures
- Scarring or permanent marks
- PTSD
- Death (on behalf of deceased)
- Other

---

## Appendix D. Data captured & submitted

| Stage | Keys stored under `state.data` |
|---|---|
| Pre-flow | `leadName`, `repFor`, `repType`, `claimStatus` |
| Auto | `autoRole`, `autoFault`, `autoPedCrossing`, `autoPassengersAtFault/NotAtFault`, `autoAtFault/NotAtFaultRef{Name,Phone,Email}`, `autoInsurance`, `autoClaim`, `autoClaimNumber`, `autoPolice`, `autoPoliceAgency` *(FacilityRecord)*, `autoPoliceReportNumber`, `autoPoliceSince`, `autoTime`, `auto30Hurt/Treatment/Injuries`, `auto90Hurt/Treatment/BigBills/Injuries` |
| GPI | `gpiNegligence`, `gpiAllowed`, `gpiLocation`, `gpiTime`, `gpi30Treatment/Injuries`, `gpi90Treatment/BigBills/Injuries` |
| WC | `wcWhere`, `wcInsurance`, `wcTimeGate`, `wcInjuries`, `wcOffWork` |
| NH | `nhSymptoms`, `nhFacility` *(FacilityRecord with CCN)*, `nhTime` |
| MM | `mmType`, `mmDiagnosisOutcome`, `mmTime`, `mmBirthTime`, `mmMedErrorGravity` |
| Contact | `leadPhone`, `phoneVerified` *(optional 2FA)*, `leadEmail`, `callTime` |
| Retainer | `mailingAddress` *(structured record)*, `supportingDocs`, `retainerSignature` *(data-URL)* |
| Non-legal rep | `injuredName`, `injuredPhone`, `injuredEmail`, `injuredContactConsent` |
| DQ-link | `dqLinkOffer`, `dqLinkRequested` |

---

## Appendix E. Out-of-scope

The **SSDI / Disability** flow exists but follows the legacy gates from the
prior version (not the post-spec rewrite). It does **not** run the shared
front-matter (no NAME/REP/ATTORNEY gate) and **does** still gate on can-work,
SGA pay limit, 12-month duration, work credits, and applied/denied/approved
status. To bring SSDI under the same shared front-matter, add the per-spec
attorney/claim gate, run NAME at the top, and decide whether non-legal rep is
allowed.

---

*Generated from the authoritative source files in `src/flows/`. To regenerate,
re-read those files: `shared.ts`, `auto.ts`, `gpi.ts`, `wc.ts`, `nh.ts`,
`medmal.ts`, `contact.ts`, `retainer.ts`, `info-referral.ts`, `dq-offer.ts`,
`referral.ts`, `index.ts`.*
