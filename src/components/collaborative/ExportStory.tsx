import React, { useState } from 'react';
import { CollaborativeProject } from '../../types/collaborativeStory';
import { Modal } from '../shared/Modal';

interface ExportStoryProps {
  project: CollaborativeProject;
  isOpen: boolean;
  onClose: () => void;
}

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const ExportStory: React.FC<ExportStoryProps> = ({ project, isOpen, onClose }) => {
  const [format, setFormat] = useState<'markdown' | 'pdf' | 'epub' | 'txt'>('markdown');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeContributors, setIncludeContributors] = useState(true);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      let content = '';
      const metadata = `
# ${project.title}

${project.description || ''}

**Genre:** ${project.genre}
**Status:** ${project.status}
**Created:** ${project.createdAt instanceof Date ? project.createdAt.toLocaleDateString() : 'Unknown'}

${includeContributors ? `
## Contributors

${project.coAuthors.map(a => `- ${a.displayName} (${a.role})`).join('\n')}
` : ''}

---

`;

      switch (format) {
        case 'markdown':
          content = (includeMetadata ? metadata : '') + (project.currentContent || '');
          downloadFile(content, `${project.title}.md`, 'text/markdown');
          break;

        case 'txt':
          content = (includeMetadata ? metadata.replace(/[#*-]/g, '') : '') + (project.currentContent || '');
          downloadFile(content, `${project.title}.txt`, 'text/plain');
          break;

        case 'pdf':
          // In a real implementation, you'd use a library like jsPDF
          alert('PDF export coming soon! Use Markdown for now and convert with Pandoc.');
          break;

        case 'epub':
          // In a real implementation, you'd use a library like epub-gen
          alert('EPUB export coming soon! Use Markdown for now and convert with Calibre.');
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Story" size="md">
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-stone-300 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['markdown', 'txt', 'pdf', 'epub'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  format === f
                    ? 'border-lime-500 bg-lime-500/10'
                    : 'border-stone-700 bg-stone-800/50 hover:border-stone-600'
                }`}
              >
                <div className="text-2xl mb-2 font-mono font-bold text-stone-400">
                  {f === 'markdown' && 'MD'}
                  {f === 'txt' && 'TXT'}
                  {f === 'pdf' && 'PDF'}
                  {f === 'epub' && 'EPUB'}
                </div>
                <div className="font-medium text-stone-200 uppercase">{f}</div>
                <div className="text-xs text-stone-500 mt-1">
                  {f === 'markdown' && 'Best for editing'}
                  {f === 'txt' && 'Plain text'}
                  {f === 'pdf' && 'Print ready'}
                  {f === 'epub' && 'E-readers'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-stone-800/50 rounded-lg border border-stone-700 cursor-pointer hover:border-stone-600 transition-colors">
            <input
              type="checkbox"
              checked={includeMetadata}
              onChange={(e) => setIncludeMetadata(e.target.checked)}
              className="w-4 h-4 rounded border-stone-600 text-lime-500 focus:ring-lime-500"
            />
            <div className="flex-1">
              <div className="font-medium text-stone-200">Include Metadata</div>
              <div className="text-sm text-stone-500">Title, description, genre, dates</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-stone-800/50 rounded-lg border border-stone-700 cursor-pointer hover:border-stone-600 transition-colors">
            <input
              type="checkbox"
              checked={includeContributors}
              onChange={(e) => setIncludeContributors(e.target.checked)}
              className="w-4 h-4 rounded border-stone-600 text-lime-500 focus:ring-lime-500"
            />
            <div className="flex-1">
              <div className="font-medium text-stone-200">Include Contributors</div>
              <div className="text-sm text-stone-500">List all co-authors and their roles</div>
            </div>
          </label>
        </div>

        {/* Preview */}
        <div className="p-4 bg-stone-900/50 rounded-lg border border-stone-700">
          <div className="text-sm text-stone-400 mb-2">Preview</div>
          <div className="text-xs text-stone-500 space-y-1">
            <div>File: {project.title}.{format}</div>
            <div>Words: {project.currentContent?.split(/\s+/).filter(Boolean).length || 0}</div>
            <div>Contributors: {project.coAuthors.length}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-lime-500 hover:bg-lime-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-900 rounded-lg font-medium transition-colors"
          >
            <Download className="w-5 h-5" />
            {exporting ? 'Exporting...' : 'Export Story'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Note */}
        {(format === 'pdf' || format === 'epub') && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="text-sm text-amber-400">
              <strong>Note:</strong> {format.toUpperCase()} export requires additional processing. 
              Export as Markdown and use tools like Pandoc or Calibre to convert.
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
