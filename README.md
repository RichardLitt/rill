rill
====

Stream &amp; git based time management

>I see my life go drifting like a river
>From change to change; I have been many things
~ Fergus and the Druid, WB Yeats

##Concept

###Time stream
Time itself can be thought of as a stream. A span of time can be thought of as two discrete data points in this stream. We can give labels to this span of time. This can be thought of like so: 

```js
{
	start: TimePointA,
	end: TimePointB,
	label: LabelC
}
```

This is non-controversial. The storage of data about time should match our mental model of time. So, instead of storing data in a mutable, flat datastore (for instance as a dumb excel file), it makes sense to only read the relevant sections of the the data that is being read or written. 

###Labeling
Labels can be thought of in terms of a relevance hierarchy. For instance, if you are a contractor, you would label any span as `work`. However, a subclass of work might be `research`, `code`, or `staring into space`. A superclass could be `jobX`, or something more abstract such as `conference trip`, `winter`, `living`.

If we can pinpoint the appropriate labels within the relevance hierarchy and apply those labels to multiple spans of time, it would be possible to more accurately model time. 

###Reference
Each span of time should have only one reference - the previous span of time, as time is thought of as sequential. In some cases, this is not intuitive. For instance, pretend you are are working from point A to point B. You then pick up a book and read the introductory chapter. You decide this is not billable work, so you categorize point B to point C as non-work. If you read the first chapter, which is relevant to your work, you might consider point C to point D as work. This would follow from points A-B, but would have a gap in the middle from B-C. Point C-D should refer both to the previous B-C, and also to A-B. 

	A
	| (work)
	B
	| (non-work)
	C 
	| (work)
	D


However, at every point from A-D, you were doing something. So, rather than leaving B-C as a gap in the log, you should label it differently. 

Borrowing from the [git]() branching model, there is another way of viewing this. Think of two long-running branches: work _w_ and non-work _n_. In the graph below, the dots indicate a non-active branch. At any given data point, you can switch to another long running branch, or specify a continuation of the current branch. 

	w n
	| :
	A . 
	| : 
	B =
	: |
	= C
	| : 
	D .
	| :

Here, each data point has one prior referent data point, and you are able to track time on each branch.

Earlier, we mentioned labels: here, we can think of labels as the names of the branches. 

##Currency

Switching topics: the [flow](https://en.wikipedia.org/wiki/Flow_(psychology)) paradigm states that switching tasks has a mental burden, as it takes time and mental energy to focus on the task at hand. In most models of time management, this is not a problem; a task occurs for a set amount of time, at a certain hierarchy. However, we know that a day spent switching between 15 projects will not be as productive as a day spent in concentration on a single project. 

As well, coming back to a project after a long amount of time is costly; you have to rebuild a mental model of the project to know where you were and what tasks were left to do. In some cases, it is impossible to return to a project: writing notes about a conversation a month ago is most cases impossible. Notes should be taken during a conversation, or immediately after, to maximise retention. 

One way to fix this is through gamification through granting currency.

Important concepts:
	* Each day has a finite amount of currency granted.
	* Currency is spent on whatever branch you are on, proportional to the total amount of time spent. 
	* Each switch in context reduces the amount of currency that can be meted out.
	* Branches deflate in value while inactive.

This should be modelled in the system. This can be done by assigning a weight to each long running branch, and giving out a finite amount of currency to be distributed within a day. Any amount of time spent on a given branch will spend the proportional money for that span on that branch. If you work on project A for four hours, than 16% of that day's currency will be invested in that branch. As there are no gaps in time, it doesn't make sense to have only an 8 hour day - rather, you can think of it as investing 33% of your money on sleep each day, and 33% on living, and then 33% on work. 

A switch between branches will cost a proportion of the currency for that day.
If you are given 100 credits for a day, then each switch will cost 1 credit; as such, it is almost impossible (unless you're on vacation, in which 100% of the day could hypothetically be spent on sleep) to use all of the 100 allotted credits per a day; instead, it is more likely that you will use somewhere around 90 credits a day, given switches. Each span of time can then be allotted a proportional amount out of that day's total amount left. This serves the purpose of punishing switching branches too often. 

Branches should also deflate in value if they are not accessed frequently. This encourages switching, by making sure that, for instance, you do take notes of that meeting before you forget the concepts and lose currency. The amount of currency lose is proportional to the amount of time since that branch was last active. 

##Rill

Rill enables this by providing a data store for tasks, enforcing hard labels which are used to name branches, requesting soft labels for more discrete time measurement, and creating and modifying a currency system that can be used to track the inherent value of different branches. 
















