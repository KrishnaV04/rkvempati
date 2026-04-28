---
title: "The Beauty of Computer Science"
summary: "Sorting Pokemon cards is Computer Science."
date: "2022-05-20"
---

One of the things I love about computer science is that it exists in problems we solve without even realizing it. This is a story about sorting Pokemon cards.

## The Pile

When I first started collecting, my cards were just a pile. Finding a specific card meant flipping through each one until I found it. I didn't have too many at the time so it wasn't a big deal. I just got faster at flipping through them and it felt fine.

But as I accumulated more and more cards, it started becoming a problem.

## Getting Faster Isn't Enough

In computer science, we use [Big-O notation](https://en.wikipedia.org/wiki/Big_O_notation) to describe how the runtime of an algorithm grows as the input grows. Flipping through an unsorted pile is `O(n)`: as the number of cards doubles, the time to find one doubles too.

Getting faster at flipping is like upgrading your hardware. It helps, but it doesn't change the fundamental shape of the problem. The pile keeps growing. Eventually the data wins.

## A Better System

Without thinking about any of this, I just did what felt natural: I broke the cards into categories and put each category in its own section of a box.

Each card has an obvious category, so given a card I'm looking for I can immediately go to the right section. Now instead of searching all `n` cards, I'm only searching `n/k` cards, where `k` is the number of categories. With about 12 categories that's a `12×` reduction, and that ratio holds no matter how many cards I add.

What I built without knowing it was essentially a **hash map**. The categories act as buckets, and the rule for which card goes into which bucket is the hash function. One so intuitive I didn't even think of it as a function.

But it went further than that. As time flew by and I kept looking through my cards over and over, I started to remember roughly where specific cards sat within a section. Not exactly, but close enough that I could reach into roughly the right spot and find the card in just a few flips. Without realizing it, I had started mentally hashing the locations of individual cards.

This is actually very close to what hashing is in computer science. A hash function takes some input, like a card name, and maps it directly to a location. Instead of searching, you compute where the thing should be and just go there. The goal is `O(1)` lookup, meaning it takes roughly the same amount of time regardless of how many items you have. My brain was doing a version of this: building a rough internal map from card to location through repeated use. It wasn't perfect, but it was fast.

## Why Not Just Sort Alphabetically?

You might think: wouldn't sorting alphabetically be even better? Then you could do [binary search](https://www.w3schools.com/dsa/dsa_algo_binarysearch.php) and find any card in `O(log n)`.

Complexity-wise, that's actually a fair point:

|               | Unsorted Pile | Categorized Buckets | Alphabetically Sorted |
| ------------- | ------------- | ------------------- | --------------------- |
| Find a card   | `O(n)`        | `O(n/k)`            | `O(log n)`            |
| Add a card    | `O(1)`        | `O(1)`              | `O(log n)`            |
| Remove a card | `O(n)`        | `O(n/k)`            | `O(log n)`            |

But the reason I went with categories wasn't complexity, it was convenience. To binary search a physical pile, I need everything in one continuous sorted sequence. Finding a card means splitting the pile in half, picking the right half, splitting again. And when I put a card back, I need to insert it in exactly the right position or the whole thing falls apart.

With categories, none of that overhead exists. I grab the card I need and toss it back anywhere in its section when I'm done. The relative order within a section doesn't matter at all.

The [bucket sort](https://www.geeksforgeeks.org/dsa/bucket-sort-2/) approach is a good balance. Not fully sorted, not fully chaotic. It isn't the most optimal in theory, but it's the most practical for how I actually used the cards.

This is actually a good example of where Big-O notation falls short as a measure of real-world performance. Big-O captures how an algorithm scales, but it doesn't capture the cost of physical inconvenience. The mental overhead of maintaining a sorted sequence, the awkwardness of splitting a pile and putting it back, the risk of dropping everything and losing the order entirely. None of that shows up in the notation.

That said, this only matters because we're dealing with physical objects. If all of this were happening on a computer, the inconvenience disappears. Inserting into a sorted list is just a few pointer operations. Binary search is a few lines of code. In that world, the alphabetically sorted approach would probably win outright and the bucket approach wouldn't have much of an advantage.

## What This Is Really About

I didn't know any of this at the time. I was just a kid trying to find his Charizard.

That's what I find fascinating about computer science. The problems exist long before the theory does. The discipline is about recognizing these patterns, giving them names, and then asking: _can we do better? And how much better is even possible?_

That process of going from an intuition to a formalized idea is what makes this field worth studying.
