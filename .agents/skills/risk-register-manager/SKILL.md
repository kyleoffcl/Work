---
name: risk-register-manager
description: Manages organizational risk registers. Performs risk assessments, calculates risk scores, tracks mitigations, and generates risk reports for leadership.
allowed-tools: Read, Write, Glob
---

# Risk Register Manager

Maintains and analyzes organizational risk registers.

The register is user-owned state. Write one file per risk under
`./grc-data/risks/`, keep it reviewable in Git, and use
`schemas/risk.schema.json` as the contract for JSON or JSON-equivalent YAML.

## Capabilities

- **Risk Identification**: Identify and categorize risks
- **Risk Scoring**: Calculate inherent and residual risk scores
- **Mitigation Tracking**: Monitor remediation progress
- **Risk Reporting**: Generate board-level risk reports

## Risk Assessment Framework

### Likelihood Scale (1-5)

1. Rare - May occur only in exceptional circumstances
2. Unlikely - Could occur at some time
3. Possible - Might occur at some time
4. Likely - Will probably occur in most circumstances
5. Almost Certain - Expected to occur in most circumstances

### Impact Scale (1-5)

1. Insignificant - No real impact
2. Minor - Some impact, easily remediated
3. Moderate - Significant impact requiring response
4. Major - Major impact on operations
5. Catastrophic - Business-threatening impact

## Risk Categories

- Strategic, Operational, Financial, Compliance
- Technology, Security, Privacy, Third-Party
- Reputational, Legal, Regulatory

## Output Formats

- Risk register spreadsheet format
- Risk heat maps
- Top 10 risks report
- Risk trend analysis
