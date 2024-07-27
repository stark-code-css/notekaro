import client from '@/lib/appwrite.client';
import { Databases, ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

const database = new Databases(client);

async function createTodo(data: { title: string; description: string }) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create todo');
  }
}

export async function GET(req: Request) {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
      [Query.orderDesc('$createdAt')]
    );
    return NextResponse.json(response.documents, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    const data = { title, description };
    const response = await createTodo(data);
    return NextResponse.json(
      {
        message: 'Todo created successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create todo',
      },
      { status: 500 }
    );
  }
}
