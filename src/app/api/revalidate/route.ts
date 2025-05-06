import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const secret = request.headers.get('x-revalidate-token');

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (body.entity?.type === 'tariffplan') {
      revalidateTag('tariffPlans');
      return NextResponse.json({
        message: 'Revalidation successful',
        revalidated: true,
      });
    }

    return NextResponse.json({
      message: 'No revalidation needed for this entity type',
      revalidated: false,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error during revalidation' },
      { status: 500 }
    );
  }
}
