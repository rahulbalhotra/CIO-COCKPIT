const $=s=>document.querySelector(s);
let view='overview',role='CIO',month='October';
let selectedNodeId='SN-CI-501', selectedSourceFilter='all', graphMode='explorer', graphZoom=1.0, searchQuery='';
let focusBlastRadius=true;

const pages={
  overview:['◫','Executive overview','What changed. What matters. What to do next.'],
  graph:['☊','Enterprise graph','Connect disparate operational, financial, and technical systems.'],
  catalog:['▦','Data sources','Mock ingested feeds: ServiceNow, SAP ERP, AWS FinOps, Jira & Contracts.'],
  spend:['◈','Spend intelligence','Turn technology spend into measurable business value.'],
  renewals:['▤','Contract renewals','Act before the renewal window closes.'],
  actions:['☷','Decision & action log','Accountability from finding to measurable outcome.'],
  scenario:['◇','Scenario planner','Explore the effect of cost and capacity decisions.'],
  pack:['▣','Board pack','A traceable executive narrative, ready for human review.']
};

const metrics=[
  ['Run / Grow / Transform','62 / 23 / 15','%','Watch','amber','Target 55 / 25 / 20','96','IT Finance','Finance export · FIN-2026-10-01','Run expenditure remains above the strategic allocation target. Review the application estate and prioritise retirement candidates.','60 / 24 / 16'],
  ['Budget vs actual','$24.8m','+4.2%','At risk','red','Budget $23.8m','98','IT Finance','General ledger · GL-1026','Actual spend is $1.0m above the reporting-period budget. Cloud consumption and vendor indexation are the illustrative drivers. Indicative year-end forecast: $30.1m against $28.8m approved.','$23.5m'],
  ['Savings realised','$1.24m','+18%','On track','green','Annual target $1.8m','94','FinOps','Savings register · SV-041','Booked savings total $1.24m. Identified opportunities are tracked separately and are not counted as realised savings.','$1.05m'],
  ['Benefits realised','76%','−4 pp','Watch','amber','Target 85%','86','Transformation','Benefits register · BR-017','Two initiatives have delayed benefit measurement. Evidence is estimated pending Finance validation.','80%'],
  ['Strategic roadmap','82%','−6 pp','At risk','red','Target 90% on time','93','PMO','Portfolio snapshot · PPM-103','The ERP migration and data platform milestones are late. Resolve the shared architecture dependency before committing to revised dates.','88%'],
  ['Business impact','148','−24%','Improving','green','Weighted minutes · target <120','92','Operations','Incident ledger · INC-228','Criticality and affected-user weighted impact has improved, but remains above target. The payment platform is the largest contributor.','195'],
  ['Change failure / recovery','8.2%','42 min','Watch','amber','Targets <5% / <30 min','97','Engineering','Deployment log · CD-309','Change failure rate is 8.2%; median failed-deployment recovery time is 42 minutes. Prioritise deployment safeguards on the payment service.','9.1%'],
  ['Critical exposure','11 days','+3 days','At risk','red','Target <7 days','91','Security','Vulnerability snapshot · VUL-084','Three internet-facing assets have critical exposure beyond the seven-day target. Security owns validation and remediation.','8 days'],
  ['Business satisfaction','4.2 / 5','+0.2','On track','green','Target ≥4.2 · 186 responses','88','Service Management','Business survey · CSAT-010','Business satisfaction improved among 186 illustrative respondents. Results represent the participating business units only.','4.0 / 5'],
  ['AI value in production','$420k','+31%','On track','green','Measured annualised benefit','83','Data & AI','AI benefits register · AI-012','Three production use cases show $420k in measured annualised benefits against documented baselines. Two further cases remain estimates and are excluded.','$320k'],
  ['Critical skills coverage','78%','+3 pp','Watch','amber','Target ≥85%','89','Technology People','Aggregate skills plan · SK-009','Coverage is based on aggregate team capability against the roadmap. Cloud security and data engineering have the largest gaps.','75%'],
  ['Overdue audit items','6','−2 items','Watch','amber','Target 0 overdue','95','Risk & Compliance','Audit register · AUD-026','Six overdue items remain, including two access-control findings requiring executive escalation.','8']
];

let actions=[
  ['Review idle cloud capacity','FinOps lead','16 Oct 2026','$186k annual opportunity','Open'],
  ['Approve ERP recovery plan','PMO director','14 Oct 2026','Protect Q4 milestone','Open'],
  ['Close critical asset exposure','CISO','12 Oct 2026','3 exposed assets','In progress'],
  ['Start observability renewal review','Vendor manager','19 Oct 2026','$84k annual opportunity','Open'],
  ['Validate AI benefit baselines','Head of Data & AI','22 Oct 2026','$420k evidence review','Open']
];

let customEdges=[];
try{
  const a=JSON.parse(localStorage.getItem('cockpit-actions'));
  if(Array.isArray(a)&&a.length===5&&a.every(x=>Array.isArray(x)&&x.length===5))actions=a;
  const ce=JSON.parse(localStorage.getItem('cockpit-custom-edges'));
  if(Array.isArray(ce))customEdges=ce;
}catch{}

const pill=(t,c='')=>`<span class="pill ${c}">${t}</span>`;
function toast(t){
  const el=$('#toast');
  if(!el) return;
  el.textContent=t;
  el.style.display='block';
  setTimeout(()=>el.style.display='none',3200);
}

function metric(m,i){
  let val=month==='September'?m[10]:m[1];
  return `<button class="metric" data-metric="${i}" aria-label="View evidence for ${m[0]}">
    <div class="metric-top"><span class="metric-title">${m[0]}</span>${pill(m[3],m[4])}</div>
    <div class="metric-value"><strong>${val}</strong><span class="${m[4]==='red'?'bad':'good'}">${month==='October'?m[2]:'Prior period'}</span></div>
    <div class="metric-foot"><span>${m[5]}</span><span>Confidence ${m[6]}%</span></div>
  </button>`;
}

