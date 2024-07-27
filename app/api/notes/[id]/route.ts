import client from '@/lib/appwrite.client';
import { Databases } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

async function fetchNote(id: string) {
  try {
    const note = database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      id
    );
    return note;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch note.');
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const note = await fetchNote(id);
    return NextResponse.json(note);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const note = await fetchNote(id);
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      id
    );
    return NextResponse.json({
      message: 'Note deleted successfully.',
      note: note,
    });
  } catch (err) {
    return NextResponse.json(err);
  }
}

async function updateData(id: string, title: string, description: string) {
  try {
    const response = database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      id,
      { title, description }
    );
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { title, description } = await req.json();
    const res = updateData(id, title, description);
    return NextResponse.json({
      success: true,
      message: 'Updated Successfully',
    });
  } catch (e) {
    return NextResponse.json(e);
  }
}
