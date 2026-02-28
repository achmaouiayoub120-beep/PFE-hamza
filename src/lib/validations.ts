import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  studentId: z.string().min(3, 'Student ID must be at least 3 characters').max(20),
  major: z.string().min(2, 'Major must be at least 2 characters').max(100),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  bio: z.string().max(500).optional(),
  major: z.string().min(2).max(100).optional(),
});

// Post schemas
export const createPostSchema = z.object({
  content: z.string().min(1, 'Post content is required').max(5000),
});

export const updatePostSchema = z.object({
  content: z.string().min(1).max(5000),
});

// Comment schemas
export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(1000),
  postId: z.number().int().positive(),
});

// File upload validation
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
        return allowedTypes.includes(file.type);
      },
      'File type not allowed. Allowed: images (JPEG, PNG, GIF, WebP) and PDF'
    ),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
