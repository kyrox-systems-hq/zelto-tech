# Zelto Tech Project Resources

This file is the canonical pointer for recurring Zelto project infrastructure and outreach rules that must not be rediscovered from scratch.

## 1. Canonical outbound mock-up deployment route

**Do not invent a new deployment system unless Suhayb explicitly asks to replace this one.**

The proven, already-installed deployment bridge is the personal-portfolio outreach deployer:

- GitHub repo: `kyrox-systems-hq/suhayb-manzar-portfolio`
- Branch: `agent/weekly-outreach-system`
- Prospect asset path: `public/mockups/<prospect-slug>/`
- Deployment trigger: `public/mockups/.deploy-ready`
- Firebase project: `suhayb-manzar-portfolio`
- Live route: `https://suhayb-manzar-portfolio.web.app/mockups/<prospect-slug>/`
- Installed watcher source: `scripts/outreach-deployer/Watch-OutreachDeploy.js`
- Installer/source-of-truth: `scripts/outreach-deployer/Install-OutreachAutoDeploy.js`
- Local installed root: `%LOCALAPPDATA%\Kyrox\outreach-deployer`
- Poll interval in the final watcher: 30 seconds

### Trigger format

After the prospect asset is committed and audited, update `public/mockups/.deploy-ready` on `agent/weekly-outreach-system` with:

```text
slug=<prospect-slug>
requested_at_utc=<UTC ISO timestamp>
```

The installed Node watcher then:

1. fetches the outreach branch;
2. detects the changed marker SHA;
3. resets the local checkout to the branch;
4. deploys Firebase Hosting using the already-authenticated local Firebase CLI;
5. verifies the live prospect route returns successfully;
6. verifies `X-Robots-Tag` contains `noindex`;
7. records the processed marker SHA locally.

A GitHub commit or marker update is **not** proof that deployment completed. Before outreach, independently fetch the live route and verify the actual prospect content.

### Important distinction

The main Zelto website remains in `kyrox-systems-hq/zelto-tech` and is served from `zelto-tech.web.app`.

**Automated outbound prospect concepts/mock-ups use the already-installed portfolio deployment bridge above.** This is deliberate because that bridge is already installed, authenticated and proven end to end.

## 2. Mandatory Outreach Strategy & Offer Design step

A qualified lead must **not** move straight from account research into asset production, recipient selection by email availability, or email writing.

Before building anything or rejecting a lead because a particular person's email is unavailable, run a separate reasoning/research step whose job is to decide the best way to earn a response from this specific prospect.

The strategy record must answer:

- What does the source explicitly say the company is doing, prioritising or struggling with?
- What is Zelto inferring rather than knowing?
- Who is the best first recipient, and why? Compare role relevance, authority, accessibility and whether a functional champion is a better first entry than an executive.
- What is the single commercial objective of the outreach?
- What concrete value can Zelto offer before asking for time?
- Which format is strongest for this account: email-only insight, hosted PDF/brief, mock-up, campaign concept, annotated teardown, mini audit, benchmark, B2B outbound sample, case-study-led note, video/visual concept, or a combination?
- Should the asset be linked, hosted or attached? For first-touch cold email, consider security friction and do not default to an unexpected attachment.
- Which existing Zelto case study/project is closest, if any?
- What CTA best fits the asset and recipient?
- What should the follow-up path be if there is no reply?
- What are the biggest risks in the hypothesis, and how should the outreach avoid overstating them?

The strategy step must compare at least 2-3 plausible approaches and record why the selected one is superior for this prospect.

**Contact verification happens after this decision.** First choose the ideal recipient or ranked recipient set. Then verify an exact public business email for the best legitimate option. Do not let easy email availability silently choose the recipient.

## 3. Asset / offer selection rule for outbound

Do not automatically equate "value-first outreach" with "website mock-up", PDF, or any other separate artifact.

The strategy step may choose:

- focused website/landing-page mock-up;
- hosted PDF or commercial brief;
- campaign or ad concept;
- demand-generation journey;
- conversion teardown with annotated improvement;
- B2B outbound sample/ICP concept;
- brand/creative concept;
- benchmark or peer comparison;
- another small prospect-specific demonstration;
- **or no separate asset at all** when a concise email plus relevant case study/insight is genuinely stronger.

