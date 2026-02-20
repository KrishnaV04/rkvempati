export interface DriveImage {
  id: string;
  name: string;
  mimeType: string;
  thumbnailUrl: string;
  fullUrl: string;
}

const FOLDER_ID = "1H0cZ8MO66NNCJKv9W2l5hW5cykDa6kId";
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

function buildThumbnailUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
}

function buildFullUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w4000`;
}

// Note: pageSize=100 is the max per request. If the folder grows beyond 100
// images, pagination via nextPageToken will need to be added.
export async function fetchPhotographyImages(): Promise<DriveImage[]> {
  const query = encodeURIComponent(`'${FOLDER_ID}' in parents`);
  const fields = encodeURIComponent("files(id,name,mimeType)");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&key=${API_KEY}&pageSize=100`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Google Drive API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const files: Array<{ id: string; name: string; mimeType: string }> =
    data.files ?? [];

  return files
    .filter((f) => f.mimeType.startsWith("image/"))
    .map((f) => ({
      id: f.id,
      name: f.name,
      mimeType: f.mimeType,
      thumbnailUrl: buildThumbnailUrl(f.id),
      fullUrl: buildFullUrl(f.id),
    }));
}
