/**
 * CoverUploader Component
 * Upload book cover (image, GIF, or short video)
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoverUploaderProps {
  currentCover?: string;
  onCoverChange: (coverUrl: string, coverType: 'image' | 'gif' | 'video') => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_DURATION = 10; // 10 seconds

export const CoverUploader: React.FC<CoverUploaderProps> = ({
  currentCover,
  onCoverChange,
}) => {
  const [preview, setPreview] = useState<string | null>(currentCover || null);
  const [coverType, setCoverType] = useState<'image' | 'gif' | 'video'>('image');
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const validateFile = async (file: File): Promise<boolean> => {
    setError(null);

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be under 5MB');
      return false;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, GIF, or short MP4/WebM video');
      return false;
    }

    // Validate video duration
    if (file.type.startsWith('video/')) {
      const duration = await getVideoDuration(file);
      if (duration > MAX_VIDEO_DURATION) {
        setError(`Video must be ${MAX_VIDEO_DURATION} seconds or less`);
        return false;
      }
    }

    return true;
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = await validateFile(file);
    if (!isValid) return;

    setIsUploading(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Determine cover type
      let type: 'image' | 'gif' | 'video' = 'image';
      if (file.type === 'image/gif') {
        type = 'gif';
      } else if (file.type.startsWith('video/')) {
        type = 'video';
      }
      setCoverType(type);

      // In production, you would upload to Firebase Storage here
      // For now, we'll use the preview URL
      onCoverChange(previewUrl, type);
    } catch (err) {
      setError('Failed to process file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCover = () => {
    setPreview(null);
    setCoverType('image');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-zinc-600 font-serif">
          Book Cover
        </label>
        {preview && (
          <button
            onClick={handleRemoveCover}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div className="relative">
        {preview ? (
          <div className="relative aspect-[2/3] w-full max-w-[200px] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
            {coverType === 'video' ? (
              <video
                ref={videoRef}
                src={preview}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={preview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 text-xs rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Change Cover
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="aspect-[2/3] w-full max-w-[200px] rounded-lg border-2 border-dashed border-[#ffb6d9]/20
                     bg-zinc-900/30 hover:border-[#ffb6d9]/40 hover:bg-zinc-900/50 transition-all
                     flex flex-col items-center justify-center gap-3 group"
          >
            <div className="text-xs text-[#ffb6d9]/60 font-serif text-center px-4">
              {isUploading ? 'Processing...' : 'Click to upload cover'}
            </div>
            <div className="text-xs text-zinc-700 font-mono">
              JPG, PNG, GIF, or MP4
            </div>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/webm"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Info text */}
      <div className="text-xs text-zinc-700 font-serif space-y-1">
        <p>• Images: JPG, PNG (static)</p>
        <p>• Animated: GIF or short video (max 10s)</p>
        <p>• Max file size: 5MB</p>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-400 font-serif"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