function overview(){
  let order=role==='CIO'?[0,1,2,3,4,5,6,7,8,9,10,11]:[4,6,5,7,10,11,0,1,2,3,8,9];
  return `
    <section class="briefing">
      <div>
        <div class="eyebrow">${month.toUpperCase()} EXECUTIVE BRIEFING · DEMO</div>
        <h2>${role==='CIO'?'Cost pressure needs action. Delivery needs focus.':'Stability is improving. Delivery dependencies remain.'}</h2>
        <p>${month==='October'?'Spend is 4.2% above budget; the strategic roadmap is at 82% on time. Three cost levers offer $384k in annual savings opportunities, subject to validation. Cross-silo graph view now available to trace incidents back to contracts and ERP budgets.':'Review the prior-period scorecard below. The October decision log remains available for comparison.'}</p>
      </div>
      <div class="summary">
        <strong>${month==='October'?'$384k':'$298k'}</strong>
        <span>Illustrative annual savings opportunity</span>
        <small>3 levers · Connected in Enterprise Graph</small>
      </div>
    </section>
    <div class="section-head">
      <h2>Enterprise performance</h2>
      <span>12 executive KPIs · Select any metric for evidence</span>
    </div>
    <section class="metrics">${order.map(i=>metric(metrics[i],i)).join('')}</section>
    <div class="grid-two">
      <section class="panel">
        <div class="panel-head">
          <div><h2>Is spend following strategy?</h2><p class="muted">Run / Grow / Transform · ${month} allocation</p></div>
          ${pill('Run-heavy','amber')}
        </div>
        ${[['Run',month==='October'?62:60,''],['Grow',month==='October'?23:24,'teal'],['Transform',month==='October'?15:16,'pale']].map(([l,n,c])=>`
          <div class="bar-row"><span>${l}</span><div class="bar"><i class="${c}" style="width:${n}%"></i></div><b>${n}%</b></div>
        `).join('')}
        <div class="note">Move allocation toward the 55 / 25 / 20 target through application rationalisation and reinvestment in the strategic roadmap.</div>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>Decisions for this week</h2>
          <span class="muted">Top 3</span>
        </div>
        ${actions.slice(0,3).map((a,i)=>`
          <div class="decision">
            <span class="number">0${i+1}</span>
            <div><b>${a[0]}</b><p>${a[1]} · Due ${a[2]}</p><button data-action="${i}">Review decision</button></div>
            ${pill(a[4],i===2?'red':'amber')}
          </div>
        `).join('')}
      </section>
    </div>
  `;
}

/* ==========================================================================
   Enterprise Graph & Graph Builder Engine
   ========================================================================== */
function getAllEdges(){
  const baseEdges = window.EnterpriseData ? window.EnterpriseData.defaultEdges : [];
  return [...baseEdges, ...customEdges];
}

function getAllNodes(){
  if(!window.EnterpriseData) return [];
  return window.EnterpriseData.getUnifiedGraphNodes();
}

function getBlastRadius(targetId){
  const edges = getAllEdges();
  const upstream = new Set();
  const downstream = new Set();
  const relatedEdges = new Set();

  // Find direct and 2nd degree upstream (things that target targetId)
  edges.forEach(e => {
    if(e.target === targetId) {
      upstream.add(e.source);
      relatedEdges.add(`${e.source}->${e.target}`);
      // 2nd degree
      edges.forEach(e2 => {
        if(e2.target === e.source) {
          upstream.add(e2.source);
          relatedEdges.add(`${e2.source}->${e2.target}`);
        }
      });
    }
  });

  // Find direct and 2nd degree downstream (things that source from targetId)
  edges.forEach(e => {
    if(e.source === targetId) {
      downstream.add(e.target);
      relatedEdges.add(`${e.source}->${e.target}`);
      // 2nd degree
      edges.forEach(e2 => {
        if(e2.source === e.target) {
          downstream.add(e2.target);
          relatedEdges.add(`${e2.source}->${e2.target}`);
        }
      });
    }
  });

  return { upstream, downstream, relatedEdges };
}

