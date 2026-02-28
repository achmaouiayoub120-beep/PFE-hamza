const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];
const ALL_ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  fileType?: 'image' | 'document';
}

export function validateFile(file: File): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  // Check file type
  if (!ALL_ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not allowed. Allowed: JPEG, PNG, GIF, WebP, PDF',
    };
  }

  // Determine file type
  const fileType = ALLOWED_IMAGE_TYPES.includes(file.type) ? 'image' : 'document';

  return {
    valid: true,
    fileType,
  };
}

export function getFileTypeFromMime(mimeType: string): 'image' | 'document' | null {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'image';
  if (ALLOWED_DOCUMENT_TYPES.includes(mimeType)) return 'document';
  return null;
}

export async function getFileDimensions(file: File): Promise<{ width: number; height: number } | null> {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return null;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
