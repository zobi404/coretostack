
'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function uploadImage(formData: FormData) {

    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const results = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            tags: ['nextjs-server-actions-upload-sneakers'],
            upload_preset: 'nextjs-server-actions-upload-sneakers'
        }, function (error, result) {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        })
            .end(buffer);
    });

    revalidatePath("/")
    return results

}