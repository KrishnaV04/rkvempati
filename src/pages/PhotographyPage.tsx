import { useState, useEffect, useCallback } from "react";
import Masonry from "react-masonry-css";
import {
  fetchPhotographyImages,
  type DriveImage,
} from "../lib/googleDrive";

export default function PhotographyPage() {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<DriveImage | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPhotographyImages()
      .then((imgs) => {
        if (!cancelled) {
          setImages(imgs);
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

  if (images.length === 0) {
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
        {images.map((img) => (
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
