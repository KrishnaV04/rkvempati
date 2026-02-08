---
title: "Weather Dashboard"
summary: "A real-time weather visualization tool with interactive maps and historical data."
image: "preview.png"
date: "2025-11-20"
---

## Overview

A full-stack weather dashboard that displays real-time meteorological data with interactive visualizations and historical trend analysis.

## Features

- **Live Radar**: Animated precipitation overlay on interactive maps
- **Forecast Models**: Side-by-side comparison of GFS, ECMWF, and NAM models
- **Historical Trends**: Temperature and precipitation charts going back 30 years
- **Alerts**: Push notifications for severe weather in saved locations

## Tech Stack

Built with React, D3.js, and Mapbox GL on the frontend. The backend uses Python (FastAPI) to aggregate data from multiple weather APIs and store it in TimescaleDB.

![Dashboard screenshot](./preview.png)
