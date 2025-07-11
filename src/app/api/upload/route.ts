import { NextResponse } from "next/server";
import { IncomingForm, type File } from "formidable";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js body parsing to allow formidable to handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      const form = new IncomingForm({
        multiples: false, // Only allow single file uploads
      });
      form.parse(req as any, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    });

    const file = data.files.image?.[0] as File | undefined;
    
    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(file.filepath, {
      upload_preset: "coretostack", // your unsigned preset
    });
    
    return NextResponse.json({ secure_url: result.secure_url }, { status: 200 });

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Cloudinary upload failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
