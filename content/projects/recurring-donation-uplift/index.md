---
title: "Recurring Donation Uplift"
description: ""
date: 2020-03-26T02:37:06Z
keywords: []
icon: "images/recurring-uplift-icon.png"
draft: false
problem: "SU QLD had some very faithful long-term donors who wanted more control over their recurring donations. The fundraising team also wanted to offer these donors an easy way to automatically increase their giving each year."
key: "
# Key Contributions

* Requirements gathering and process mapping.

* Functional build and technical development using [SFDX](https://www.salesforce.com/products/platform/products/salesforce-dx/).

* Emails, landing pages and journeys built in Marketing Cloud.

* Campaign launch marketing setup and send.
"
breakdown: ["Business Analysis:15", "Project Management:10", "Development:65", "Design:10"]
---

From automatic emails and landing pages to the donor in Marketing Cloud, to a configurable app in Salesforce, this system automates as much as possible, while still putting a lot of power in the hands of the administrators and the donors themselves.

{{< figure src="images/recurring-donation-uplift-schedule.png" title="The Marketing Cloud email notice with the donor's new schedule of giving." >}}

If the donor clicks the CTA in the email, they are redirected to a secure landing page:

{{< figure src="images/recurring-donation-cloudpage.png" title="The Marketing Cloud landing page where a donor can adjust their recurring donation along with the automatic uplift options." >}}

Any changes made on this page will be immediately reflected in Salesforce. Recurring Donation Uplift records are created so we have a history of *uplifts* over time, along with a reference for what will be processed in the coming year:

{{< figure src="images/recurring-donation-uplift-record.png" title="Each year an uplift record is created in Salesforce." >}}

This project took advantage of [SFDX](https://www.salesforce.com/products/platform/products/salesforce-dx/) so that development could be version controlled and flow through a CI/CD process for quality control at every stage.