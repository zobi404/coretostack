
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 });
    }

    const uploadedUrls = [];

    // Define the path to save the file
    const publicDir = join(process.cwd(), 'public');
    const uploadsDir = join(publicDir, 'uploads');
    
    // Ensure the uploads directory exists
    await mkdir(uploadsDir, { recursive: true });

    for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const extension = file.name.split('.').pop();
        const filename = `${uuidv4()}.${extension}`;
        
        const path = join(uploadsDir, filename);
        
        // Write the file to the public/uploads directory
        await writeFile(path, buffer);

        const relativePath = `/uploads/${filename}`;
        uploadedUrls.push(relativePath);
    }


    return NextResponse.json({ urls: uploadedUrls }, { status: 200 });

  } catch (error) {
    console.error("File upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during upload.";
    return NextResponse.json({ error: `Upload failed: ${errorMessage}` }, { status: 500 });
  }
}
