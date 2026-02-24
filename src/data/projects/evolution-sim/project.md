---
title: "Evolution Sim"
summary: "A simple natural selection simulator where bips evolve in a sandbox."
icon: "image.svg"
link: "https://bip.rkvempati.com"
date: "2025-09-12"
---

## Overview

Evolution Sim is a simple simulation I built to make natural selection tangible. A population of creatures called **Bips** spawn in a sandbox and must navigate to a destination zone within a fixed number of steps. Only those that make it survive. The rest are eliminated, and the survivors clone themselves into the next generation with the occasional mutation.

Over enough generations, the population's DNA converges toward movement patterns that actually work. No hand-holding, no reward shaping. Just selection pressure and time.

Check out the simulation at the project link above, or [here](https://bip.rkvempati.com).

## How It Works

Each Bip carries a **DNA strand** of exactly 100 segments. Each segment encodes one of four directions: Up, Down, Left, or Right. The distribution of segments determines movement probability a Bip with 40 "Right" segments has a 40% chance of moving right at each step.

At every step, a random segment index is drawn from the strand and the Bip moves 5 pixels in that direction. If it hits a wall, it gets clamped to the edge, effectively wasting steps, which creates natural pressure against wall-hugging DNA.

### Selection

The sandbox is divided into a **3×3 grid**. One zone is the destination (shown in green). At the end of each day, any Bip inside that zone survives. Everything else is gone. With purely random DNA, a Bip has about an 11% chance of landing in the right zone so early generations see brutal mortality.

### Reproduction

Survivors **clone themselves in round-robin order** until the population is full again. If 3 out of 50 survive, they cycle through cloning until there are 50 new Bips. Each inherits its parent's DNA, placed back at the starting corner for the next day.

If zero Bips survive, the population goes extinct and the simulation pauses.

### Mutation

During cloning, each of the 100 DNA segments is independently checked for mutation. The mutation rate is configurable from 0% to 10% (default: 0.1%). When a segment mutates, its direction is replaced by one of the other three at random.

At 0.1%, roughly 1 in 10 Bips will have a single mutation per generation. High enough to introduce diversity, low enough not to destroy well-adapted strands.

## Evolutionary Dynamics

Early generations are mostly noise: random DNA, high mortality, few survivors. But those few carry slightly biased strands. Their clones dominate the next generation, and the bias compounds. After enough generations the population converges, and you can watch the Bips stream directly toward the destination.

The speed of convergence depends on mutation rate, population size, step count, and the distance between start and destination. Tweak any of them and the dynamics shift.
