---
title: "Campaign Members From Report"
description: "A custom Flow and Apex class that adds campaign members to a campaign while also filling in custom fields on the campaign member record."
date: 2020-04-10T01:31:16Z
keywords: ["salesfoce", "apex", "sfdx", "custom development"]
icon: "images/campaign-member-from-report.svg"
draft: true
problem: "The fundraising team wanted a more sophisticated means of segmenting their campaigns and we were finding that adding people to a campaign in Salesforce with custom segment fields was taking a long time."
key: "
## Key Contributions

* Working with Stakeholders to understand the problem.

* Building the Flow and confirming with stakeholders.

* Building the custom Apex code that would do the grunt work.
"
breakdown: ["Business Analysis:15", "Development:85"]
---

While Salesforce has it's own native mechanism for adding members to a campaign based on a report. We wanted to also fill in a few custom fields on the Campaign Member record to better segment our marketing efforts.

{{< figure src="images/report-to-campaign-01.png" title="The Flow triggered by a Quick Action button" >}}

This relatively quick user experience is build using a Salesforce Flow that feeds the variables into some custom Apex that adds the contacts to the requested Campaign.

{{< figure src="images/report-to-campaign-02.png" title="The Flow Graph" >}}