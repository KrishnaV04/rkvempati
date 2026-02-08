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

The system uses **DINOv2** for zero-shot object classification, allowing the arm to distinguish between plastics, metals, paper, and glass without task-specific training data.

### Key components

- **Vision Pipeline**: DINOv2 feature extraction with a lightweight classification head
- **Motion Planning**: RRT-based path planning with collision avoidance
- **Hardware**: Custom 3D-printed gripper mounted on a UR5e arm
- **Control**: ROS2 integration with real-time servo control

## Results

The system achieves 94% classification accuracy across 12 material categories and can process approximately 30 items per minute.
