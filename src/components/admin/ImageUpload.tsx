"use client";

import { useState } from "react";
import { clientSupabase } from "@/lib/supabase/client";

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  existingImages?: string[];
}

export function ImageUpload({ onImagesUploaded, existingImages = [] }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(existingImages);
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages);

  const uploadImage = async (file: File) => {
    const supabase = clientSupabase();
    
    // Benzersiz dosya adı oluştur
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Dosyayı yükle
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Public URL'i al
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      setPreviewImages(newImages);
      onImagesUploaded(newImages);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Resim yüklenirken hata oluştu!');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newImages);
    onImagesUploaded(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Ürün Resimleri
        </label>
        <div className="flex items-center gap-4">
          <label className="btn-primary px-6 py-3 cursor-pointer inline-block">
            {uploading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Yükleniyor...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                📸 Resim Seç
              </span>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <span className="text-sm text-slate-600">
            {images.length} resim yüklendi
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Birden fazla resim seçebilirsiniz. PNG, JPG, WEBP formatları desteklenir.
        </p>
      </div>

      {/* Preview Grid */}
      {previewImages.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Yüklenen Resimler
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewImages.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200">
                  <img
                    src={url}
                    alt={`Ürün resmi ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  ✕
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Ana Resim
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}