import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (imageUrl: string, title: string, caption?: string, notes?: string) => Promise<void>;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onAdd }) => {
  const { currentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    setImageFile(file);
    setImageUrl(''); // Clear URL if file is selected

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImageFile = async (file: File): Promise<string> => {
    if (!currentUser) throw new Error('Must be logged in to upload');

    const timestamp = Date.now();
    const filename = `${currentUser.uid}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, `scrapbook/${filename}`);

    setUploadProgress(10);
    await uploadBytes(storageRef, file);
    setUploadProgress(80);
    
    const downloadURL = await getDownloadURL(storageRef);
    setUploadProgress(100);
    
    return downloadURL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (uploadMode === 'file' && !imageFile) {
      alert('Please select an image');
      return;
    }

    if (uploadMode === 'url' && !imageUrl.trim()) {
      alert('Please enter an image URL');
      return;
    }

    setIsAdding(true);
    try {
      let finalImageUrl = imageUrl.trim();

      // Upload file if in file mode
      if (uploadMode === 'file' && imageFile) {
        finalImageUrl = await uploadImageFile(imageFile);
      }

      await onAdd(
        finalImageUrl,
        title.trim(),
        caption.trim() || undefined,
        notes.trim() || undefined
      );
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item: ' + (error as Error).message);
      setIsAdding(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-lg border-2 p-8 my-8"
          style={{
            background: 'linear-gradient(135deg, #1a1410 0%, #2a2420 100%)',
            borderColor: 'rgba(212, 175, 55, 0.3)',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
          }}
        >
          <h2 className="font-serif text-3xl text-amber-100 mb-6" style={{
            fontFamily: '"Brush Script MT", cursive',
          }}>
            Add to Scrapbook
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload mode toggle */}
            <div className="flex gap-2 p-1 rounded-lg" style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(139, 69, 19, 0.3)',
            }}>
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className="flex-1 px-4 py-2 rounded font-serif text-sm transition-all"
                style={{
                  background: uploadMode === 'file' ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                  color: uploadMode === 'file' ? '#fbbf24' : '#999',
                  border: uploadMode === 'file' ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid transparent',
                }}
              >
                📎 Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className="flex-1 px-4 py-2 rounded font-serif text-sm transition-all"
                style={{
                  background: uploadMode === 'url' ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                  color: uploadMode === 'url' ? '#fbbf24' : '#999',
                  border: uploadMode === 'url' ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid transparent',
                }}
              >
                🔗 Image URL
              </button>
            </div>

            {/* File upload */}
            {uploadMode === 'file' && (
              <div>
                <label className="block text-sm font-serif text-amber-600/80 mb-2">
                  Choose Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-8 border-2 border-dashed rounded-lg transition-all hover:border-amber-600/60 group"
                  style={{
                    borderColor: imageFile ? 'rgba(251, 191, 36, 0.4)' : 'rgba(139, 69, 19, 0.3)',
                    background: imageFile ? 'rgba(251, 191, 36, 0.05)' : 'rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded shadow-lg" />
                      <p className="text-xs text-amber-600/70">Click to change image</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-amber-600/70 font-serif mb-1">📷 Click to select image</p>
                      <p className="text-xs text-zinc-600">Max 5MB • JPG, PNG, GIF</p>
                    </div>
                  )}
                </button>
              </div>
            )}

            {/* URL input */}
            {uploadMode === 'url' && (
              <div>
                <label className="block text-sm font-serif text-amber-600/80 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  autoFocus
                  className="w-full px-4 py-2 bg-black/30 border-2 rounded text-amber-100 placeholder-amber-900/50 focus:outline-none transition-all duration-200 font-serif"
                  style={{ borderColor: 'rgba(139, 69, 19, 0.4)' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.4)'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-serif text-amber-600/80 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give it a name..."
                maxLength={200}
                required
                className="w-full px-4 py-2 bg-black/30 border-2 rounded text-amber-100 placeholder-amber-900/50 focus:outline-none transition-all duration-200 font-serif"
                style={{ borderColor: 'rgba(139, 69, 19, 0.4)' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.4)'}
              />
            </div>

            <div>
              <label className="block text-sm font-serif text-amber-600/80 mb-2">
                Caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="A brief note..."
                maxLength={500}
                className="w-full px-4 py-2 bg-black/30 border-2 rounded text-amber-100 placeholder-amber-900/50 focus:outline-none transition-all duration-200 font-serif"
                style={{ borderColor: 'rgba(139, 69, 19, 0.4)' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.4)'}
              />
            </div>

            <div>
              <label className="block text-sm font-serif text-amber-600/80 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Your thoughts and memories..."
                maxLength={2000}
                rows={4}
                className="w-full px-4 py-2 bg-black/30 border-2 rounded text-amber-100 placeholder-amber-900/50 focus:outline-none transition-all duration-200 resize-none font-serif"
                style={{ borderColor: 'rgba(139, 69, 19, 0.4)' }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.4)'}
              />
            </div>

            {/* Upload progress */}
            {isAdding && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                  />
                </div>
                <p className="text-xs text-amber-600/70 text-center font-serif">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                onClick={onClose}
                disabled={isAdding}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 rounded font-serif transition-all duration-200"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(120, 120, 120, 0.3)',
                  color: '#999',
                }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={!title.trim() || (uploadMode === 'file' ? !imageFile : !imageUrl.trim()) || isAdding}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 rounded font-serif transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.2))',
                  border: '2px dashed rgba(251, 191, 36, 0.5)',
                  color: '#fbbf24',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.2)',
                }}
              >
                {isAdding ? (uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Adding...') : '✂ Add to Scrapbook'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
