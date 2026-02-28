import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { json } from '@/lib/api-helpers';
import { errors } from '@/lib/errors';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      throw errors.unauthorized();
    }

    return json({
      user: {
        id: session.id,
        name: session.name,
        email: session.email,
        studentId: session.studentId,
        major: session.major,
        bio: session.bio,
        avatarUrl: session.avatarUrl,
        coverUrl: session.coverUrl,
        role: session.role,
        createdAt: session.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
