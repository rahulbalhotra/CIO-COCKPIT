# CIO / CTO Cockpit

Interactive executive intelligence prototype based on the supplied platform blueprint. All data, evidence references, confidence scores and narrative are simulated. No enterprise connector, live AI service, authentication or backend is implemented.

## Run

Open `index.html` in a modern browser, or serve this repository directory using a local web server. No build or dependencies required. Internet access is optional for Google Fonts; system fonts provide a fallback.

## Included

- **Enterprise Knowledge Graph**: Interactive SVG cross-system graph mapping the "Golden Thread" from ERP Cost Centers -> Jira Initiatives -> ServiceNow Services -> Cloud Infrastructure -> Contracts.
- **Graph Builder Mode**: Dynamic connection builder to establish dependencies, impacts, and funding relationships across data points in real time with `localStorage` persistence and AI suggestions.
- **Cross-System Blast Radius**: Automatically computes and highlights upstream capital dependencies and downstream service disruptions when selecting any node.
- **Multi-Source Data Feeds (`mockData.js`)**: Ingestion schemas and mock datasets for ServiceNow (ITSM/CMDB), SAP ERP (GL & Cost Centers), Cloud & FinOps (AWS/Azure/GCP), Jira PMO, and Contracts.
- **Data Sources Catalog View**: Tabular inspection for all ingested enterprise system records with direct "View in Graph" navigation.
- CIO and CTO perspectives reorder the 12 executive KPIs.
- October and September sample KPI snapshots.
- KPI evidence dialogs with owner, target and illustrative confidence.
- Cloud, SaaS and renewal savings register, with estimates distinct from realised savings.
- Contract renewal pipeline with simulated notice deadlines.
- Five executive actions with local browser status persistence and reset.
- Interactive cost savings scenario with explicit assumptions.
- Human-review board pack draft with text download and print / PDF controls.
- Responsive consulting-style layout and keyboard focus states.
- Link to https://github.com/subratatec1?tab=repositories

## Suggested next product slice

Begin with governed finance and cloud billing CSV imports, real KPI definitions, source lineage and owner review. Then add contract extraction and board-pack narrative with record citations. Add SSO, access controls and audit logging before using confidential enterprise data. Treat autonomous actions, broad connectors, predictive models and benchmarking as later phases.