If the opportunity is inferred rather than explicitly requested, label any asset and outreach as a hypothesis/speculative concept. Do not present an inferred need as though the prospect asked for it.

If a separate asset is selected, effort should be proportional to opportunity quality, likely deal value and expected usefulness. Do not overbuild merely to satisfy a process step.

## 4. Source-first requirement

For every outbound prospect, the internal record must preserve:

- exact source URL(s);
- source date/event date;
- what the source explicitly says;
- what Zelto is inferring from it;
- why the inferred problem is commercially relevant;
- the Outreach Strategy & Offer Design decision;
- alternatives considered and rejected;
- why the chosen asset/offer is the right demonstration;
- ideal recipient(s) before email availability is checked.

No asset should be built before this source/inference distinction and outreach strategy are clear.

## 5. PDF rule

When a PDF is the selected format, keep it concise and decision-useful, generally 3-6 pages rather than a generic deck. A useful structure is:

1. why now / explicit source trigger;
2. facts versus Zelto inference;
3. 2-4 concrete opportunity routes;
4. one worked execution example or small test plan;
5. the nearest relevant proof;
6. a simple next step.

For first-touch outreach, prefer a clean hosted link or browser-openable PDF over an unexpected attachment unless there is a specific reason attachment delivery is better.

## 6. Mandatory adversarial review

Before any prospect package is approved, run a separate adversarial review of **the strategy, the asset/offer, and the final email**. The reviewer must actively try to reject or improve the work rather than merely confirm it.

The adversarial review must challenge:

- whether the selected outreach strategy is actually stronger than the alternatives considered;
- whether any source fact has silently become an unsupported claim;
- whether an inference is being presented as something the prospect explicitly said;
- whether the recipient is the best legitimate first contact rather than simply the easiest verified email;
- whether the selected proof is truly analogous and accurately described;
- whether the asset creates useful value or merely demonstrates effort;
- whether the CTA is the strongest natural next step;
- whether any sentence or visual is generic, creepy, padded, self-congratulatory or unnecessary;
- whether the package overstates Zelto's knowledge of the prospect's internal performance;
- whether a simpler approach would outperform the chosen asset.

For the email specifically, every sentence must earn its place. Reject generic agency introductions, filler, unsupported urgency, vague praise and meeting-begging when a stronger value-progression CTA is available.

Record the issues found and the revisions made. **Unresolved material objections fail the prospect package.**

## 7. Creative quality / wow-factor gate

Any prospect-facing visual asset must pass a separate creative-quality review after factual/editorial review. Strategic correctness is not enough.

The asset must feel **premium, deliberate, modern and unmistakably prospect-specific**. It should itself demonstrate the standard Zelto claims to offer across marketing, web, creative and AI-enabled execution.

For PDFs and briefs:

- render and inspect every page visually before approval;
- check typography, hierarchy, spacing, alignment, contrast, consistency and page balance;
- use diagrams, information design and visual storytelling where they improve comprehension;
- avoid a flat Word-document look, generic consultancy template or text-heavy deck;
- check for clipping, awkward wrapping, crowded cards, formatting defects and weak visual rhythm;
- make the cover and at least one internal page visually memorable without becoming decorative noise;
- ensure the document would be credible and comfortable for the recipient to forward internally.

For web/mock-up assets:

- inspect desktop and mobile layouts;
- confirm brand fidelity, genuine asset use, responsive behaviour, CSP compatibility, visual hierarchy and conversion logic;
- reject generic-template appearance or anything that could plausibly have been sent unchanged to another company.

If the result is merely competent, basic or visually forgettable, **the gate fails and the asset must be redesigned before outreach**.

## 8. Live-send gate

No first-touch email may be scheduled until all applicable items are true:

