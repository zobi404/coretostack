
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
        return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { tags: ['coretostack-uploads'] },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error);
                        return;
                    }
                    resolve(result);
                }
            ).end(buffer);
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Image Upload Error:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
