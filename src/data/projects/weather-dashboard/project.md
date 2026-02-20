---
title: "Weather Dashboard"
summary: "A real-time weather visualization tool with interactive maps and historical data."
image: "preview.png"
date: "2025-11-20"
---

## Overview

A full-stack weather dashboard that displays real-time meteorological data with interactive visualizations and historical trend analysis.

![Dashboard screenshot](./preview.png)

## Features

- **Live Radar**: Animated precipitation overlay on interactive maps
- **Forecast Models**: Side-by-side comparison of GFS, ECMWF, and NAM models
- **Historical Trends**: Temperature and precipitation charts going back 30 years
- **Alerts**: Push notifications for severe weather in saved locations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, D3.js, Mapbox GL |
| Backend | Python, FastAPI |
| Database | TimescaleDB |
| Hosting | AWS (ECS + CloudFront) |

The backend aggregates data from the [Open-Meteo API](https://open-meteo.com/) and the [NOAA Weather API](https://www.weather.gov/documentation/services-web-api).

### API Example

Fetching a 7-day forecast:

```bash
curl https://api.weatherdash.dev/forecast?lat=37.7749&lon=-122.4194&days=7
```

Response:

```json
{
  "location": "San Francisco, CA",
  "forecast": [
    { "date": "2025-11-20", "high": 62, "low": 48, "condition": "Partly Cloudy" },
    { "date": "2025-11-21", "high": 58, "low": 45, "condition": "Rain" }
  ]
}
```

> Built this because every weather app I tried either had too many ads or not enough data granularity.

## Lessons Learned

1. TimescaleDB's hypertables made historical queries *significantly* faster than plain PostgreSQL
2. Mapbox GL's `addSource` API is powerful but poorly documented — the [community examples](https://docs.mapbox.com/mapbox-gl-js/example/) helped a lot
3. Rate limiting across multiple upstream APIs requires careful orchestration

#### Links

- [Source Code](https://github.com/rkvempati/weather-dashboard)
- [Live Demo](https://weather.rkvempati.dev)
