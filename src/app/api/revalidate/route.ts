// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { secret, entryId } = requestBody;
    
    // Verify the secret to ensure the request is coming from Contentful
    if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }
    
    // Revalidate the specific post if id is provided
    if (entryId) {
      revalidatePath(`/actualites/${entryId}`);
    }
    
    // Always revalidate the blog index
    revalidatePath('/actualites');
    
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error(error); // Logs the error for debugging
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) }, 
      { status: 500 }
    );
  }
}  