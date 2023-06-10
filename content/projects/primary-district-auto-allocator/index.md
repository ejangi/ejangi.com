---
title: "Primary District Auto Allocator"
description: "A Salesforce app that automatically allocates contacts and accounts to SU Australia's geographic districts"
date: 2018-12-04T00:34:34Z
keywords: ["salesforce", "apex", "sfdx", "salesforce developer"]
icon: "images/primary-district.svg"
draft: false
problem: "SU&nbsp;Australia draws it's own geographic bounds, that we call Districts, in order to evenly distribute the work across the country. In Salesforce, we wanted to ensure donors were allocated to the relevant District Manager."
key: "
## Key Contributions

* Drawing up the geographic bounds in Google My Maps.

* Converting the map data into a dataset that Salesforce can work with.

* Building out the system in Salesforce so that every Contact and Account with a mailing address is correctly allocated to a district.

* Ensuring that there is a history of allocations to see how people migrate over time.
"
breakdown: ["Functional Administration:33", "Development:67"]
---

Once we confirmed the geographic bounds of the Districts using Google My Maps, we moved on to developing the system that would allocate individuals to each district.

{{< figure src="images/primary-district-01.png" title="Google My Maps of SU Australia's Districts" >}}

We needed to ensure the points on the map were converted to a dataset that we could easily work with in Apex code and stored against each District record in Salesforce.

{{< figure src="images/primary-district-02.png" title="Bounds are stored as a JSON array of latitude and longitude coordinates" >}}

The Apex Batch runs each night for Contacts and Accounts that were modified in the last 24 hours or have an Address, but no District.

{{< figure src="images/primary-district-03.png" title="The Apex Batch that allocates a district to each Contact and Account" >}}

Each Contact and Account has a Lookup field to the District record, along with a related list of District Allocations so we can keep track of changes over time.

{{< figure src="images/primary-district-04.png" title="My Contact record showing the Primary District field" >}}

We also group several districts into a Region and you can see that each Contact and Account inherits the Primary Region from the District record.

This system has proved to be very effective at helping SU&nbsp;Australia's donors feel more connected to the mission that is happening locally to them. We use it to segment communications and marketing, invite people to local events and connect people with their local District Manager.