---
title: "LLMath"
summary: "Personalized math worksheets generator."
icon: "image.ico"
link: "https://llmath.org/"
date: "2025-01-11"
featured: "true"
---

## Overview

LLMarh started as a tutoring problem. Generating quality worksheets: classwork, homework, practice sets by hand is tedious, and off the shelf worksheets online are generic. They don't match how a particular teacher explains things, and that gap between a lecture and the material hurts recollection.

Here was my fix: let teachers, parents, or students describe exactly what they need in plain language, and generate a personalized worksheet from that. Every problem is tailored to the prompt, every layout is standardized in **LaTeX**, and solutions are included. By the way; Yes, the name is a play on the works: **LLM** + **Math**.

## Why Not Just Use Online Worksheets?

A common pushback. The issue isn't availability; There's no shortage of worksheets online. The issue is _personalization_. A worksheet built from a prompt can match a teacher's specific style, reflect the exact notation used in class, and target the gaps a particular student has. That connection between classroom instruction and the actual work matters for retention.

Standardization is another underrated benefit. Every worksheet looks the same: consistent spacing, configurable columns and rows, defined margins, controlled solution space.

## How It Works

The first version was simple, an LLM with a LaTeX engine. Give the model a prompt, let it write its own LaTeX, render it. It worked, but giving an LLM full control over LaTeX brought endless formatting issues.

The second version introduced a more restrictive rendering approach: predefined LaTeX layouts with configurable parameters. The LLM fills in the parameters rather than writing raw LaTeX. A middle layer enforces quality.

The current version expands on problem generation itself using a full agentic workflow:

1. **RAG Retrieval** — Example problems are fetched from a [Pinecone](https://www.pinecone.io/) vector database via similarity search on the user's prompt
2. **Problem Generation** — [Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) generates problems using the retrieved examples as context
3. **Solution Generation** — Solutions are generated for each problem
4. **Verification** — Solutions are verified against the problems
5. **LaTeX Configuration** — The LLM provides parameters to the LaTeX engine (columns, rows, spacing, margins, solution space, etc.)
6. **Render & Store** — LaTeX is rendered to PDF and stored in [Supabase](https://supabase.com/)

