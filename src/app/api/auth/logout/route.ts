import { NextResponse } from 'next/server';
import { removeSession } from '@/lib/auth';
import { handleApiError, json } from '@/lib/api-helpers';

export async function POST() {
  try {
    await removeSession();
    return json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return handleApiError(error);
  }
}
