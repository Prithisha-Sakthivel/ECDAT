import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FolderArchive, 
  GitBranch, 
  FileCode, 
  Check, 
  AlertTriangle, 
  Trash2, 
  File, 
  HardDrive, 
  ExternalLink,
  ShieldCheck,
  Binary
} from 'lucide-react';
import { discoveryService, UploadedSource } from '../../services/discoveryService';

interface AddSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSourceAdded: (source: UploadedSource) => void;
}

type TabType = 'files' | 'zip' | 'github';

export const AddSourceModal: React.FC<AddSourceModalProps> = ({
  isOpen,
  onClose,
  onSourceAdded
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('files');

  // Multi-file state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ZIP state
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isDraggingZip, setIsDraggingZip] = useState(false);
  const zipInputRef = useRef<HTMLInputElement>(null);

  // GitHub state
  const [githubUrl, setGithubUrl] = useState('');
  const [githubBranch, setGithubBranch] = useState('main');

  // Loading & Error states
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Format bytes helper
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // --- Multi-Files Handlers ---
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      setErrorMessage(null);
    }
  };

  const handleFilesDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFiles(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...droppedFiles]);
      setErrorMessage(null);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- ZIP Handlers ---
  const handleZipSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith('.zip')) {
        setErrorMessage('Unsupported archive format. Only .zip files are supported.');
        return;
      }
      setZipFile(file);
      setErrorMessage(null);
    }
  };

  const handleZipDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingZip(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.name.toLowerCase().endsWith('.zip')) {
        setErrorMessage('Unsupported archive format. Only .zip files are supported.');
        return;
      }
      setZipFile(file);
      setErrorMessage(null);
    }
  };

  const clearZip = () => {
    setZipFile(null);
    if (zipInputRef.current) zipInputRef.current.value = '';
  };

  // --- Presets for GitHub ---
  const setGithubPreset = (url: string) => {
    setGithubUrl(url);
    setGithubBranch('main');
    setErrorMessage(null);
  };

  // --- Ingest Execution ---
  const handleIngest = async () => {
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      let source: UploadedSource;

      if (activeTab === 'files') {
        if (selectedFiles.length === 0) {
          throw new Error('Please select at least one source file to scan.');
        }
        source = await discoveryService.processFiles(selectedFiles);
      } else if (activeTab === 'zip') {
        if (!zipFile) {
          throw new Error('Please upload a .zip project archive.');
        }
        source = await discoveryService.processZip(zipFile);
      } else {
        if (!githubUrl.trim()) {
          throw new Error('Please enter a valid GitHub repository URL.');
        }
        source = await discoveryService.processGitHubRepo(githubUrl, githubBranch);
      }

      onSourceAdded(source);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while processing the source.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalFilesSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono">
      <div className="bg-defense-900 border border-defense-700 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-defense-700 bg-defense-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <UploadCloud className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  Add Source for Cryptographic Discovery
                </h2>
                <span className="text-[10px] bg-cyan-950/60 text-cyan-300 border border-cyan-700/40 px-1.5 py-0.5 rounded">
                  STAGE 1 / DISCOVER
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                Upload files, archives, or repositories to detect cryptographic primitives and evaluate quantum risk.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-defense-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Source Mode Tabs */}
        <div className="flex border-b border-defense-700 bg-defense-950/70 px-4 pt-2 gap-2">
          <button
            onClick={() => { setActiveTab('files'); setErrorMessage(null); }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'files'
                ? 'border-cyan-400 text-cyan-300 bg-defense-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Upload Files</span>
            {selectedFiles.length > 0 && (
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded-full">
                {selectedFiles.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('zip'); setErrorMessage(null); }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'zip'
                ? 'border-cyan-400 text-cyan-300 bg-defense-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Upload ZIP / Project</span>
            {zipFile && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full">
                1
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('github'); setErrorMessage(null); }}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'github'
                ? 'border-cyan-400 text-cyan-300 bg-defense-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* TAB 1: Multiple Files */}
          {activeTab === 'files' && (
            <div className="space-y-3">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingFiles(true); }}
                onDragLeave={() => setIsDraggingFiles(false)}
                onDrop={handleFilesDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                  isDraggingFiles
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-defense-700 hover:border-cyan-600/70 bg-defense-950/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFilesSelect}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-defense-800 border border-defense-700 flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    Drag and drop source or binary files here, or <span className="text-cyan-400 underline">browse</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans mt-1">
                    Supports multi-language source, certificates, configuration manifests, and compiled binaries.
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1 mt-1 max-w-md">
                  {['.py', '.java', '.c', '.cpp', '.go', '.js', '.ts', '.rs', '.php', '.pem', '.crt', '.so', '.dll', '.bin'].map(ext => (
                    <span key={ext} className="text-[9px] px-1 py-0.5 rounded bg-defense-800 text-slate-300 border border-defense-700">
                      {ext}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected Files List Preview */}
              {selectedFiles.length > 0 && (
                <div className="border border-defense-700 rounded-sm bg-defense-950/60 p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-defense-700/80 pb-2 text-xs">
                    <span className="font-bold text-slate-200">
                      Selected Files ({selectedFiles.length}) • {formatBytes(totalFilesSize)}
                    </span>
                    <button
                      onClick={clearAllFiles}
                      className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear All</span>
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                    {selectedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 rounded bg-defense-900 border border-defense-700/60 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <File className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="text-slate-200 truncate font-mono text-[11px]">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] text-slate-400">{formatBytes(file.size)}</span>
                          <button
                            onClick={() => removeFile(idx)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Upload ZIP */}
          {activeTab === 'zip' && (
            <div className="space-y-3">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingZip(true); }}
                onDragLeave={() => setIsDraggingZip(false)}
                onDrop={handleZipDrop}
                onClick={() => !zipFile && zipInputRef.current?.click()}
                className={`border-2 border-dashed rounded-sm p-6 text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  zipFile
                    ? 'border-emerald-500/50 bg-emerald-500/5 cursor-default'
                    : isDraggingZip
                    ? 'border-cyan-400 bg-cyan-500/10 cursor-pointer'
                    : 'border-defense-700 hover:border-cyan-600/70 bg-defense-950/40 cursor-pointer'
                }`}
              >
                <input
                  ref={zipInputRef}
                  type="file"
                  accept=".zip"
                  onChange={handleZipSelect}
                  className="hidden"
                />

                {zipFile ? (
                  <div className="w-full space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <FolderArchive className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-300">
                        Archive Loaded: {zipFile.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                        Size: {formatBytes(zipFile.size)} • Ready for in-memory JSZip decomposition
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); zipInputRef.current?.click(); }}
                        className="px-2.5 py-1 text-[11px] rounded bg-defense-800 hover:bg-defense-700 text-slate-200 border border-defense-700"
                      >
                        Replace Archive
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); clearZip(); }}
                        className="px-2.5 py-1 text-[11px] rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-defense-800 border border-defense-700 flex items-center justify-center">
                      <FolderArchive className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        Drag and drop a project <span className="text-cyan-400 font-mono">.zip</span> archive here, or <span className="text-cyan-400 underline">browse</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-1">
                        Extracts entire project directory trees client-side without uploading to third-party clouds.
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-3 rounded bg-defense-950/80 border border-defense-700/60 text-[11px] text-slate-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="font-sans leading-relaxed">
                  <span className="font-bold text-slate-200 font-mono">Client-Side Isolation:</span> All code decompression and regex/AST pattern matching occurs directly within your browser session memory. No proprietary application binaries or source code leave your workstation.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GitHub Repo */}
          {activeTab === 'github' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub Repository URL</span>
                </label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => { setGithubUrl(e.target.value); setErrorMessage(null); }}
                  placeholder="https://github.com/enterprise/auth-service"
                  className="w-full bg-defense-950 border border-defense-700 rounded px-3 py-2 text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400">Target Branch / Tag</label>
                  <input
                    type="text"
                    value={githubBranch}
                    onChange={(e) => setGithubBranch(e.target.value)}
                    placeholder="main"
                    className="w-full bg-defense-950 border border-defense-700 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400">Scan Scope</label>
                  <div className="text-xs text-slate-300 py-1.5">Full Repository Tree</div>
                </div>
              </div>

              {/* Curated Presets */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Or load curated enterprise microservice samples:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Auth Service', url: 'https://github.com/enterprise/auth-service', desc: 'Python • RSA-2048 & TLS' },
                    { name: 'Payment Processor', url: 'https://github.com/gov-payment/payment-gateway', desc: 'Java • AES-128 & PKCS#12' },
                    { name: 'API Gateway', url: 'https://github.com/cloud-gateway/api-proxy', desc: 'Go • ECDSA P-256 & KMS' }
                  ].map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setGithubPreset(preset.url)}
                      className="p-2 rounded bg-defense-950 border border-defense-700/80 hover:border-cyan-500/60 text-left transition-colors"
                    >
                      <div className="text-xs font-bold text-cyan-300">{preset.name}</div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5">{preset.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 rounded bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-defense-700 bg-defense-950 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            {activeTab === 'files' && `${selectedFiles.length} file(s) selected`}
            {activeTab === 'zip' && (zipFile ? zipFile.name : 'No archive selected')}
            {activeTab === 'github' && (githubUrl ? 'Ready to connect' : 'Awaiting URL')}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-3.5 py-1.5 rounded text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-defense-850 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleIngest}
              disabled={
                isProcessing ||
                (activeTab === 'files' && selectedFiles.length === 0) ||
                (activeTab === 'zip' && !zipFile) ||
                (activeTab === 'github' && !githubUrl.trim())
              }
              className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {activeTab === 'files' ? `Ingest ${selectedFiles.length} File(s)` : activeTab === 'zip' ? 'Ingest Project Archive' : 'Connect & Ingest'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
