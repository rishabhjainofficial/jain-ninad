import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf = file.name.endsWith('.pdf') || file.type === 'application/pdf';
    const subFolder = isPdf ? 'pdf' : 'images';

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', subFolder);
    await mkdir(uploadDir, { recursive: true });

    // Clean filename
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${sanitizedFilename}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${subFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      filePath: publicPath,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
