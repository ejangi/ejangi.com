---
title: "Pocket Query"
description: "A UX design for a fictitious BigQuery app"
date: 2020-08-29T00:47:36Z
keywords: ["app","ux","design","bigquery","sql"]
icon: "images/pocket-query-icon.svg"
draft: false
problem: "One night, my boss messaged me asking me for some statistics and I wished there was a way I could quickly query the results from my smartphone."
key: "
## Key Contributions

* Designed app in Figma.

* Affordances for multiple projects, saved queries, running ad-hoc queries.

* Full screen query editor, full screen results or a split view for both.

* Ability to quickly reference the schema along with auto-complete and intellisense.
"
breakdown: ["Design:100"]
---

This project was purely a personal design challenge, but it proved to be a great exercise in app design.

{{< figure src="/images/pocket-query-splash.png" title="Loading Screen" class="xs" >}}

When you're writing your queries, it's often helpful to see a small selection of results. Here you can see the results inline with the editor. Notice the "Limit: 1000" button at the top of the keyboard — this can be changed and turned on and off while you write the query.

{{< figure src="/images/pocket-query-inline.png" title="Inline Editor and Results" class="xs" >}}

For larger queries, you just need a larger editor. Here you can see the editor in it's *maximised* state.

{{< figure src="/images/pocket-query-editor-max.png" title="Editor Maximised" class="xs" >}}

For the original problem I had — where my boss was asking for some quick statistics, I realised it would be handy to write the query, but then have a button that could quickly run a `count` operation on the current query.

{{< figure src="/images/pocket-query-quick-count.png" title="Quick Count Query" class="xs" >}}

For larger sets of results, you would of course need a larger view.

{{< figure src="/images/pocket-query-results.png" title="Results with Minimised Editor" class="xs" >}}

The app needs to allow you to login to multiple Google Accounts and projects. In BigQuery you can also save personal or project queries. The menu provides affordances for all of these scenarios.

{{< figure src="/images/pocket-query-side-menu.png" title="Menu" class="xs" >}}

Finally, it is handy to have a schema reference to help you build a mental model of the data and write your query.

{{< figure src="/images/pocket-query-schema-tables.png" title="Schema: Tables" class="xs" >}}

And, why not make it easy to add a field to your query?

{{< figure src="/images/pocket-query-schema-fields.png" title="Schema: Fields" class="xs" >}}