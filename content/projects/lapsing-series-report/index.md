---
title: "Lapsing Series Report"
description: ""
date: 2022-08-27T07:10:56Z
keywords: ["bigquery", "data analysis", "business intelligence", "reporting", "sql", "data integration", "pipeline"]
icon: "images/google-data-studio-logo.png"
draft: false
problem: "SU QLD was struggling to report on the effectiveness of its reactivation marketing automation journey."
key: "
## Key Contributions

* Mapping the relationships between the data types.

* Developing the data integration to bring the data from Salesforce into BigQuery.

* Writing the SQL query to join the data and ensure we only report on income from individuals once they began the marketing journey.

* Designing the Data Studio report to visualise the data in a way that makes sense to people viewing it.
"
breakdown: ["Development:70", "Design:30"]
---

After deploying [Marketing Cloud]({{< ref "/projects/suqld-salesforce-marketing-cloud" >}}
), SU QLD wanted to report on the income generated from all the donors who had successfully started on their lapsing series campaign — a reactivation marketing journey. The problem was that the reporting functionality built into Salesforce, while good, is limited in how many other data types it can join together in a single view.

{{< figure src="images/lapsing-series-data-diagram.png" title="Salesforce data model for connecting donations to the campaign that won them and the contacts who made each donation." >}}

In order to achieve this kind of reporting we would need the power of SQL. We chose to use Talend Data Integration to copy data from Salesforce to Google BigQuery each night. For visualisation of the data we chose Google Data Studio.

{{< figure src="images/lapsing-series-report-diagram.png" title="Data flow diagram along with the development workflow for the integration." >}}

This reporting solution is very cheap on the Google side of the equation and benefits from the Data Studio reports conforming to Google Drive sharing rules that the organisation uses day-to-day.

The query itself simply looks at the date that the contact became a campaign member of the lapsing series campaign and then selects their donations since that date. We created a view of this query and connected it to Data Studio for visualisation.