import { useState, useEffect, useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import {
  fetchPhotographyImages,
  type DriveImage,
} from "../lib/googleDrive";

const INITIAL_BATCH = 6;
const BATCH_SIZE = 6;
const BATCH_DELAY_MS = 300;

export default function PhotographyPage() {
  const [allImages, setAllImages] = useState<DriveImage[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<DriveImage | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    let cancelled = false;

    fetchPhotographyImages()
      .then((imgs) => {
        if (!cancelled) {
          setAllImages(imgs);
          setVisibleCount(INITIAL_BATCH);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load images"
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loading || visibleCount >= allImages.length) return;

    timerRef.current = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, allImages.length));
    }, BATCH_DELAY_MS);

    return () => clearTimeout(timerRef.current);
  }, [loading, visibleCount, allImages.length]);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeLightbox]);

  if (loading) {
    return (
      <div className="photography-page">
        <h1>Photography</h1>
        <p className="photography-loading">Loading photos...</p>
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

  const visibleImages = allImages.slice(0, visibleCount);

  return (
    <div className="photography-page">
      <h1>Photography</h1>
      <Masonry
        breakpointCols={2}
        className="photography-grid"
        columnClassName="photography-grid-column"
      >
        {visibleImages.map((img) => (
          <div
            key={img.id}
            className="photography-item"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.thumbnailUrl} alt={img.name} loading="lazy" />
          </div>
        ))}
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
