---
name: compliance-tracker
description: Tracks compliance status across multiple frameworks. Monitors control implementation, identifies gaps, and generates compliance dashboards and reports.
allowed-tools: Read, Glob, Grep, Write
---

# Compliance Tracker

Monitors and reports on organizational compliance posture.

## Capabilities

- **Multi-Framework Tracking**: Monitor SOC 2, ISO 27001, NIST, PCI, HIPAA simultaneously
- **Gap Analysis**: Identify missing controls and evidence
- **Deadline Management**: Track certification renewals and audit dates
- **Trend Analysis**: Show compliance improvement over time

## Metrics Tracked

- Control implementation percentage by framework
- Evidence freshness and gaps
- Audit findings status (open/closed)
- Policy review status
- Training completion rates

## Output Formats

- Executive dashboard summaries
- Detailed control matrices
- Gap analysis reports
- Audit readiness scorecards

## Integration Points

- Reads from compliance documentation repositories
- Analyzes evidence folders for completeness
- Parses audit reports for findings status
- Uses `./grc-data/metrics/` for KPI/KRI trend lines when those records exist
