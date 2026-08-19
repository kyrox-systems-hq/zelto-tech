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

## 6. Live-send gate

No first-touch email may be scheduled until all applicable items are true:

- the Outreach Strategy & Offer Design step is complete;
- the intended recipient has been chosen by strategy, then an exact public business email has been verified;
- the selected prospect-specific asset/offer exists in final form, if a separate asset was selected;
- any hosted asset is deployed and independently verified live;
- the live route is not a 404 and renders the intended prospect content;
- the closest relevant case-study/project URL has been selected when one exists;
- the email includes the actual live asset URL and relevant proof URL when applicable;
- duplicate, opt-out and private-sector gates pass.

## 7. Do not recreate obsolete deployment experiments

Do not add Firebase GitHub Actions, a new Vercel project, a new Zelto-specific watcher, or another installer merely because a prospect URL is not live. First inspect the existing portfolio deployment bridge and trigger it correctly.