function graphView(){
  const allNodes = getAllNodes();
  const allEdges = getAllEdges();
  const selectedNode = allNodes.find(n => n.id === selectedNodeId) || allNodes[0];
  const { upstream, downstream, relatedEdges } = getBlastRadius(selectedNode.id);

  // Filter nodes for display
  const filteredNodes = allNodes.filter(n => {
    const matchesSource = selectedSourceFilter === 'all' || n.source === selectedSourceFilter;
    const matchesSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase()) || n.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSource && matchesSearch;
  });

  const nodeMap = new Map(allNodes.map(n => [n.id, n]));

  // SVG dimensions
  const svgWidth = 1380;
  const svgHeight = 980;

  // Build SVG Edge lines
  const edgeMarkup = allEdges.map((e, idx) => {
    const srcNode = nodeMap.get(e.source);
    const tgtNode = nodeMap.get(e.target);
    if(!srcNode || !tgtNode) return '';

    const edgeKey = `${e.source}->${e.target}`;
    const isConnectedToSelected = (e.source === selectedNode.id || e.target === selectedNode.id || relatedEdges.has(edgeKey));
    const isCustom = customEdges.some(ce => ce.source === e.source && ce.target === e.target);

    let edgeClass = 'edge-line';
    if(isCustom) edgeClass += ' custom';
    if(focusBlastRadius) {
      if(isConnectedToSelected) edgeClass += ' highlighted';
      else edgeClass += ' dimmed';
    }

    // Bezier control points for graceful curved connectors
    const x1 = srcNode.x + 100;
    const y1 = srcNode.y + 40;
    const x2 = tgtNode.x - 10;
    const y2 = tgtNode.y + 40;
    const dx = Math.abs(x2 - x1) * 0.5;
    const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return `
      <g class="edge-group" data-edge="${idx}">
        <path d="${pathD}" class="${edgeClass}" marker-end="url(#arrow-${isConnectedToSelected ? 'active' : 'default'})" />
        <rect x="${midX - 35}" y="${midY - 9}" width="70" height="18" class="edge-text-bg" />
        <text x="${midX}" y="${midY}" class="edge-text">${e.label || e.relationship}</text>
      </g>
    `;
  }).join('');

  // Build SVG Nodes
  const nodeMarkup = allNodes.map(n => {
    const isSelected = n.id === selectedNode.id;
    const isUpstream = upstream.has(n.id);
    const isDownstream = downstream.has(n.id);
    const isRelated = isSelected || isUpstream || isDownstream;

    let nodeClass = 'node-group';
    if(focusBlastRadius) {
      if(isSelected || isRelated) nodeClass += ' highlighted';
      else nodeClass += ' dimmed';
    }

    const boxStroke = isSelected ? 'var(--teal)' : (isRelated ? '#087d83' : '#cbd5e1');
    const boxBg = isSelected ? '#ffffff' : '#ffffff';

    return `
      <g class="${nodeClass}" transform="translate(${n.x}, ${n.y})" data-node-id="${n.id}">
        <!-- Node Container Box -->
        <rect class="node-box" width="200" height="84" rx="6" fill="${boxBg}" stroke="${boxStroke}" stroke-width="${isSelected ? 3 : 1.5}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"></rect>
        
        <!-- Header color strip -->
        <rect width="200" height="6" rx="3" fill="${n.sourceColor}"></rect>
        
        <!-- System Icon & Type -->
        <text x="12" y="24" font-size="12" font-weight="700" fill="${n.sourceColor}">${n.sourceIcon} ${n.type.toUpperCase()}</text>
        
        <!-- Entity ID & Metric badge -->
        <rect x="120" y="14" width="70" height="16" rx="3" fill="#f1f5f9"></rect>
        <text x="155" y="25" font-size="10" font-weight="700" fill="#475569" text-anchor="middle">${n.metricBadge || n.id}</text>
        
        <!-- Entity Title -->
        <text x="12" y="47" font-size="13" font-weight="700" fill="var(--ink)">
          ${n.label.length > 22 ? n.label.slice(0, 20) + '...' : n.label}
        </text>
        
        <!-- Subtitle/ID -->
        <text x="12" y="68" font-size="11" fill="var(--muted)">${n.id} · ${n.status || 'Active'}</text>
        
        <!-- Status dot -->
        <circle cx="186" cy="65" r="4.5" fill="${n.status === 'Degraded' || n.status === 'At Risk' || (n.severity && n.severity.includes('P1')) ? '#b13f49' : (n.status === 'Warning' || n.status === 'Watch' ? '#d97706' : '#26745c')}"></circle>
      </g>
    `;
  }).join('');

  // Generate plain-English executive narrative for the blast radius
  let blastNarrative = '';
  if(selectedNode.source === 'servicenow') {
    blastNarrative = `Operational element <b>${selectedNode.label} (${selectedNode.id})</b> is linked to downstream cloud resources, active vendor contracts, and capitalized by ERP cost centers. Any disruption directly impacts corporate SLA compliance.`;
  } else if(selectedNode.source === 'erp') {
    blastNarrative = `Financial cost center <b>${selectedNode.label} (${selectedNode.id})</b> funds strategic delivery initiatives in Jira and provisions cloud infrastructure. Variance directly impacts budget ceilings.`;
  } else if(selectedNode.source === 'cloud') {
    blastNarrative = `Cloud workload <b>${selectedNode.label} (${selectedNode.id})</b> powers mission-critical ServiceNow business services. FinOps waste and sizing anomalies directly influence contract commitments.`;
  } else if(selectedNode.source === 'contracts') {
    blastNarrative = `Vendor agreement <b>${selectedNode.label} (${selectedNode.id})</b> governs platform tooling and cloud services with upcoming notice windows and negotiated savings opportunities.`;
  } else {
    blastNarrative = `Initiative <b>${selectedNode.label}</b> is funded by ERP cost centers and deploys code into production ServiceNow services and cloud clusters.`;
  }

  // Pre-built recommended connection suggestions
  const recommendations = [
    { source: 'CLOUD-AZURE-02', target: 'SN-CI-502', relationship: 'hosts', label: 'Hosts Customer Web Portal' },
    { source: 'FIN-02', target: 'CT-002', relationship: 'reclaims', label: 'SaaS License Reclamation' },
    { source: 'JIRA-EPIC-310', target: 'SN-CI-502', relationship: 'secures', label: 'Hardens SSO Authentication' }
  ].filter(r => !allEdges.some(e => e.source === r.source && e.target === r.target));

  return `
    <div class="graph-container">
      <!-- Toolbar -->
      <div class="graph-toolbar">
        <div class="filter-pills">
          <span style="font-size:12px; font-weight:700; color:var(--muted); text-transform:uppercase;">Source Feeds:</span>
          ${[
            ['all', 'All Sources (20)', '#10283f'],
            ['servicenow', 'ServiceNow (7)', '#10b981'],
            ['erp', 'SAP ERP (5)', '#2563eb'],
            ['cloud', 'AWS / Cloud (5)', '#f59e0b'],
            ['jira', 'Jira PMO (3)', '#8b5cf6'],
            ['contracts', 'Contracts (3)', '#e11d48']
          ].map(([k, label, color]) => `
            <button class="filter-pill ${selectedSourceFilter === k ? 'active' : ''}" data-filter="${k}">
              <span class="dot" style="background:${color}"></span>${label}
            </button>
          `).join('')}
        </div>

        <div style="display:flex; gap:10px; align-items:center;">
          <input type="text" id="graph-search" placeholder="Search systems or metrics..." value="${searchQuery}" style="padding:7px 12px; font-size:13px; border:1px solid #d4dde5; border-radius:4px; width:220px;" />
          <button class="secondary" id="toggle-blast" style="font-size:13px; padding:7px 12px;">
            ${focusBlastRadius ? 'Showing Blast Radius' : 'Show All Links'}
          </button>
          <div class="switch">
            <button class="${graphMode === 'explorer' ? 'selected' : ''}" id="mode-explorer">Explorer</button>
            <button class="${graphMode === 'builder' ? 'selected' : ''}" id="mode-builder">+ Graph Builder</button>
          </div>
        </div>
      </div>

      <!-- Graph Connection Builder Panel (Visible when mode is Builder or requested) -->
      ${graphMode === 'builder' ? `
        <section class="builder-panel" style="margin-top:0; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div>
              <div class="eyebrow">GRAPH BUILDER · MAKE CONNECTIONS ACROSS DATA POINTS</div>
              <h2 style="font-size:18px; margin:4px 0 0;">Establish Cross-System Dependency & Governance Links</h2>
            </div>
            ${customEdges.length > 0 ? `<button class="secondary" id="clear-custom-edges" style="font-size:12px;">Reset Custom Links (${customEdges.length})</button>` : ''}
          </div>

          <form id="builder-form" class="builder-form">
            <div class="form-field">
              <label>Source Data Point (From)</label>
              <select id="edge-source" style="width:100%;">
                ${allNodes.map(n => `<option value="${n.id}" ${n.id === selectedNode.id ? 'selected' : ''}>${n.sourceIcon} [${n.sourceName.split(' ')[0]}] ${n.label} (${n.id})</option>`).join('')}
              </select>
            </div>

            <div class="form-field">
              <label>Relationship Type</label>
              <select id="edge-rel" style="width:100%;">
                <option value="funds">funds (Capital / Budget)</option>
                <option value="delivers">delivers (Software / Milestone)</option>
                <option value="hosted_on">hosted_on (Cloud Infrastructure)</option>
                <option value="impacts">impacts (Incident Outage)</option>
                <option value="monitored_by">monitored_by (Observability / APM)</option>
                <option value="billed_to">billed_to (Purchase Order / Contract)</option>
                <option value="generates_waste">generates_waste (FinOps Alert)</option>
                <option value="depends_on">depends_on (Architecture API)</option>
                <option value="governs">governs (Security / Compliance)</option>
              </select>
            </div>

            <div class="form-field">
              <label>Target Data Point (To)</label>
              <select id="edge-target" style="width:100%;">
                ${allNodes.map((n, i) => `<option value="${n.id}" ${i === 2 ? 'selected' : ''}>${n.sourceIcon} [${n.sourceName.split(' ')[0]}] ${n.label} (${n.id})</option>`).join('')}
              </select>
            </div>

            <button type="submit" class="primary" style="height:42px; white-space:nowrap;">Create Link ➜</button>
          </form>

          <!-- Auto-Discovered Smart Link Suggestions -->
          ${recommendations.length > 0 ? `
            <div class="recommendations-box">
              <b style="font-size:13px; color:#b45309;">AI / System Smart Suggestions:</b>
              <span style="font-size:12px; color:var(--muted); margin-left:6px;">Detected high-confidence unlinked dependencies matching configuration tags:</span>
              <div style="margin-top:8px;">
                ${recommendations.map(r => `
                  <div class="rec-pill">
                    <span><b>${r.source}</b> ➔ <i>${r.relationship}</i> ➔ <b>${r.target}</b> (${r.label})</span>
                    <button class="rec-btn" data-add-rec='${JSON.stringify(r)}'>+ Accept Link</button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </section>
      ` : ''}

      <!-- Main Graph Workspace Grid -->
      <div class="graph-main-layout">
        <!-- SVG Canvas Card -->
        <div class="graph-canvas-card">
          <div class="canvas-header">
            <span>Enterprise Knowledge Graph · Cross-system Golden Thread Lineage</span>
            <span>Zoom: <b>${Math.round(graphZoom * 100)}%</b> · Pan & Click any Node to Trace</span>
          </div>

          <div class="canvas-viewport" id="viewport">
            <!-- Architectural Columns Headers -->
            <div class="legend-lanes">
              <span class="lane-tag" style="border-left:3px solid #2563eb">1. ERP Financials</span>
              <span class="lane-tag" style="border-left:3px solid #8b5cf6">2. Jira Delivery</span>
              <span class="lane-tag" style="border-left:3px solid #10b981">3. ServiceNow ITSM</span>
              <span class="lane-tag" style="border-left:3px solid #f59e0b">4. Cloud & FinOps</span>
              <span class="lane-tag" style="border-left:3px solid #e11d48">5. Contracts</span>
            </div>

            <!-- Interactive SVG Visualizer -->
            <svg class="graph-svg" style="transform: scale(${graphZoom}); transform-origin: top left;" viewBox="0 0 ${svgWidth} ${svgHeight}">
              <defs>
                <marker id="arrow-default" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#087d83" />
                </marker>
              </defs>

              <!-- Edges -->
              <g class="edges-layer">${edgeMarkup}</g>

              <!-- Nodes -->
              <g class="nodes-layer">${nodeMarkup}</g>
            </svg>

            <!-- Zoom Floating Controls -->
            <div class="zoom-controls">
              <button class="zoom-btn" id="zoom-in" title="Zoom In">+</button>
              <button class="zoom-btn" id="zoom-out" title="Zoom Out">−</button>
              <button class="zoom-btn" id="zoom-reset" title="Reset View" style="font-size:11px;">1:1</button>
            </div>
          </div>
        </div>

        <!-- Right Side Inspector Panel -->
        <div class="graph-inspector">
          <div class="inspector-header">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="badge-tag badge-${selectedNode.source}">${selectedNode.sourceIcon} ${selectedNode.sourceName.split(' ')[0]}</span>
              ${pill(selectedNode.status || 'Active', selectedNode.status === 'Degraded' || selectedNode.status === 'At Risk' ? 'red' : 'green')}
            </div>
            <h2 style="font-size:18px; margin:4px 0 2px;">${selectedNode.label}</h2>
            <div style="font-size:12px; color:var(--muted);">${selectedNode.id} · ${selectedNode.type}</div>
          </div>

          <!-- Executive Blast Radius Summary -->
          <div>
            <div class="eyebrow" style="margin-bottom:6px;">CROSS-SILO IMPACT SUMMARY</div>
            <div class="blast-radius-box">${blastNarrative}</div>
          </div>

          <!-- Key System Attributes -->
          <div>
            <div class="eyebrow" style="margin-bottom:8px;">SYSTEM METRICS & GOVERNANCE</div>
            <div style="font-size:12px; line-height:1.7; background:#f8fafc; padding:12px; border-radius:4px; border:1px solid #e2e8f0;">
              ${Object.entries(selectedNode.data).filter(([k]) => !['id', 'name', 'type', 'description'].includes(k)).slice(0, 5).map(([k, v]) => `
                <div style="display:flex; justify-content:space-between; border-bottom:1px solid #edf2f7; padding:3px 0;">
                  <span style="color:var(--muted); text-transform:capitalize;">${k.replace(/([A-Z])/g, ' $1')}:</span>
                  <b>${typeof v === 'number' && v > 1000 ? '$' + v.toLocaleString() : v}</b>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Upstream Trace -->
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">UPSTREAM CAPITAL & DEPENDENCIES (${upstream.size})</div>
            <div class="conn-list">
              ${upstream.size === 0 ? '<div style="font-size:12px; color:var(--muted); padding:6px 0;">No upstream links defined.</div>' : ''}
              ${Array.from(upstream).map(uid => {
                const un = nodeMap.get(uid);
                return un ? `
                  <div class="conn-item">
                    <span>${un.sourceIcon} <b>${un.label}</b><br><small style="color:var(--muted);">${un.id} · ${un.type}</small></span>
                    <button data-select-node="${un.id}">Focus ↗</button>
                  </div>
                ` : '';
              }).join('')}
            </div>
          </div>

          <!-- Downstream Impact -->
          <div>
            <div class="eyebrow" style="margin-bottom:4px;">DOWNSTREAM DELIVERABLES & IMPACT (${downstream.size})</div>
            <div class="conn-list">
              ${downstream.size === 0 ? '<div style="font-size:12px; color:var(--muted); padding:6px 0;">No downstream dependants.</div>' : ''}
              ${Array.from(downstream).map(did => {
                const dn = nodeMap.get(did);
                return dn ? `
                  <div class="conn-item">
                    <span>${dn.sourceIcon} <b>${dn.label}</b><br><small style="color:var(--muted);">${dn.id} · ${dn.type}</small></span>
                    <button data-select-node="${dn.id}">Focus ↗</button>
                  </div>
                ` : '';
              }).join('')}
            </div>
          </div>

          <!-- Actions -->
          <div style="margin-top:auto; padding-top:14px; border-top:1px solid var(--line); display:flex; gap:10px;">
            <button class="primary" style="flex:1;" id="open-builder-for-node">+ Connect Node</button>
            <button class="secondary" data-source-detail="${selectedNode.id}">View Raw Data</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   Multi-Source Catalog View
   ========================================================================== */
function catalogView(){
  if(!window.EnterpriseData) return `<div class="panel">Loading data sources...</div>`;
  const { servicenow, erp, cloud, jira, contracts } = window.EnterpriseData.sources;

  return `
    <div class="catalog-section">
      <div class="panel">
        <div class="panel-head">
          <div>
            <div class="eyebrow">INTEGRATED ENTERPRISE SYSTEMS</div>
            <h2>Active Data Ingestion Connectors (Simulated Feeds)</h2>
            <p class="muted">Live mock data feeds ingested from 5 enterprise core platforms with automatic entity resolution.</p>
          </div>
          <button class="primary" id="jump-to-graph">Explore in Graph Builder ☊</button>
        </div>

        <div class="three">
          <div class="stat"><small>ServiceNow CMDB & ITSM</small><strong>${servicenow.records.length} Records</strong><p>4 Services · 2 Incidents · 1 Change</p></div>
          <div class="stat"><small>SAP / Oracle Financials</small><strong>${erp.records.length} Records</strong><p>3 Cost Centers · 2 Purchase Orders</p></div>
          <div class="stat"><small>AWS / Azure Cloud & FinOps</small><strong>${cloud.records.length} Records</strong><p>3 Workloads · 2 Waste Levers</p></div>
        </div>
      </div>

      <!-- ServiceNow Table -->
      <section class="panel">
        <div class="panel-head">
          <h2>⚡ ServiceNow: Configuration Items (CMDB) & Incidents</h2>
          ${pill('ITSM Live Feed', 'green')}
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Record ID</th><th>Name</th><th>Type</th><th>Tier / Severity</th><th>Owner</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${servicenow.records.map(r => `
                <tr>
                  <td><b>${r.id}</b></td>
                  <td>${r.name}<small>${r.description || ''}</small></td>
                  <td>${r.type}</td>
                  <td>${r.tier || r.severity || 'N/A'}</td>
                  <td>${r.owner || 'Unassigned'}</td>
                  <td>${pill(r.status || 'Active', r.status === 'Degraded' || (r.severity && r.severity.includes('P1')) ? 'red' : 'green')}</td>
                  <td><button class="table-btn" data-locate-graph="${r.id}">View in Graph ↗</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- ERP Financials Table -->
      <section class="panel">
        <div class="panel-head">
          <h2>🏛️ SAP / Oracle ERP: Cost Centers & Purchase Orders</h2>
          ${pill('GL Sync Active', 'teal')}
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Record ID</th><th>Name</th><th>Type</th><th>Annual Budget / PO</th><th>Actual YTD</th><th>Variance</th><th>Action</th></tr></thead>
            <tbody>
              ${erp.records.map(r => `
                <tr>
                  <td><b>${r.id}</b></td>
                  <td>${r.name}<small>${r.description || ''}</small></td>
                  <td>${r.type}</td>
                  <td>${r.budgetAnnual ? '$' + (r.budgetAnnual/1000000).toFixed(1) + 'M' : (r.amount ? '$' + (r.amount/1000).toFixed(0) + 'k' : '—')}</td>
                  <td>${r.actualYtd ? '$' + (r.actualYtd/1000000).toFixed(1) + 'M' : 'Committed'}</td>
                  <td>${r.variancePct ? `<span class="${r.variance > 0 ? 'bad' : 'good'}">${r.variancePct}</span>` : 'On Track'}</td>
                  <td><button class="table-btn" data-locate-graph="${r.id}">View in Graph ↗</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Cloud & FinOps Table -->
      <section class="panel">
        <div class="panel-head">
          <h2>☁️ Cloud Infrastructure & FinOps Waste Levers</h2>
          ${pill('AWS / Azure / GCP', 'amber')}
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Asset ID</th><th>Workload / Anomaly</th><th>Provider & Region</th><th>Monthly Cost</th><th>Waste Opportunity</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${cloud.records.map(r => `
                <tr>
                  <td><b>${r.id}</b></td>
                  <td>${r.name}<small>${r.description || ''}</small></td>
                  <td>${r.provider} · ${r.region || 'Global'}</td>
                  <td>${r.monthlyCost ? '$' + r.monthlyCost.toLocaleString() + '/mo' : '—'}</td>
                  <td>${r.wasteOpportunity ? '<b style="color:var(--red);">$' + r.wasteOpportunity.toLocaleString() + '/yr</b>' : 'Optimal'}</td>
                  <td>${pill(r.status || 'Active', r.wasteOpportunity ? 'amber' : 'green')}</td>
                  <td><button class="table-btn" data-locate-graph="${r.id}">View in Graph ↗</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Jira PMO Table -->
      <section class="panel">
        <div class="panel-head">
          <h2>🎯 Jira & PMO Strategic Delivery Roadmap</h2>
          ${pill('Sprint Cadence', 'pale')}
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Epic ID</th><th>Strategic Initiative</th><th>Lead</th><th>Progress</th><th>Target Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${jira.records.map(r => `
                <tr>
                  <td><b>${r.id}</b></td>
                  <td>${r.name}<small>${r.description || ''}</small></td>
                  <td>${r.lead}</td>
                  <td><b>${r.progressPct}%</b></td>
                  <td>${r.targetDate}</td>
                  <td>${pill(r.status, r.status === 'At Risk' ? 'red' : 'green')}</td>
                  <td><button class="table-btn" data-locate-graph="${r.id}">View in Graph ↗</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function spend(){
  return `
    <div class="three">
      <div class="stat"><small>Cloud waste opportunity</small><strong>$186k</strong><p>Annualised · 24 idle resources</p></div>
      <div class="stat"><small>Unused SaaS seats</small><strong>$114k</strong><p>Annualised · 190 inactive seats</p></div>
      <div class="stat"><small>Renewal optimisation</small><strong>$84k</strong><p>Annualised · 1 priority contract</p></div>
    </div>
    <div class="note">Identified opportunities are estimates, not booked savings. Validate utilisation, service dependencies and contract terms before action.</div>
    <section class="panel">
      <div class="panel-head">
        <h2>Savings opportunity register</h2>
        ${pill('Illustrative evidence')}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Lever</th><th>Evidence</th><th>Annual value</th><th>Confidence</th><th>Next step</th></tr></thead>
          <tbody>
            <tr><td>Idle compute<small>Cloud infrastructure</small></td><td>24 instances below 5% utilisation for 14 days</td><td>$186k</td><td>94%</td><td><button class="table-btn" data-action="0">Review action</button></td></tr>
            <tr><td>SaaS reclamation<small>Collaboration tools</small></td><td>190 paid seats inactive for 30 days</td><td>$114k</td><td>90%</td><td><button class="table-btn" data-source="SaaS usage · SSO-044">View evidence</button></td></tr>
            <tr><td>Observability renewal<small>Vendor optimisation</small></td><td>Right-size contracted ingestion capacity</td><td>$84k</td><td>87%</td><td><button class="table-btn" data-action="3">Review action</button></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renewals(){
  return `
    <div class="three">
      <div class="stat"><small>Contracts in the next 90 days</small><strong>3</strong><p>Demonstration renewal pipeline</p></div>
      <div class="stat"><small>Annual contract value</small><strong>$1.18m</strong><p>Across 3 upcoming renewals</p></div>
      <div class="stat"><small>Priority savings opportunity</small><strong>$84k</strong><p>Observability · validation pending</p></div>
    </div>
    <section class="panel" style="margin-top:24px">
      <div class="panel-head">
        <h2>Upcoming renewal decisions</h2>
        ${pill('1 notice deadline in October','amber')}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Contract</th><th>Renewal</th><th>Notice deadline</th><th>Annual spend</th><th>Decision</th></tr></thead>
          <tbody>
            ${[['Observability platform','15 Dec 2026','19 Oct 2026','$420k','Right-size capacity'],['Enterprise collaboration','31 Dec 2026','31 Oct 2026','$310k','Review seat utilisation'],['Cloud support agreement','5 Jan 2027','5 Nov 2026','$450k','Benchmark service tiers']].map((a,i)=>`
              <tr><td>${a[0]}<small>Illustrative contract CT-00${i+1}</small></td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td><button class="table-btn" data-source="Contract CT-00${i+1} · simulated extract">${a[4]}</button></td></tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <p class="muted">Dates and notice terms are simulated. A production version requires review of the signed contract.</p>
    </section>
  `;
}

function actionView(){
  return `
    <div class="note">Track the five executive priorities. Status changes are saved in this browser for the demo.</div>
    <section class="panel">
      <div class="panel-head">
        <h2>Executive action tracker</h2>
        <button class="secondary" id="reset-actions">Reset demo</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Action</th><th>Owner</th><th>Due</th><th>Outcome</th><th>Status</th></tr></thead>
          <tbody>
            ${actions.map((a,i)=>`
              <tr><td><button class="table-btn" data-action="${i}">${a[0]}</button></td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td><select data-status="${i}" aria-label="Status for ${a[0]}">${['Open','In progress','Complete'].map(s=>`<option ${a[4]===s?'selected':''}>${s}</option>`).join('')}</select></td></tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function scenario(){
  return `
    <div class="grid-two">
      <section class="panel scenario">
        <h2>Cost reduction scenario</h2>
        <p class="muted">Adjust the share of identified annual opportunities captured.</p>
        <label for="cloud">Cloud savings captured <output id="cloud-val">50%</output></label>
        <input id="cloud" type="range" min="0" max="100" value="50">
        <label for="saas">SaaS savings captured <output id="saas-val">50%</output></label>
        <input id="saas" type="range" min="0" max="100" value="50">
        <label for="renewal">Renewal savings captured <output id="renewal-val">50%</output></label>
        <input id="renewal" type="range" min="0" max="100" value="50">
        <div class="note">Assumes opportunities are independent and realised for a full year. Excludes implementation costs, timing and tax.</div>
      </section>
      <section class="panel">
        <div class="eyebrow">INDICATIVE · NOT AN APPROVED FORECAST</div>
        <h2 style="margin-top:18px">Potential annual savings</h2>
        <div class="stat" style="border:0;padding:20px 0">
          <strong id="scenario-result">$192,000</strong>
          <p>From $384,000 of identified opportunities</p>
        </div>
        <h3 style="font-size:15px">Residual annual cost pressure</h3>
        <p id="scenario-gap" style="font:700 26px Manrope">$1,108,000</p>
        <p class="muted">Illustrative $1.3m year-end forecast gap less scenario savings. This is a directional comparison; Finance must align periods and validate assumptions.</p>
      </section>
    </div>
  `;
}

function pack(){
  return `
    <div class="section-head no-print">
      <span>Draft from sample data · Human approval required</span>
      <div><button class="secondary" id="download-pack">Download draft</button> <button class="primary" id="print-pack">Print / save PDF</button></div>
    </div>
    <article class="panel pack">
      <div class="eyebrow">EXCO TECHNOLOGY BRIEFING · SAMPLE DATA</div>
      <h2>CIO / CTO Cockpit</h2>
      <p class="muted">${month} 2026 · Draft for review · Subrata Roy</p>
      <div class="note">Demonstration pack. Every number and source reference below is illustrative. Multi-source knowledge graph models 5 enterprise platforms with full cross-silo traceability.</div>
      <h3>Executive assessment</h3>
      <p>${month==='October'?'Technology spend is $24.8m against a $23.8m reporting-period budget. Strategic roadmap delivery is 82% on time, below the 90% target. Savings realised total $1.24m against the $1.8m annual target.':'Prior-period spend was $23.5m; roadmap delivery was 88% on time, and realised savings totalled $1.05m.'}</p>
      <p class="muted">Sample references: GL-1026 · PPM-103 · SV-041. Reporting-period values are illustrative.</p>
      <h3>Decisions requested</h3>
      <ol>${actions.slice(0,3).map(a=>`<li><b>${a[0]}.</b> ${a[1]} to own follow-through by ${a[2]}. Intended outcome: ${a[3]}.</li>`).join('')}</ol>
      <h3>Cross-Silo Enterprise Graph & Architecture</h3>
      <p>Data models across ServiceNow (ITSM/CMDB), SAP ERP Financials, AWS/Azure FinOps, Jira PMO and Vendor Contracts have been unified into an interactive graph. Blast radius analysis confirms that Core Payment Gateway P1 incidents directly correlate with AWS Aurora cluster limits and Datadog renewal timing.</p>
      <h3>Value and financial discipline</h3>
      <p>The demonstration opportunity register contains $384k in potential annual savings: cloud capacity $186k, SaaS seats $114k and renewal optimisation $84k. These estimates are excluded from booked savings pending validation.</p>
      <h3>Trust and open issues</h3>
      <p>Illustrative confidence ranges from 83% to 98%. Benefits evidence and AI value measurement need additional review.</p>
      <p class="muted">Approval: Pending CIO and Finance review. Forecasts remain indicative.</p>
    </article>
  `;
}

function render(){
  const p=pages[view] || pages['overview'];
  $('#title').textContent=p[1];
  $('#crumb').textContent=p[1];
  $('#subtitle').textContent=p[2];
  $('#nav').innerHTML=Object.entries(pages).map(([k,v])=>`
    <button data-view="${k}" class="${view===k?'active':''}" ${view===k?'aria-current="page"':''}>
      <span class="icon">${v[0]}</span>${v[1]}
    </button>
  `).join('');

  const viewsMap = {
    overview,
    graph: graphView,
    catalog: catalogView,
    spend,
    renewals,
    actions: actionView,
    scenario,
    pack
  };

  $('#content').innerHTML=(viewsMap[view] || overview)();
}

function show(html){
  $('#detail-body').innerHTML=html;
  $('#detail').showModal();
}

/* Event Delegations */
document.addEventListener('click',e=>{
  let b=e.target.closest('button');

  // SVG node clicks
  const nodeEl = e.target.closest('[data-node-id]');
  if(nodeEl){
    selectedNodeId = nodeEl.dataset.nodeId;
    render();
    return;
  }

  if(!b)return;

  // View Navigation
  if(b.dataset.view){
    view=b.dataset.view;
    render();
  }

  // Jump to Graph from Catalog
  if(b.id === 'jump-to-graph'){
    view = 'graph';
    render();
  }

  // Locate specific node on graph
  if(b.dataset.locateGraph){
    selectedNodeId = b.dataset.locateGraph;
    view = 'graph';
    render();
    toast(`Focused on node ${selectedNodeId}`);
  }

  // Role perspective
  if(b.dataset.role){
    role=b.dataset.role;
    document.querySelectorAll('[data-role]').forEach(x=>x.classList.toggle('selected',x===b));
    render();
  }

  // Source filters in graph
  if(b.dataset.filter){
    selectedSourceFilter = b.dataset.filter;
    render();
  }

  // Graph modes
  if(b.id === 'mode-explorer'){
    graphMode = 'explorer';
    render();
  }
  if(b.id === 'mode-builder' || b.id === 'open-builder-for-node'){
    graphMode = 'builder';
    render();
  }

  // Toggle blast radius
  if(b.id === 'toggle-blast'){
    focusBlastRadius = !focusBlastRadius;
    render();
  }

  // Select node from inspector
  if(b.dataset.selectNode){
    selectedNodeId = b.dataset.selectNode;
    render();
    toast(`Inspecting ${selectedNodeId}`);
  }

  // Zoom controls
  if(b.id === 'zoom-in'){
    graphZoom = Math.min(graphZoom + 0.15, 1.8);
    render();
  }
  if(b.id === 'zoom-out'){
    graphZoom = Math.max(graphZoom - 0.15, 0.5);
    render();
  }
  if(b.id === 'zoom-reset'){
    graphZoom = 1.0;
    render();
  }

  // Reset custom edges
  if(b.id === 'clear-custom-edges'){
    customEdges = [];
    try{ localStorage.removeItem('cockpit-custom-edges'); }catch{}
    render();
    toast('Custom connections cleared');
  }

  // Add Recommended Link
  if(b.dataset.addRec){
    try {
      const rec = JSON.parse(b.dataset.addRec);
      customEdges.push(rec);
      localStorage.setItem('cockpit-custom-edges', JSON.stringify(customEdges));
      render();
      toast(`Added connection: ${rec.source} ➔ ${rec.target}`);
    } catch(err){}
  }

  // Raw source payload detail dialog
  if(b.dataset.sourceDetail){
    const allNodes = getAllNodes();
    const nd = allNodes.find(n => n.id === b.dataset.sourceDetail);
    if(nd){
      show(`
        <div class="eyebrow">${nd.sourceName.toUpperCase()} · RAW PAYLOAD</div>
        <h2>${nd.label} (${nd.id})</h2>
        <pre class="source" style="font-family:monospace; font-size:12px; overflow:auto; max-height:300px;">${JSON.stringify(nd.data, null, 2)}</pre>
        <p class="muted">Ingested through unified connector pipeline with schema normalization.</p>
      `);
    }
  }

  // Metric evidence
  if(b.dataset.metric!==undefined){
    const m=metrics[+b.dataset.metric];
    show(`
      <div class="eyebrow">KPI EVIDENCE · DEMONSTRATION</div>
      <h2>${m[0]}</h2>${pill(m[3],m[4])}
      <h3>${month==='October'?m[1]:m[10]} · ${m[5]}</h3>
      <p>${m[9]}</p>
      <h3>Source and accountability</h3>
      <div class="source">Simulated record: ${m[8]}<br>Owner: ${m[7]}<br>Illustrative confidence: ${m[6]}%<br>Evidence period: October 2026</div>
      <p class="muted">${month==='September'?'The headline shows September; this evidence note describes the October demo snapshot. ':''}Production confidence combines freshness, completeness and mapping coverage.</p>
    `);
  }

  // Action review
  if(b.dataset.action!==undefined){
    const a=actions[+b.dataset.action];
    show(`
      <div class="eyebrow">EXECUTIVE DECISION</div>
      <h2>${a[0]}</h2>
      <p>Owner: <b>${a[1]}</b><br>Due: <b>${a[2]}</b><br>Intended outcome: <b>${a[3]}</b><br>Status: <b>${a[4]}</b></p>
      <div class="note">Validate the supporting source records with the accountable owner. Record approval and track the outcome in the action log.</div>
      <p class="muted">Sample decision. No external action or notification is sent.</p>
    `);
  }

  if(b.dataset.source) {
    show(`
      <div class="eyebrow">SIMULATED SOURCE RECORD</div>
      <h2>Evidence preview</h2>
      <div class="source">${b.dataset.source}</div>
      <p>This demo illustrates how a decision links back to a governed source record across ERP, ServiceNow or Cloud.</p>
    `);
  }

  if(b.id==='close')$('#detail').close();
  if(b.id==='pack-top'){view='pack';render()}
  if(b.id==='print-pack')window.print();
  if(b.id==='download-pack'){
    const text=$('.pack').innerText;
    const u=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=u;
    a.download='CIO-CTO-Cockpit-Board-Pack-Draft.txt';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(u),1000);
    toast('Draft board pack downloaded');
  }
  if(b.id==='reset-actions'){
    actions.forEach(a=>a[4]='Open');
    try{localStorage.removeItem('cockpit-actions')}catch{}
    render();
    toast('Demo actions reset');
  }
});

// Form submit for Graph Builder
document.addEventListener('submit', e => {
  if(e.target.id === 'builder-form'){
    e.preventDefault();
    const source = $('#edge-source').value;
    const relationship = $('#edge-rel').value;
    const target = $('#edge-target').value;

    if(source === target){
      alert('Source and Target cannot be the same node.');
      return;
    }

    const newEdge = {
      source,
      target,
      relationship,
      label: relationship.replace('_', ' ')
    };

    customEdges.push(newEdge);
    try {
      localStorage.setItem('cockpit-custom-edges', JSON.stringify(customEdges));
    } catch(err){}

    selectedNodeId = source;
    render();
    toast(`Connected ${source} ➔ ${target} (${newEdge.label})`);
  }
});

// Change listeners
document.addEventListener('change',e=>{
  if(e.target.id==='period'){
    month=e.target.value;
    render();
  }
  if(e.target.dataset.status!==undefined){
    actions[+e.target.dataset.status][4]=e.target.value;
    try{
      localStorage.setItem('cockpit-actions',JSON.stringify(actions));
      toast('Action status saved in this browser');
    }catch{
      toast('Updated for this session; browser storage unavailable');
    }
  }
});

// Search input
document.addEventListener('input', e=>{
  if(e.target.id === 'graph-search'){
    searchQuery = e.target.value;
    render();
  }
  if(['cloud','saas','renewal'].includes(e.target.id)){
    let sum=0;
    ['cloud','saas','renewal'].forEach((id,i)=>{
      const v=+$('#'+id).value;
      $('#'+id+'-val').textContent=v+'%';
      sum+=v/100*[186000,114000,84000][i];
    });
    $('#scenario-result').textContent='$'+Math.round(sum).toLocaleString('en-US');
    $('#scenario-gap').textContent='$'+Math.round(1300000-sum).toLocaleString('en-US');
  }
});

// Initial render
render();
