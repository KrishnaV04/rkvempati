import { useState, useEffect, useRef } from "react";
import "./Diglett.css";

// Configurable parameters for easy tuning
const DIGLETT_SIZE = 150; // SVG display size in pixels
const LEFT_EYE_SOCKET_X = 85; // Center of left eye socket
const RIGHT_EYE_SOCKET_X = 115; // Center of right eye socket
const EYE_SOCKET_Y = 85; // Center Y for both eye sockets
const EYE_SOCKET_RX = 5; // Horizontal radius of eye socket ellipse
const EYE_SOCKET_RY = 12; // Vertical radius of eye socket ellipse
const PUPIL_RX = 1.5; // Horizontal radius of white pupil
const PUPIL_RY = 3; // Vertical radius of white pupil
const PUPIL_BASE_OFFSET_X = 2; // Base offset of pupil from socket center (X)
const PUPIL_BASE_OFFSET_Y = -5; // Base offset of pupil from socket center (Y)
const PROXIMITY_THRESHOLD = 200; // Distance in pixels - Diglett starts hiding when cursor is closer than this
const MAX_HIDE_DISTANCE = 100; // Maximum pixels to move down when approaching
const FULL_HIDE_DISTANCE = 120; // Pixels to move down to fully disappear behind ground

export default function Diglett() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hideOffset, setHideOffset] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const diglettRef = useRef<HTMLDivElement>(null);

  // Track mouse movement and check proximity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if mouse is close to Diglett and calculate hide offset
      if (diglettRef.current) {
        const rect = diglettRef.current.getBoundingClientRect();
        const diglettCenterX = rect.left + rect.width / 2;
        const diglettCenterY = rect.top + rect.height / 2;

        const distanceToDiglett = Math.sqrt(
          Math.pow(e.clientX - diglettCenterX, 2) +
            Math.pow(e.clientY - diglettCenterY, 2),
        );

        // Calculate how much to hide based on proximity
        if (distanceToDiglett < PROXIMITY_THRESHOLD) {
          // Map distance to hide offset: closer = more hidden
          const proximityRatio = 1 - distanceToDiglett / PROXIMITY_THRESHOLD;
          setHideOffset(proximityRatio * MAX_HIDE_DISTANCE);
        } else {
          setHideOffset(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate eye offset based on mouse position (same for both eyes)
  const calculateEyeOffset = () => {
    if (!diglettRef.current)
      return { x: PUPIL_BASE_OFFSET_X, y: PUPIL_BASE_OFFSET_Y };

    const rect = diglettRef.current.getBoundingClientRect();
    // Calculate center point between the two eye sockets
    const eyeCenterX =
      rect.left +
      (rect.width / 120) *
        ((LEFT_EYE_SOCKET_X - 40 + RIGHT_EYE_SOCKET_X - 40) / 2);
    const eyeCenterY = rect.top + (rect.height / 140) * (EYE_SOCKET_Y - 30);

    // Calculate angle from eye center to mouse
    const deltaX = mousePos.x - eyeCenterX;
    const deltaY = mousePos.y - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    // Calculate desired pupil position offset from socket center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const sensitivity = 0.02; // How responsive the eyes are
    let offsetX =
      Math.cos(angle) * Math.min(distance * sensitivity, EYE_SOCKET_RX * 2);
    let offsetY =
      Math.sin(angle) * Math.min(distance * sensitivity, EYE_SOCKET_RY * 2);

    // Constrain within ellipse boundary, accounting for pupil size
    // The pupil center should stay within (socket_radius - pupil_radius)
    const maxOffsetX = EYE_SOCKET_RX - PUPIL_RX - 0.5; // Extra 0.5 padding
    const maxOffsetY = EYE_SOCKET_RY - PUPIL_RY - 1; // Extra 1 padding

    // Ellipse equation: (x/rx)^2 + (y/ry)^2 <= 1
    const normalizedX = offsetX / maxOffsetX;
    const normalizedY = offsetY / maxOffsetY;
    const distanceFromCenter = Math.sqrt(
      normalizedX * normalizedX + normalizedY * normalizedY,
    );

    // If outside the constrained ellipse, scale back to boundary
    if (distanceFromCenter > 1) {
      const scale = 1 / distanceFromCenter;
      offsetX *= scale;
      offsetY *= scale;
    }

    return { x: offsetX, y: offsetY };
  };

  const eyeOffset = calculateEyeOffset();
  const effectiveHideOffset = isHovering ? FULL_HIDE_DISTANCE : hideOffset;

  return (
    <div
      className="diglett-container"
      ref={diglettRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={DIGLETT_SIZE}
        height={DIGLETT_SIZE}
        viewBox="40 30 120 140"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Diglett body - moves down based on cursor proximity */}
        <g
          transform={`translate(0, ${effectiveHideOffset})`}
          style={{ transition: "transform 0.2s ease-out" }}
        >
          <path
            d="M60 160V100C60 60 70 40 100 40C130 40 140 60 140 100V160H60Z"
            fill="#8B5A2B"
          />

          {/* Left eye socket - black (stays still) */}
          <ellipse cx={85} cy={85} rx={5} ry={12} fill="black" />
          {/* Right eye socket - black (stays still) */}
          <ellipse cx={115} cy={85} rx={5} ry={12} fill="black" />

          {/* Left pupil - white (moves with offset) */}
          <ellipse
            cx={LEFT_EYE_SOCKET_X + eyeOffset.x}
            cy={EYE_SOCKET_Y + eyeOffset.y}
            rx={1.5}
            ry={3}
            fill="white"
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />
          {/* Right pupil - white (moves with same offset) */}
          <ellipse
            cx={RIGHT_EYE_SOCKET_X + eyeOffset.x}
            cy={EYE_SOCKET_Y + eyeOffset.y}
            rx={1.5}
            ry={3}
            fill="white"
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />

          <ellipse cx={100} cy={105} rx={15} ry={10} fill="#EFA7B6" />

          <ellipse cx={96} cy={102} rx={4} ry={2} fill="white" opacity={0.6} />
        </g>

        <path d="M40 160H160L150 175H50L40 160Z" fill="#A9A9A9" />
        <path d="M50 160L40 170L60 180L70 160H50Z" fill="#808080" />
        <path d="M150 160L160 170L140 180L130 160H150Z" fill="#808080" />
        <path d="M90 160L80 175L120 175L110 160H90Z" fill="#696969" />
      </svg>
    </div>
  );
}
