<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/hero-dark.svg">
  <img alt="Sai Vidyut C — The model interprets. The code decides. Five products built since March 2026: Clip Management System, SatQuery AI, RazorFlow, DocNA, BluePrint." src="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/hero-light.svg" width="100%">
</picture>

I build AI products where the model is one component, not the architecture. The interesting part is never the prompt — it's the boundary I put around it.

### `01` &nbsp;Selected work

<table>
<tr><td>

#### SatQuery AI &nbsp;<sup>[repo](https://github.com/Sai-Vidyut/SatQuery-AI) · [live](https://sat-query-ai-self.vercel.app)</sup>

Ask questions about satellite imagery in plain language and get answers you can inspect on the map.

<img src="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/satquery-workstation.jpg" width="100%" alt="The SatQuery workstation: satellite imagery over Bengaluru with a drawn 5.3 square kilometre area of interest, a plain-language question in the composer, and the AOI, upload, temporal-pair and cross-modal analysis modes.">

**Why it exists** — Imagery tools hand analysts a summary and ask them to trust it. Before you act on "construction started here," you need to see which pixels said so.

**Key idea** — Every run emits an execution trace plus map-linked evidence regions with per-region confidence. Four analysis paths share that one evidence contract: change detection over an area and date range, single-image VQA on an uploaded GeoTIFF, before/after comparison, and joint optical + SAR.

**Stack** — FastAPI · Pydantic · Google Earth Engine · GeoChat-7B on a GPU service · Next.js 15 · MapLibre GL

<sub>Three-person team at SRMIST; I led backend and AI systems. The deployed link is the workstation itself — the Earth Engine and GPU inference pipeline runs locally.</sub>

</td></tr>
</table>

<table>
<tr><td>

#### RazorFlow &nbsp;<sup>[repo](https://github.com/Sai-Vidyut/RazorFlow)</sup>

A merchant commerce agent that turns buyer intent into a policy-governed sale. Not a chatbot.

<img src="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/razorflow-admin.jpg" width="100%" alt="The RazorFlow merchant control plane: captured GMV, order and payment counters including policy blocks, and an audit trail of agent decisions, policy evaluations, checkouts and Razorpay outcomes.">

**Why it exists** — A model that can name products can also invent prices, undercut margin, and sell past a merchant's order cap. No merchant can ship that.

**Key idea** — Gemini only produces a validated `StructuredIntent`: category, budget in paise, exclusions, sort, result mode. It never receives the catalog and never emits a SKU. Deterministic code owns everything downstream — product resolution, filtering, ranking — and a policy engine applies the discount ceiling, margin floor, and order cap to the final offer. Remove the API key and a deterministic parser drives the identical pipeline.

**Stack** — Next.js 16 · TypeScript · PostgreSQL + Prisma · Razorpay · Vitest · Playwright

<sub>Built for the Razorpay Buildathon, AI Growth &amp; Agentic Commerce track. Runs locally. Figures above are the seeded demo merchant on Razorpay test mode — every row is a real audit event, including the declines.</sub>

</td></tr>
</table>

<table>
<tr><td>

#### DocNA &nbsp;<sup>[repo](https://github.com/Sai-Vidyut/Project-DocNA)</sup>

Finds the questions and blanks in a Word document, answers them, and writes back surgically.

**Why it exists** — The obvious approach is to regenerate the document, which destroys the formatting, tables, and headers that made it a real document.

**Key idea** — Four boundaries that never blur: AI produces answer text, placement produces typed `PlacementOp` values, a DOCX adapter performs the OOXML mutation, and the uploaded original is never touched. Because placement is a stored plan rather than a model call, human edits re-apply from that immutable original instead of re-running generation.

**Stack** — Python · FastAPI · OOXML · React + Vite

<sub>311 tests passing. 18 of 18 real-AI evaluation fixtures complete.</sub>

</td></tr>
</table>

<table>
<tr><td>

#### BluePrint &nbsp;<sup>[repo](https://github.com/Sai-Vidyut/project-blueprint) · [live](https://project-blueprint-eight.vercel.app)</sup>

Describe a software idea, get a developer-grade implementation plan — architecture, schema, endpoints, roadmap.

