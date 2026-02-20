import { useState, useEffect } from "react";
import {
  fetchPhotographyImages,
  type DriveImage,
} from "../lib/googleDrive";

export default function PhotographyPage() {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="photography-grid">
        {images.map((img) => (
          <div key={img.id} className="photography-item">
            <img src={img.thumbnailUrl} alt={img.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