- the Outreach Strategy & Offer Design step is complete;
- the intended recipient has been chosen by strategy, then an exact public business email has been verified;
- the selected prospect-specific asset/offer exists in final form, if a separate asset was selected;
- the adversarial review has passed and all material objections were resolved;
- any visual asset has passed the creative-quality / wow-factor gate;
- any hosted asset is deployed and independently verified live;
- the live route is not a 404 and renders the intended prospect content;
- the closest relevant case-study/project URL has been selected when one exists;
- the email includes the actual live asset URL and relevant proof URL when applicable;
- duplicate, opt-out and private-sector gates pass.

## 9. Do not recreate obsolete deployment experiments

Do not add Firebase GitHub Actions, a new Vercel project, a new Zelto-specific watcher, or another installer merely because a prospect URL is not live. First inspect the existing portfolio deployment bridge and trigger it correctly.

## 10. Daily output target and recovery semantics

The normal cold-outbound target is **five completed quality initial outreaches per Asia/Karachi weekday**, not five research attempts, five prospects discovered, or five assets created.

Mach42 on 19 August 2026 is a separate bonus prospect and does not count toward the normal five.

A prospect counts toward a day's five only when every applicable research, qualification, strategy, creative and adversarial gate has passed and the real first-touch email is either:

- verified delivered in Outlook Sent Items that day; or
- genuinely queued using Outlook-native scheduling for delivery that same day in an appropriate recipient-local business window, and the scheduled item is visible/verifiable in Outlook.

The following do **not** count: rejected prospects, research logs, unsent drafts, merely-created assets, GitHub commits, deployment-blocked work, failed sends, ChatGPT tasks/reminders, obsolete outreach, or packages that failed adversarial/creative review.

The production automation intentionally has more run slots than the five-email target. These are **recovery capacity**, not permission to send more than five. Every run checks the current completed count first. Once five normal initials are completed, all remaining runs that day stop. If a run fails or a prospect is rejected, a later recovery slot finds or completes another prospect instead.

Do not weaken the 80+ qualification threshold, private-sector rules, source quality, asset quality, buyer selection, adversarial review or creative standard to fill the quota. Use additional private-signal searches, different geographies/service lanes and later recovery slots instead.

## 11. Outlook-native scheduling is mandatory

When an initial email is scheduled for future delivery, it must be scheduled through Outlook's native scheduling action so the item is visible and verifiable in Outlook. **A ChatGPT automation/reminder is not an acceptable substitute for an Outlook scheduled email.**

After scheduling, verify recipient, subject, body, delivery time and links in Outlook before counting it toward the daily five.

If the chosen value asset is a PDF or other attachment and Outlook's native scheduled-send path cannot carry attachments, do not create a hidden future-send automation. Prefer a professionally hosted/browser-openable version and link it in the email. If an attachment is strategically essential, send only when the current time is already inside the recipient's appropriate business window and the direct Outlook send action supports the attachment.

## 12. Current campaign architecture: Intent-Led and Trigger-Led

The service-outreach system is intentionally split into **two mutually exclusive production campaigns** sharing the same daily physical-send capacity.

### Intent-Led

Intent-Led is for current public buyer/operator evidence that the prospect is actively seeking or recommending a relevant supplier/service, explicitly stating a Zelto-addressable problem, or describing an active implementation/project requirement.

- The prospect's own intent/problem/project is the qualifying basis.
- Funding, expansion, hiring, advertising, leadership changes or launches may support the case but cannot replace intent.
- Search the freshest evidence first. Current automation uses a 24-hour primary window and may extend to 72 hours when needed.
- If a candidate is attractive only because of account-level commercial triggers, route it to Trigger-Led instead of weakening the Intent definition.

### Trigger-Led

Trigger-Led is proactive outreach based on verified company change, spend, commercial momentum or capacity signals where the prospect is **not** publicly asking for the service.

- Funding alone is insufficient.
- One hire, one executive change or an unattractive website alone is insufficient.
- The account must have a concrete Zelto-addressable opportunity and a credible case that external execution could plausibly be purchased.
- If current explicit service-seeking intent is found, route the prospect to Intent-Led.

Current Trigger-Led Quality Gate v2 uses a 100-point model: trigger stack 20; concrete opportunity 20; service fit 15; external purchase/outsourcing plausibility 15; buyer economics 10; timing 10; decision-maker/contact quality 5; proof/personalisation 5. Total must be at least 80 and the campaign also enforces non-compensable category floors. A high headline score cannot compensate for weak external-purchase plausibility or weak opportunity evidence.

