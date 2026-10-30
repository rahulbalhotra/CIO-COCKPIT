/**
 * Multi-Source Enterprise Mock Data Repository
 * Systems: ServiceNow, SAP ERP, AWS/Azure Cloud & FinOps, Jira PMO, Procurement Contracts
 */
window.EnterpriseData = {
  sources: {
    servicenow: {
      name: 'ServiceNow (ITSM & CMDB)',
      icon: '⚡',
      color: '#10b981',
      records: [
        {
          id: 'SN-CI-501',
          type: 'Business Service',
          name: 'Core Payment Gateway',
          tier: 'Tier-1 Mission Critical',
          owner: 'Payment SRE Team',
          status: 'Degraded',
          healthScore: 74,
          sla: '99.95% (Current: 98.8%)',
          department: 'Digital Consumer Banking',
          lastAudit: '2026-10-12',
          description: 'Handles real-time card and wallet payment processing across web and mobile channels.'
        },
        {
          id: 'SN-CI-502',
          type: 'Business Service',
          name: 'Customer Web Portal',
          tier: 'Tier-2 High',
          owner: 'Digital Channels Engineering',
          status: 'Operational',
          healthScore: 98,
          sla: '99.90% (Current: 99.94%)',
          department: 'Retail Banking',
          lastAudit: '2026-09-28',
          description: 'Customer facing authenticated portal for account management and transactions.'
        },
        {
          id: 'SN-CI-503',
          type: 'Business Service',
          name: 'Enterprise ERP Hub',
          tier: 'Tier-1 Mission Critical',
          owner: 'Corporate Systems',
          status: 'Operational',
          healthScore: 95,
          sla: '99.90%',
          department: 'Finance & Operations',
          lastAudit: '2026-10-01',
          description: 'Middleware integration backbone syncing transactions with general ledger and treasury.'
        },
        {
          id: 'SN-CI-504',
          type: 'Business Service',
          name: 'Data Lakehouse Pipeline',
          tier: 'Tier-2 High',
          owner: 'Data & AI Platform Team',
          status: 'Warning',
          healthScore: 82,
          sla: '99.50%',
          department: 'Enterprise Analytics',
          lastAudit: '2026-10-15',
          description: 'Continuous batch and streaming ETL pipeline feeding executive reporting and ML models.'
        },
        {
          id: 'SN-INC-228',
          type: 'Incident',
          name: 'Payment Latency Spike > 3.2s',
          severity: 'P1 - Critical',
          owner: 'SRE On-Call',
          status: 'Active Investigation',
          mttr: '148 min weighted impact',
          duration: '2h 28m',
          impactedCi: 'SN-CI-501',
          description: 'High response latency on payment authorization endpoints caused by RDS connection pool exhaustion.'
        },
        {
          id: 'SN-INC-314',
          type: 'Incident',
          name: 'GL Batch Synchronization Timeout',
          severity: 'P2 - Major',
          owner: 'ERP Support',
          status: 'Resolved',
          mttr: '45 min',
          duration: '45m',
          impactedCi: 'SN-CI-503',
          description: 'Nightly batch sync failed on record reconciliation due to stale database lock.'
        },
        {
          id: 'SN-CHG-902',
          type: 'Change Request',
          name: 'RDS Index & Partitioning Migration',
          riskLevel: 'High Risk',
          status: 'Under Executive Review',
          owner: 'Database Ops',
          targetCi: 'SN-CI-501',
          plannedWindow: '2026-10-28 02:00 UTC',
          description: 'Requires 15m planned read-only degradation to re-index historical transaction tables.'
        }
      ]
    },

    erp: {
      name: 'SAP / Oracle ERP (Financials & GL)',
      icon: '🏛️',
      color: '#2563eb',
      records: [
        {
          id: 'ERP-CC-101',
          type: 'Cost Center',
          name: 'Digital Banking & Payments',
          costCenterCode: 'CC-4401',
          budgetAnnual: 4800000,
          actualYtd: 5100000,
          variance: 300000,
          variancePct: '+6.25%',
          status: 'At Risk',
          owner: 'Sarah Jenkins (VP Digital)',
          currency: 'USD',
          description: 'Operational and capital expenditure for consumer digital banking products.'
        },
        {
          id: 'ERP-CC-102',
          type: 'Cost Center',
          name: 'Core Cloud & Infrastructure',
          costCenterCode: 'CC-4402',
          budgetAnnual: 12500000,
          actualYtd: 12100000,
          variance: -400000,
          variancePct: '-3.20%',
          status: 'On Track',
          owner: 'Alex Rivera (VP Infrastructure)',
          currency: 'USD',
          description: 'Global cloud compute, data centers, networking, and telecom connectivity.'
        },
        {
          id: 'ERP-CC-103',
          type: 'Cost Center',
          name: 'Corporate Systems & ERP',
          costCenterCode: 'CC-4403',
          budgetAnnual: 6200000,
          actualYtd: 6300000,
          variance: 100000,
          variancePct: '+1.61%',
          status: 'Watch',
          owner: 'David Chen (VP Corporate IT)',
          currency: 'USD',
          description: 'Core ERP licenses, general ledger, HRIS integrations, and compliance tech.'
        },
        {
          id: 'ERP-PO-882',
          type: 'Purchase Order',
          name: 'Observability & APM Enterprise PO',
          poNumber: 'PO-88290-APM',
          vendor: 'Datadog / Dynatrace',
          amount: 420000,
          status: 'Approved & Committed',
          costCenter: 'ERP-CC-102',
          contractRef: 'CT-001',
          description: 'Annualized enterprise licensing for full-stack telemetry and distributed tracing.'
        },
        {
          id: 'ERP-PO-904',
          type: 'Purchase Order',
          name: 'Hyperscaler EDP Cloud Commitment',
          poNumber: 'PO-90412-EDP',
          vendor: 'Amazon Web Services',
          amount: 8400000,
          status: 'Active Drawdown',
          costCenter: 'ERP-CC-102',
          contractRef: 'CT-003',
          description: '3-Year Enterprise Discount Program commit against AWS infrastructure consumption.'
        }
      ]
    },

    cloud: {
      name: 'Cloud & FinOps (AWS / Azure / GCP)',
      icon: '☁️',
      color: '#f59e0b',
      records: [
        {
          id: 'CLOUD-AWS-01',
          type: 'Cloud Workload',
          name: 'AWS Aurora PostgreSQL Prod Cluster',
          provider: 'Amazon Web Services',
          region: 'us-east-1 (N. Virginia)',
          monthlyCost: 38500,
          utilizationAvg: '64%',
          status: 'Warning',
          env: 'Production',
          tiedCi: 'SN-CI-501',
          description: 'Primary multi-AZ transaction engine supporting Core Payment Gateway.'
        },
        {
          id: 'CLOUD-AZURE-02',
          type: 'Cloud Workload',
          name: 'Azure AKS Portal Cluster',
          provider: 'Microsoft Azure',
          region: 'eastus',
          monthlyCost: 24200,
          utilizationAvg: '48%',
          status: 'Healthy',
          env: 'Production',
          tiedCi: 'SN-CI-502',
          description: 'Scalable container cluster running customer web application microservices.'
        },
        {
          id: 'CLOUD-GCP-03',
          type: 'Cloud Workload',
          name: 'GCP BigQuery Lakehouse Storage',
          provider: 'Google Cloud Platform',
          region: 'us-central1',
          monthlyCost: 42000,
          utilizationAvg: '82%',
          status: 'Healthy',
          env: 'Production',
          tiedCi: 'SN-CI-504',
          description: 'Petabyte-scale analytics and machine learning feature store.'
        },
        {
          id: 'FIN-01',
          type: 'FinOps Opportunity',
          name: '24 Idle EC2 Instances (<5% CPU)',
          wasteOpportunity: 186000,
          confidence: '94%',
          provider: 'AWS',
          owner: 'FinOps Lead',
          status: 'Pending Action',
          description: 'Unattached test/staging instances running continuously without traffic for 14+ days.'
        },
        {
          id: 'FIN-02',
          type: 'FinOps Opportunity',
          name: 'Unused Collaboration SaaS Seats',
          wasteOpportunity: 114000,
          confidence: '90%',
          provider: 'SaaS / SSO',
          owner: 'Vendor Manager',
          status: 'Pending Review',
          description: '190 paid collaboration and developer license seats inactive for over 30 days.'
        }
      ]
    },

    jira: {
      name: 'Jira / PMO (Roadmap Delivery)',
      icon: '🎯',
      color: '#8b5cf6',
      records: [
        {
          id: 'JIRA-EPIC-104',
          type: 'Jira Epic',
          name: 'NextGen Payments Architecture (PCI 4.0)',
          lead: 'Marcus Vance',
          progressPct: 68,
          targetDate: '2026-11-30',
          status: 'At Risk',
          budgetLine: 'ERP-CC-101',
          deliverableCi: 'SN-CI-501',
          description: 'Refactoring transaction pipelines to satisfy PCI-DSS 4.0 compliance and cut latency by 40%.'
        },
        {
          id: 'JIRA-EPIC-208',
          type: 'Jira Epic',
          name: 'Cloud Data Platform Migration',
          lead: 'Priya Sharma',
          progressPct: 82,
          targetDate: '2026-12-15',
          status: 'On Track',
          budgetLine: 'ERP-CC-102',
          deliverableCi: 'CLOUD-GCP-03',
          description: 'Consolidation of legacy Hadoop clusters into serverless BigQuery data warehouse.'
        },
        {
          id: 'JIRA-EPIC-310',
          type: 'Jira Epic',
          name: 'Zero-Trust Identity & PAM Hardening',
          lead: 'Tyler Ross',
          progressPct: 94,
          targetDate: '2026-10-31',
          status: 'On Track',
          budgetLine: 'ERP-CC-103',
          deliverableCi: 'SN-CI-502',
          description: 'Phishing-resistant FIDO2 authentication roll-out across all internal enterprise services.'
        }
      ]
    },

    contracts: {
      name: 'Procurement & Vendor Contracts',
      icon: '📜',
      color: '#e11d48',
      records: [
        {
          id: 'CT-001',
          type: 'Contract',
          name: 'Enterprise Observability Platform MSA',
          vendor: 'Datadog / Dynatrace Inc.',
          acv: 420000,
          renewalDate: '2026-12-15',
          noticeDeadline: '2026-10-19',
          status: 'Urgent Decision',
          potentialSavings: 84000,
          owner: 'Vendor Management',
          description: 'Full telemetry suite. Contract requires 60-day notice prior to auto-renewal.'
        },
        {
          id: 'CT-002',
          type: 'Contract',
          name: 'Enterprise Productivity & Collaboration Suite',
          vendor: 'Collaboration SaaS Corp',
          acv: 310000,
          renewalDate: '2026-12-31',
          noticeDeadline: '2026-10-31',
          status: 'Under Review',
          potentialSavings: 114000,
          owner: 'Digital Workplace Lead',
          description: 'Enterprise agreement covering chat, video and productivity seats.'
        },
        {
          id: 'CT-003',
          type: 'Contract',
          name: 'Cloud Hyperscaler 3-Year Enterprise Agreement',
          vendor: 'Amazon Web Services',
          acv: 8400000,
          renewalDate: '2027-01-05',
          noticeDeadline: '2026-11-05',
          status: 'Active',
          potentialSavings: 186000,
          owner: 'FinOps & Procurement',
          description: 'Strategic cloud tier discounts linked to baseline consumption threshold.'
        }
      ]
    }
  },

  // Default topology connecting records across functional silos
  defaultEdges: [
    { source: 'ERP-CC-101', target: 'JIRA-EPIC-104', relationship: 'funds', label: 'Funds Initiative' },
    { source: 'JIRA-EPIC-104', target: 'SN-CI-501', relationship: 'delivers', label: 'Deploys Service' },
    { source: 'SN-CI-501', target: 'CLOUD-AWS-01', relationship: 'hosted_on', label: 'Runs On Infra' },
    { source: 'SN-INC-228', target: 'SN-CI-501', relationship: 'impacts', label: 'Disrupts Service' },
    { source: 'SN-CHG-902', target: 'SN-CI-501', relationship: 'deployed_to', label: 'Modifies DB' },
    { source: 'CLOUD-AWS-01', target: 'CT-001', relationship: 'monitored_by', label: 'Monitored By' },
    { source: 'CT-001', target: 'ERP-PO-882', relationship: 'billed_to', label: 'Commitment In PO' },
    { source: 'CLOUD-AWS-01', target: 'FIN-01', relationship: 'generates_waste', label: 'Identified Waste' },
    { source: 'ERP-CC-102', target: 'JIRA-EPIC-208', relationship: 'funds', label: 'Capitalizes' },
    { source: 'JIRA-EPIC-208', target: 'CLOUD-GCP-03', relationship: 'delivers', label: 'Modernizes' },
    { source: 'CLOUD-GCP-03', target: 'SN-CI-504', relationship: 'powers', label: 'Backs Pipeline' },
    { source: 'SN-CI-502', target: 'SN-CI-501', relationship: 'depends_on', label: 'API Dependency' },
    { source: 'SN-INC-314', target: 'SN-CI-503', relationship: 'impacts', label: 'Delays Batch' },
    { source: 'SN-CI-503', target: 'ERP-CC-103', relationship: 'syncs_with', label: 'Ledger Sync' },
    { source: 'CT-002', target: 'FIN-02', relationship: 'contains_waste', label: 'Unused Seats' },
    { source: 'CT-003', target: 'ERP-PO-904', relationship: 'governed_by', label: 'Contract Ref' }
  ],

  // Helper method to convert records across sources into unified Graph Nodes
  getUnifiedGraphNodes: function() {
    const nodes = [];
    // Positions arranged by functional architectural columns:
    // Col 1: ERP Financials (x: 120)
    // Col 2: Jira Delivery / Strategy (x: 380)
    // Col 3: ServiceNow Services & Ops (x: 650)
    // Col 4: Cloud Infrastructure & FinOps (x: 930)
    // Col 5: Procurement & Contracts (x: 1200)

    const coords = {
      'ERP-CC-101': { x: 130, y: 160 },
      'ERP-CC-102': { x: 130, y: 340 },
      'ERP-CC-103': { x: 130, y: 520 },
      'ERP-PO-882': { x: 130, y: 690 },
      'ERP-PO-904': { x: 130, y: 840 },

      'JIRA-EPIC-104': { x: 400, y: 180 },
      'JIRA-EPIC-208': { x: 400, y: 380 },
      'JIRA-EPIC-310': { x: 400, y: 580 },

      'SN-CI-501': { x: 670, y: 220 },
      'SN-CI-502': { x: 670, y: 100 },
      'SN-CI-503': { x: 670, y: 530 },
      'SN-CI-504': { x: 670, y: 400 },
      'SN-INC-228': { x: 670, y: 700 },
      'SN-INC-314': { x: 670, y: 840 },
      'SN-CHG-902': { x: 820, y: 100 },

      'CLOUD-AWS-01': { x: 940, y: 250 },
      'CLOUD-AZURE-02': { x: 940, y: 420 },
      'CLOUD-GCP-03': { x: 940, y: 560 },
      'FIN-01': { x: 940, y: 720 },
      'FIN-02': { x: 940, y: 860 },

      'CT-001': { x: 1200, y: 280 },
      'CT-002': { x: 1200, y: 480 },
      'CT-003': { x: 1200, y: 700 }
    };

    Object.entries(this.sources).forEach(([sourceKey, sourceObj]) => {
      sourceObj.records.forEach(rec => {
        const coord = coords[rec.id] || { x: 500, y: 300 };
        let metricBadge = '';
        if (rec.budgetAnnual) metricBadge = `$${(rec.budgetAnnual/1000000).toFixed(1)}M Budget`;
        else if (rec.severity) metricBadge = rec.severity.split(' - ')[0];
        else if (rec.progressPct) metricBadge = `${rec.progressPct}% Done`;
        else if (rec.monthlyCost) metricBadge = `$${(rec.monthlyCost/1000).toFixed(1)}k/mo`;
        else if (rec.wasteOpportunity) metricBadge = `$${(rec.wasteOpportunity/1000).toFixed(0)}k Waste`;
        else if (rec.acv) metricBadge = `$${(rec.acv/1000).toFixed(0)}k ACV`;
        else if (rec.sla) metricBadge = rec.sla.split(' ')[0];

        nodes.push({
          id: rec.id,
          label: rec.name,
          source: sourceKey,
          sourceName: sourceObj.name,
          sourceIcon: sourceObj.icon,
          sourceColor: sourceObj.color,
          type: rec.type,
          status: rec.status,
          metricBadge: metricBadge,
          x: coord.x,
          y: coord.y,
          data: rec
        });
      });
    });

    return nodes;
  }
};
