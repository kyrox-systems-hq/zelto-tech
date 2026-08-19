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

## 2. Asset selection rule for outbound

Do not automatically equate "value-first outreach" with "website mock-up".

Before building anything, record the exact source signal(s) or explicit buyer brief and decide which demonstration asset best matches the opportunity. Possible assets include:

- focused website/landing-page mock-up;
- campaign or ad concept;
- demand-generation journey;
- conversion teardown with annotated improvement;
- B2B outbound sample/ICP concept;
- brand/creative concept;
- another small prospect-specific demonstration.

If the opportunity is inferred rather than explicitly requested, label the asset and outreach as a hypothesis/speculative concept. Do not present an inferred need as though the prospect asked for it.

## 3. Source-first requirement

For every outbound prospect, the internal record must preserve:

- exact source URL(s);
- source date/event date;
- what the source explicitly says;
- what Zelto is inferring from it;
- why the inferred problem is commercially relevant;
- why the chosen asset is the right demonstration.

No asset should be built before this source/inference distinction is clear.

## 4. Live-send gate

No first-touch email may be scheduled until all of the following are true:

- the prospect-specific asset is deployed and independently verified live;
- the live route is not a 404 and renders the intended prospect content;
- the closest relevant case-study/project URL has been selected when one exists;
- the email includes the actual live asset URL and relevant proof URL;
- the recipient is an appropriate verified business contact;
- duplicate, opt-out and private-sector gates pass.

## 5. Do not recreate obsolete deployment experiments

Do not add Firebase GitHub Actions, a new Vercel project, a new Zelto-specific watcher, or another installer merely because a prospect URL is not live. First inspect the existing portfolio deployment bridge and trigger it correctly.
