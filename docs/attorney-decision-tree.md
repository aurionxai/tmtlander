# TheMoneyTeam.Law — Attorney/Partner Intake Decision Tree

Authoritative export of the firm-partner intake flow currently running on
`https://aurionxai.github.io/tmtlander/attorneys.html`.

This is **not** the consumer case-evaluator (which lives at
`/astro-preview/`); it's the lead-capture chat that law firms hit when they
want to partner with TMT for things like buying cases, records-prep,
co-counsel splits, marketing, or trial support.

There are **no DQ paths** — every firm that completes the questions reaches the
strategy-call book. The flow exists to qualify *fit* and arm the partner
manager with context before the call.

---

## 0. Conversation skeleton

```
1. Opener   "Welcome — let's see how we can help your firm grow. ~2 minutes. 💼"

2. Five qualifying questions
     a. Practice areas the firm handles      (multi-select, ≥1)
     b. Services the firm needs               (multi-select, ≥1)
     c. Monthly case volume                   (pills, 1 of 4)
     d. Biggest bottleneck right now          (pills, 1 of 4)
     e. Firm contact form                     (firm + name + phone + email + window)

3. Submit → calendar invite + service overview + SMS + scheduled call
```

Progress bar at top advances 10 → 28 → 55 → 70 → 85 → 92 → 100.

---

## 1. Practice areas (multi-select, ≥1 required)

Cards laid out 2-col with icon · title · description.

| Value     | Title                 | Description                                   |
|-----------|-----------------------|------------------------------------------------|
| `auto`    | Auto Accident         | Car, truck, motorcycle, rideshare              |
| `wc`      | Workers' Comp         | On-the-job injuries                            |
| `gpi`     | Personal Injury       | Slip & fall, premises, dog bites               |
| `nh`      | Nursing Home          | Neglect, abuse, falls                          |
| `medmal`  | Medical Malpractice   | Misdiagnosis, surgical errors                  |
| `ssdi`    | SSDI / Disability     | Federal disability claims                      |

Stored under `S.data.practiceAreas` as an array of values. Continue button
disables until at least one card is tapped.

---

## 2. Services needed (multi-select 1-col, ≥1 required)

Single-column list to give each option more visual weight.

| Value             | Title                                  | Description                                                                  |
|-------------------|-----------------------------------------|-------------------------------------------------------------------------------|
| `buy_cases`       | Buy cases                               | Pre-qualified, signed cases delivered weekly                                  |
| `medical_records` | Medical records                          | We pull records, get providers paid, prep the demand                          |
| `intake`          | Intake center                            | 24/7 live intake that pre-qualifies and signs                                  |
| `marketing`       | Marketing                                | TV, digital, SEO — fill your pipeline                                          |
| `co_counsel`      | Co-counsel / referral splits             | Refer cases for a negotiated fee split                                         |
| `lit_funding`     | Lit funding / case advances              | Non-recourse cash advances against settlements                                 |
| `trial_support`   | Trial / appellate support                | Bring in trial attorneys for complex cases                                     |

Stored under `S.data.services`.

---

## 3. Monthly case volume (pills, single-select)

> *"Roughly how many cases does your firm sign per month?"*

| Value    | Label         |
|----------|---------------|
| `1-5`    | 1–5 cases     |
| `5-15`   | 5–15 cases    |
| `15-50`  | 15–50 cases   |
| `50+`    | 50+ cases     |

Stored under `S.data.monthlyVolume`. No DQ — all answers proceed.

---

## 4. Biggest bottleneck (pills, single-select)

> *"What's the biggest bottleneck for your firm right now?"*

| Value       | Label                       |
|-------------|------------------------------|
| `leads`     | 📥 Not enough leads          |
| `capacity`  | 🚧 Capacity / staffing       |
| `marketing` | 💸 Marketing cost / ROI      |
| `records`   | 📋 Records turnaround        |

Stored under `S.data.bottleneck`. No DQ.

> The answer here is the most important signal for the partner manager —
> it dictates which service (from §2) to lead with on the strategy call.

---

## 5. Firm contact form

Bot bubble before form: *"Last step. Drop your details and a partner manager
will reach out within 1 business day. 📞"*

Fields, all required except phone-format validation:

| Field                   | HTML id     | Notes                                                  |
|-------------------------|--------------|---------------------------------------------------------|
| Firm name               | `af_firm`    | Free text, autocomplete=`organization`                 |
| First name              | `af_fname`   | Free text                                              |
| Last name               | `af_lname`   | Free text *(currently not blocking — see Note 1)*       |
| Email                   | `af_email`   | Must contain `@`                                       |
| Direct phone            | `af_phone`   | US 10-digit, accepts +1 / parens / dashes              |
| Strategy-call window    | `af_time`    | Select: `asap` · `morning` · `afternoon` · `evening`   |

Bottom of form has a consent line:

> *"By submitting you consent to a follow-up call, text, and email from
> TheMoneyTeam.Law Firm regarding partnership services. No obligation, no
> commitment."*

On submit, a JSON lead is POSTed to `CFG.smsWebhookUrl` (placeholder).

**Note 1**: Last-name is collected but its presence is not validated. Firm,
first name, email-with-`@`, valid phone, and time are all hard-required.

---

## 6. Submit → strategy-call confirmation

Lead JSON shape posted to the webhook:

```json
{
  "leadType":      "attorney_partner",
  "firm":          "<firm name>",
  "name":          "<first + last>",
  "email":         "<email>",
  "phone":         "<formatted phone>",
  "callTime":      "asap | morning | afternoon | evening",
  "practiceAreas": ["Auto Accident", "Personal Injury", ...],
  "services":      ["Buy cases", "Marketing", ...],
  "monthlyVolume": "1-5 | 5-15 | 15-50 | 50+",
  "bottleneck":    "leads | capacity | marketing | records",
  "submittedAt":   "<ISO-8601>",
  "sourceUrl":     "<page URL>"
}
```

Then the chat shows a success card:

```
📅 You're On the Calendar, <FirstName>!

Thanks for the details. Here's what's happening for <Firm>:

   ✅ <N> practice areas captured
   ✅ <M> services of interest noted
   ✅ Strategy call requested — <today>

   WHAT HAPPENS NEXT
   📅 Calendar invite                 <email>     Sending → Sent ✓
   📧 Service overview + pricing PDF  <email>     Sending → Sent ✓
   💬 SMS confirmation                <phone>     Sending → Sent ✓
   📞 Call from your partner manager  <window>    Scheduled 🕒
```

Status pills animate `Sending → Sent ✓` at 800ms / 1500ms / 2200ms. The call
row reads the firm's preferred window (`asap` → "Within 1 business hour";
others → the label of the selected window).

Final button: **"← Submit another firm"** restarts the chat.

---

## Appendix A. No-DQ design

Unlike the consumer evaluator, the partner intake has zero hard
disqualifications. Even if a firm answers "50+ cases" with "Not enough leads"
or "1–5 cases" with "Trial support", the chat proceeds. The qualification
signal lives in the *combination* of answers and is read by the partner
manager during the human strategy call.

The closest thing to a DQ would be a firm that abandons mid-form (no
practice areas selected, etc.) — handled implicitly by the Continue button
staying disabled until ≥1 selection.

---

## Appendix B. Data captured

`S.data` keys at submit time:

- `practiceAreas: string[]`   (`auto` / `wc` / `gpi` / `nh` / `medmal` / `ssdi`)
- `services: string[]`         (7 values from § 2)
- `monthlyVolume: string`      (one of 4)
- `bottleneck: string`         (one of 4)

Then merged with the contact-form fields into the JSON lead object in § 6.

---

## Appendix C. Differences vs. the consumer evaluator

| Aspect                    | Consumer evaluator                | Attorney intake               |
|---------------------------|------------------------------------|--------------------------------|
| Number of questions       | 8–20 depending on path             | Always 5                       |
| Branching                 | Heavy — case-type tree             | None — linear                  |
| DQ paths                  | ~15 distinct DQ reasons            | None                           |
| TCPA disclaimer           | Required (texting visitor)         | Soft consent line on form      |
| Submit destination        | submitLead → attorney intake queue | Webhook → partner-manager CRM  |
| Post-submit               | "What happens next" + retainer     | "On the calendar" + 4-row comm panel |
| Signature / retainer step | Required for qualified consumer    | None                           |

---

*Generated from the JS in `attorneys.html` (functions `startChat`,
`showMultiSelectCards`, `showFirmContactForm`, `submitAttorneyLead`,
`showAttorneySuccess`).*
