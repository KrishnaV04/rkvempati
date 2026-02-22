import { useState, useEffect, useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import {
  fetchPhotographyImages,
  type DriveImage,
} from "../lib/googleDrive";

type LoadPhase = "loading" | "done";

export default function PhotographyPage() {
  const [allImages, setAllImages] = useState<DriveImage[]>([]);
  const [loadPhase, setLoadPhase] = useState<LoadPhase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<DriveImage | null>(null);
  const [upgradedImages, setUpgradedImages] = useState<Set<string>>(new Set());
  const upgradeIdxRef = useRef(0);

  const runUpgradeQueue = useCallback((images: DriveImage[]) => {
    const idx = upgradeIdxRef.current;
    if (idx >= images.length) return;

    const image = images[idx];
    const tempImg = new Image();
    tempImg.onload = () => {
      setUpgradedImages((prev) => new Set([...prev, image.id]));
      upgradeIdxRef.current++;
      runUpgradeQueue(images);
    };
    tempImg.onerror = () => {
      upgradeIdxRef.current++;
      runUpgradeQueue(images);
    };
    tempImg.src = image.mediumUrl;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    Promise.all([fetchPhotographyImages(), delay(800)])
      .then(([imgs]) => {
        if (!cancelled) {
          setAllImages(imgs);
          setLoadPhase("done");
          runUpgradeQueue(imgs);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load images");
          setLoadPhase("done");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [runUpgradeQueue]);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeLightbox]);

  if (loadPhase !== "done") {
    return (
      <div className="photography-page">
        <h1>Photography</h1>
        <div className="photo-loader">
          <img
            src="/tab-icon.svg"
            alt=""
            className="photo-loader-icon spinning"
          />
          <p className="photo-loader-text">Loading</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="photography-page">
        <h1>Photography</h1>
        <p className="photography-error">Error: {error}</p>
      </div>
    );
  }

  if (allImages.length === 0) {
    return (
      <div className="photography-page">
        <h1>Photography</h1>
        <p>No photos found.</p>
      </div>
    );
  }

  return (
    <div className="photography-page">
      <h1>Photography</h1>
      <Masonry
        breakpointCols={2}
        className="photography-grid"
        columnClassName="photography-grid-column"
      >
        {allImages.map((img) => {
          const upgraded = upgradedImages.has(img.id);
          return (
            <div
              key={img.id}
              className="photography-item"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={upgraded ? img.mediumUrl : img.thumbnailUrl}
                alt={img.name}
                loading="lazy"
                className={upgraded ? "photo-upgraded" : "photo-thumb"}
              />
            </div>
          );
        })}
      </Masonry>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <img
            src={selectedImage.fullUrl}
            alt={selectedImage.name}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
