import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { validateFile } from '@/lib/upload';
import { handleApiError, json } from '@/lib/api-helpers';
import { errors } from '@/lib/errors';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      throw errors.unauthorized();
    }

    // Get form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw errors.badRequest('No file provided');
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      throw errors.badRequest(validation.error || 'Invalid file');
    }

    // For now, return a placeholder response
    // In production, integrate with UploadThing:
    // const response = await utapi.uploadFiles(file);
    // return json({ url: response.data.url, name: file.name, type: validation.fileType });

    // Temporary: Return a mock URL (replace with actual upload service)
    return json({
      success: true,
      file: {
        name: file.name,
        size: file.size,
        type: validation.fileType,
        // In production, this would be a real UploadThing URL
        url: `/uploads/${Date.now()}-${file.name}`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