### Shared rules

- Intent-Led receives the first production opportunity each weekday.
- Intent + Trigger share one physical-send ceiling/target of five first touches per Asia/Karachi weekday, across all delivery mailboxes used for Zelto service outreach.
- A production slot is a research/recovery opportunity, not an automatic send.
- Rejections do not lower the quality threshold and do not consume a quality completion.
- A company must not be independently pursued in both campaigns for the same opportunity.
- Stage order is a hard gate. Discovery/verification/qualification/research/strategy-value/copy-review/CRM-delivery records must exist in the correct sequence before release. A review written after scheduling does not retroactively make a message compliant.
- The final email must visibly deliver the strongest Strategy-stage idea. It must not merely promise that Zelto could think of something later.
- Both campaigns inherit the strategy, source-first, proof-provenance, adversarial-review, creative-quality and Outlook-native delivery rules in this document.

## 13. Follow-up and verification rules

An automated follow-up clock starts only from the **actual verified send timestamp**, never merely from the scheduled time.

Normal automated follow-ups are Day 3, Day 7 and Day 12 **business days** after verified first-touch delivery.

Any substantive reply, manual continuation by Suhayb, explicit opt-out, bounce or Do Not Contact state suppresses automated follow-up. Out-of-office is not a substantive reply.

Day 3 should resurface the specific value/idea without becoming a generic nudge. Day 7 must add one genuinely useful new observation/refinement/proof extension. Day 12 closes the loop cleanly. Follow-up copy must pass its own adversarial review and must never use `just checking in` filler.

## 14. CRM and source-of-truth hierarchy

For accepted prospects, the intended commercial system of record is HubSpot: company, target contact, association, Lead lifecycle/status, campaign/source context, research/strategy/proof notes and next-action task. Do not create a Deal until a genuine commercial opportunity exists.

Outlook remains the source of truth for actual message scheduling/delivery, thread state and replies. monday.com is the source of truth for campaign operating rules, quality-gate changes, incidents and durable process decisions. This GitHub resource preserves the cross-system canonical rules and deployment infrastructure.

Never claim a blocked CRM write succeeded. When connector confirmation blocks a write, record the exact proposed package and the blocked state.

## 15. Transition-draft safety rule

When an older scheduled message was queued before a newer quality standard took effect, it still consumes **physical send capacity** while it remains pending, even if it no longer counts as a quality-compliant completion.

Do not schedule a corrected replacement or another Zelto service-outreach initial while a pending transition message would cause the shared physical-send ceiling to be exceeded.

If the connector cannot cancel or modify a deferred-send Outlook item, record the failure accurately and require manual Outlook cancellation rather than creating a hidden duplicate mechanism.

If a transition message sends despite no longer meeting the current standard:

- preserve the actual send for historical/reply handling;
- classify it as transition/noncompliant rather than a current quality completion;
- do not use it as an automated Day 3/7/12 follow-up seed unless it is separately revalidated under the current standard;
- do not send a duplicate corrected first touch to the same account.

### 20 August 2026 incident

Five pre-v2 Trigger-Led Outlook drafts were left physically scheduled for 20 August while two other Trigger first touches had already been sent through Gmail. The five transition subjects were:

- `Rappor's next phase of growth`
- `GoSmarter's expansion`
- `TidalSense commercialisation`
- `For Matthew Carr: turning pilots into partnerships`
- `For Chris Grannell: North America growth`

Fresh cancellation attempts through the Outlook connector returned Microsoft 502 on the deferred-send objects. These five therefore required manual cancellation in Outlook to prevent physical delivery. The permanent Intent and Trigger automations were kept enabled but explicitly blocked from adding any new initial while the transition drafts remained pending.

Under the v2 re-audit, Rappor and TidalSense were HOLD/REJECT; GoSmarter survived with corrected copy; Luffy AI survived with the current EVP GTM as the appropriate first owner rather than the old CEO route; Urban Zoo/Gamechanger survived with its CCO and verified direct route rather than the old CEO/generic route.
