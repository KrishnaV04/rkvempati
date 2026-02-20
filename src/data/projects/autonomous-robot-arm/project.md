---
title: "Autonomous Robot Arm"
summary: "A computer vision-based arm that sorts recyclable materials using DINOv2."
image: "preview.png"
link: "https://github.com/rkvempati/robot-arm"
date: "2026-01-15"
---

## Overview

This project explores using foundation vision models to enable a 6-DOF robot arm to autonomously sort recyclable materials on a conveyor belt.

![Robot arm in action](./preview.png)

## Technical Details

The system uses **DINOv2** for zero-shot object classification, allowing the arm to distinguish between plastics, metals, paper, and glass without task-specific training data. Read more about DINOv2 in the [original paper by Meta AI](https://arxiv.org/abs/2304.07193).

### Key Components

- **Vision Pipeline**: DINOv2 feature extraction with a lightweight classification head
- **Motion Planning**: RRT-based path planning with collision avoidance
- **Hardware**: Custom 3D-printed gripper mounted on a UR5e arm
- **Control**: ROS2 integration with real-time servo control

### Architecture

The inference pipeline runs as a ROS2 node. Here's the core classification loop:

```python
def classify_frame(self, frame: np.ndarray) -> str:
    features = self.dino_model.extract_features(frame)
    logits = self.classification_head(features)
    category = MATERIAL_CLASSES[logits.argmax()]
    return category
```

> "The best robotics systems aren't the ones with the most data — they're the ones that need the least." — Our project philosophy

## Results

| Metric                  | Value         |
| ----------------------- | ------------- |
| Classification accuracy | 94%           |
| Material categories     | 12            |
| Throughput              | ~30 items/min |
| Inference latency       | 42ms          |

## What's Next

1. Migrate to [DINOv2 with registers](https://arxiv.org/abs/2309.16588) for improved feature maps
2. Add a _tactile sensing_ module for material hardness classification
3. Deploy on edge hardware using [ONNX Runtime](https://onnxruntime.ai/)

#### Acknowledgments

Thanks to the [ROS2 community](https://docs.ros.org/) and the open-source contributors behind DINOv2.
