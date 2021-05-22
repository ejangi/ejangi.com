---
title: "Soulution"
description: "A UX design and React/Firebase web app for structured problem solving"
date: 2021-05-22T01:45:14Z
keywords: ["app","ux","design","figma", "structured problem solving"]
icon: "images/soulution-icon.png"
draft: false
problem: "Structured problem solving is a great way to help the human mind find solutions for seamingly difficult problems. However, there currently isn't a website or app that makes this easy to do on the go."
key: "
## Key Contributions

* Designed mockup in Figma.

* Built the web app in React using Google's Firestore and Firebase Auth.

* Configured the automated build process from git push to live.

* Deployed for testing and personal use at [soulution.cloud](https://soulution.cloud)
"
breakdown: ["Development:70", "Design:30"]
---

Having used a structured problem solving worksheet (on paper) before, I knew there was value in the process. Now that this is a web app, it is easy for me to work through problems on the go.

{{< figure src="/images/soulution-logos.png" title="Soulution Logos" class="xs" >}}

While this is a very simple app, I wanted to ensure people had quick and simple prompts from the get-go.

{{< figure src="/images/soulution-empty.png" title="The welcome screen" class="xs" >}}

Working through your problems is a six step process. I really like wizards and this user experience fits really well with the structure problem solving process.

{{< figure src="/images/soulution-define.png" title="First, define the problem" class="xs" >}}

Lists are a very straight forward way of representing an abitrary number of options. For this UI, I created a new form element in React that ensures each list item is stored separately in the database, but visually appears as document format that most people are familiar with.

{{< figure src="/images/soulution-list.png" title="Second, list all possible solutions" class="xs" >}}

Again, we use the custom list form element to help people think through the pros and cons of each option they listed in the previous step.

{{< figure src="/images/soulution-evaluate.png" title="Third, we list the pros and cons for each solution we listed in the previous step" class="xs" >}}

Now, that we have helped people see various options and think through pros and cons, we prompt them to make a choice.

{{< figure src="/images/soulution-choose.png" title="Fourth, we choose the option with the greatest merit" class="xs" >}}

Having made a choice, we want to ensure they have a clear path forward by listing off the steps they need to complete in order to get from where they are to where they want to be.

{{< figure src="/images/soulution-plan.png" title="Fifth, make a plan" class="xs" >}}

Lastly, we have a review page that details the solution and the steps to get there. This will be the page we show people when they go back through old problems.

{{< figure src="/images/soulution-review.png" title="Lastly, we create a review page of the solution and the steps to get there" class="xs" >}}

To give a nice separation between problems that have been solved and problems that we are currently working on, we adjust the dashboard with visual queues.

{{< figure src="/images/soulution-progress.png" title="Problems that are in progress are more visible on the dashboard" class="xs" >}}

For the developers out there, you can check out the source for this project on [github](https://github.com/ejangi/soulution). The build process utilises Google Cloud Build to watch for new commits to the `master` branch and then kicks off a build. The result is copied to a Google Cloud Storage bucket and finally, CloudFlare handles proxying the website at [https://soulution.cloud](https://soulution.cloud).

I utilise [Integromat](https://www.integromat.com/en) to watch for build results and then pipe that detail into a slack message so I get notified when the change is live.

{{< figure src="/images/soulution-build-process.png" title="The build process diagram" class="sm" >}}