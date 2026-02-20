---
title: "Why Foundation Models Change Robotics"
summary: "Exploring how large pretrained models like DINOv2 reduce the need for task-specific training data in robotic perception."
date: "2026-02-01"
---

## The Shift

Traditional robotic perception pipelines require thousands of labeled images per task. A recycling-sorting arm needs one dataset, a warehouse picker needs another, and neither transfers well.

Foundation vision models flip this. A single pretrained backbone like **DINOv2** produces features so rich that a lightweight head — sometimes just a linear probe — can classify novel objects with minimal examples.

> "The best way to predict the future of AI is to look at what's already working in vision and ask: why isn't robotics using this yet?"

## What This Means in Practice

In our robot arm project, switching from a custom CNN to DINOv2 features:

- Cut labeling effort from ~2,000 images to ~50
- Improved cross-material generalization by 18%
- Enabled zero-shot sorting of material categories not seen during fine-tuning

### Before vs. After

| Metric | Custom CNN | DINOv2 + Linear Probe |
|--------|-----------|----------------------|
| Training images needed | ~2,000 | ~50 |
| Accuracy | 81% | 94% |
| Novel category handling | None | Zero-shot capable |
| Inference time | 12ms | 42ms |

The tradeoff is clear: *slightly* higher latency for dramatically less data engineering.

## The Broader Landscape

Several groups are pushing this direction:

1. [RT-2 by Google DeepMind](https://robotics-transformer2.github.io/) — using VLMs for robotic control
2. [VIMA](https://vimalabs.github.io/) — multimodal prompting for robot manipulation
3. [Octo](https://octo-models.github.io/) — an open-source generalist robot policy

### A Simple Analogy

Think of it like the transition from hand-coded features to deep learning in the 2010s:

```
Before: Raw pixels → Hand-crafted features → Classifier
After:  Raw pixels → Foundation model → Lightweight head
```

The pattern is the same — **push complexity into pretraining** and simplify everything downstream.

## Open Questions

- **Latency**: Foundation models are large. Real-time inference on edge hardware still requires distillation or quantization.
- **Robustness**: How do these features hold up under distribution shift (e.g., different lighting, dirty materials)?
- **Integration**: Most robotics stacks assume small, fast models. Middleware needs to catch up.

The takeaway: the bottleneck in robotic perception is shifting from *data collection* to *systems integration*.

---

*If you're working on something similar, I'd love to chat — reach out via the links on my homepage.*