<img src="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/blueprint-diagram.jpg" width="100%" alt="A generated blueprint for a restaurant inventory system, showing in-scope and out-of-scope MVP items above a rendered system diagram of the frontend, API service and database layer.">

**Why it exists** — Planning is the slowest part of starting a build and the part least often written down.

**Key idea** — One Zod schema is the source of truth, and the `Blueprint` TypeScript type is inferred from it rather than hand-declared, so the runtime and compile-time contracts can't drift. The diagram above is Mermaid generated deterministically from the structured architecture data — the model is never asked for diagram syntax, so it can never return a diagram that fails to render.

**Stack** — Next.js 16 · React 19 · Zod · Gemini · Mermaid

</td></tr>
</table>

<br>

### `02` &nbsp;The pattern

Three of those products are the same idea wearing different clothes.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/pattern-dark.svg">
  <img alt="One pattern, three products. RazorFlow: buyer intent in plain language, Gemini extracts a structured intent, the contract is category, budget, exclusions and mode, then a catalog engine ranks and policy caps the offer. DocNA: questions and blanks in a .docx, AI writes the answer text only, the contract is typed PlacementOp values, then an OOXML adapter edits a copy rather than the original. BluePrint: a one-line product idea, the model returns a structured plan, the contract is a Zod schema, then a Mermaid diagram is built from the plan data." src="https://raw.githubusercontent.com/Sai-Vidyut/Sai-Vidyut/main/assets/pattern-light.svg" width="100%">
</picture>

<br>

### `03` &nbsp;Currently building

**SatQuery AI** — Evidence-scoped conversation: instead of chatting about the imagery in general, you talk to a specific evidence region and the backend keeps the exchange bound to it.

**RazorFlow** — Separating what a buyer may see from what staff may change. Buyers observe policy *effects* on the desk; reading or mutating the guardrails requires a verified staff account.

<br>

### `04` &nbsp;Lab

Smaller things I build to answer a question I actually have.

**[Clip Management System](https://github.com/Sai-Vidyut/clip-management-system)** — My first full-stack media app: upload video clips, extract metadata with ExifTool, generate thumbnails with FFmpeg, and store everything in Azure Blob Storage. FastAPI and SQLAlchemy on the backend; React, Vite, and TanStack Query on the front. Built March 2026, published September 2026.

**GeoChat on Colab** — A self-contained notebook that supervises a GPU inference service for the 7B vision model, hardened against OOM during model load and against stale exit-file races when the service restarts. Lives inside [SatQuery AI](https://github.com/Sai-Vidyut/SatQuery-AI).

**[Instagram Dashboard](https://github.com/Sai-Vidyut/Instagram-Dashboard)** — My first pass at keeping an integration boundary honest: routes, services, and repositories are separated so the mock Composio layer can be replaced with live SDK calls without the API contract moving. [Live](https://instagram-dashboard-pearl.vercel.app).

<br>

### `05` &nbsp;Stack

```
product surface   TypeScript · Next.js App Router · React · Tailwind
systems & ai      Python · FastAPI · Pydantic · Gemini · provider fallback chains
data              PostgreSQL · Prisma · SQLAlchemy · SQLite
storage           Azure Blob Storage
geospatial        MapLibre GL · Google Earth Engine · GeoTIFF, optical + SAR
media             FFmpeg · ExifTool
correctness       Zod · Vitest · Playwright · pytest
```

<br>

### `06` &nbsp;Build log

```
2026-09-06   satquery-ai            seasonality-aware Earth Engine change detection
2026-08-29   razorflow              post-payment desk state, staff-only policy auth
2026-08-28   razorflow              hybrid discovery: Gemini intent, deterministic catalog
2026-08-21   docna                  document workspace pipeline and review UI
2026-08-18   blueprint              in-blueprint AI assistant with chat and change flow
2026-03-23   clip-management-system v1.0.0 feature complete
2026-03-20   clip-management-system dashboard, sidebar filters, upload modal
2026-03-18   clip-management-system FastAPI backend, React frontend, Azure Blob Storage
```

<br>

### `07` &nbsp;Contact

[saividyut4@gmail.com](mailto:saividyut4@gmail.com) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/sai-vidyut-chandramohan-584473406/)
