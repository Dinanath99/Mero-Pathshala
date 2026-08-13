import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Folder,
  FolderPlus,
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  FileArchive,
  HardDrive,
  Usb,
  Trash2,
  Search,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  LayoutGrid,
  List,
  RotateCw,
  Copy,
  Scissors,
  ClipboardPaste,
  CheckCircle2,
  Info,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface SimulatedItem {
  id: string;
  name: string;
  type: "folder" | "file";
  extension?: string;
  size?: string;
  updatedAt: string;
  parentId: string; // 'root-c', 'root-d', 'usb', 'documents', 'downloads', 'trash', etc.
  iconType: "folder" | "word" | "excel" | "image" | "pdf" | "zip" | "text";
}

const INITIAL_ITEMS: SimulatedItem[] = [
  // C: Drive (System)
  { id: "c-win", name: "Windows", type: "folder", updatedAt: "2026-01-10", parentId: "root-c", iconType: "folder" },
  { id: "c-prog", name: "Program Files", type: "folder", updatedAt: "2026-01-15", parentId: "root-c", iconType: "folder" },
  { id: "c-users", name: "Users", type: "folder", updatedAt: "2026-01-20", parentId: "root-c", iconType: "folder" },

  // Documents
  { id: "doc-loksewa", name: "LokSewa_Documents", type: "folder", updatedAt: "2026-02-01", parentId: "documents", iconType: "folder" },
  { id: "doc-cv", name: "Dinanath_CV_2026.pdf", type: "file", extension: "pdf", size: "245 KB", updatedAt: "2026-02-05", parentId: "documents", iconType: "pdf" },
  { id: "doc-notes", name: "Computer_Notes.docx", type: "file", extension: "docx", size: "48 KB", updatedAt: "2026-02-08", parentId: "documents", iconType: "word" },
  { id: "doc-budget", name: "Monthly_Family_Budget.xlsx", type: "file", extension: "xlsx", size: "32 KB", updatedAt: "2026-02-09", parentId: "documents", iconType: "excel" },

  // Inside LokSewa_Documents
  { id: "lok-cit", name: "Nagrikta_Scanned_Copy.pdf", type: "file", extension: "pdf", size: "1.2 MB", updatedAt: "2026-02-01", parentId: "doc-loksewa", iconType: "pdf" },
  { id: "lok-photo", name: "PP_Passport_Photo.jpg", type: "file", extension: "jpg", size: "850 KB", updatedAt: "2026-02-01", parentId: "doc-loksewa", iconType: "image" },
  { id: "lok-cert", name: "SLC_Transcript.pdf", type: "file", extension: "pdf", size: "2.1 MB", updatedAt: "2026-02-02", parentId: "doc-loksewa", iconType: "pdf" },

  // Downloads
  { id: "down-chrome", name: "ChromeSetup.exe", type: "file", extension: "exe", size: "1.8 MB", updatedAt: "2026-02-07", parentId: "downloads", iconType: "text" },
  { id: "down-zip", name: "Project_Assets_Final.zip", type: "file", extension: "zip", size: "14.2 MB", updatedAt: "2026-02-09", parentId: "downloads", iconType: "zip" },
  { id: "down-form", name: "Passport_Application_Form.pdf", type: "file", extension: "pdf", size: "410 KB", updatedAt: "2026-02-08", parentId: "downloads", iconType: "pdf" },

  // Pictures
  { id: "pic-family", name: "Pokhara_Tour_2026.jpg", type: "file", extension: "jpg", size: "3.4 MB", updatedAt: "2026-01-25", parentId: "pictures", iconType: "image" },
  { id: "pic-dashain", name: "Dashain_Celebration.png", type: "file", extension: "png", size: "4.1 MB", updatedAt: "2025-10-22", parentId: "pictures", iconType: "image" },

  // USB Drive (External E:)
  { id: "usb-backup", name: "Office_Backup_Feb.zip", type: "file", extension: "zip", size: "85 MB", updatedAt: "2026-02-03", parentId: "usb", iconType: "zip" },
  { id: "usb-song", name: "Resham_Firiri_Audio.mp3", type: "file", extension: "mp3", size: "6.2 MB", updatedAt: "2026-01-12", parentId: "usb", iconType: "text" },
];

export const FileExplorerSimulator: React.FC<{ onActionComplete?: () => void }> = ({ onActionComplete }) => {
  const [items, setItems] = useState<SimulatedItem[]>(INITIAL_ITEMS);
  const [currentFolderId, setCurrentFolderId] = useState<string>("documents");
  const [folderHistory, setFolderHistory] = useState<string[]>(["documents"]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [clipboardItem, setClipboardItem] = useState<{ id: string; action: "copy" | "cut" } | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("Click any folder to open, or use toolbar to create a new folder.");

  // Navigation labels
  const getFolderTitle = (id: string): { en: string; ne: string } => {
    switch (id) {
      case "root-c":
        return { en: "Local Disk (C:)", ne: "सी ड्राइभ (सिस्टम)" };
      case "root-d":
        return { en: "Data Disk (D:)", ne: "डी ड्राइभ (व्यक्तिगत डेटा)" };
      case "usb":
        return { en: "SanDisk USB Drive (E:)", ne: "पेनड्राइभ (बाहिरी स्टोरेज)" };
      case "documents":
        return { en: "Documents", ne: "कागजातहरू (Documents)" };
      case "downloads":
        return { en: "Downloads", ne: "डाउनलोडहरू (Downloads)" };
      case "pictures":
        return { en: "Pictures", ne: "तस्बिरहरू (Pictures)" };
      case "trash":
        return { en: "Recycle Bin", ne: "रद्दीको टोकरी (Recycle Bin)" };
      case "doc-loksewa":
        return { en: "LokSewa_Documents", ne: "लोकसेवा कागजात" };
      default:
        const found = items.find((i) => i.id === id);
        return found ? { en: found.name, ne: found.name } : { en: "Folder", ne: "फोल्डर" };
    }
  };

  const navigateTo = (newFolderId: string) => {
    if (newFolderId === currentFolderId) return;
    const newHistory = folderHistory.slice(0, historyIndex + 1);
    newHistory.push(newFolderId);
    setFolderHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(newFolderId);
    setSelectedItemId(null);
    setSearchQuery("");
    setFeedbackMessage(`Opened ${getFolderTitle(newFolderId).en}`);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = folderHistory[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentFolderId(prev);
      setSelectedItemId(null);
    }
  };

  const goForward = () => {
    if (historyIndex < folderHistory.length - 1) {
      const next = folderHistory[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentFolderId(next);
      setSelectedItemId(null);
    }
  };

  const goUp = () => {
    if (currentFolderId === "doc-loksewa") {
      navigateTo("documents");
    } else if (currentFolderId === "documents" || currentFolderId === "downloads" || currentFolderId === "pictures") {
      navigateTo("root-c");
    }
  };

  // Actions
  const handleCreateFolder = () => {
    const folderCount = items.filter((i) => i.parentId === currentFolderId && i.type === "folder").length;
    const newFolder: SimulatedItem = {
      id: `folder-${Date.now()}`,
      name: `New Folder ${folderCount > 0 ? `(${folderCount + 1})` : ""}`.trim(),
      type: "folder",
      updatedAt: new Date().toISOString().split("T")[0],
      parentId: currentFolderId,
      iconType: "folder",
    };
    setItems((prev) => [...prev, newFolder]);
    setSelectedItemId(newFolder.id);
    setFeedbackMessage(`Created new folder "${newFolder.name}". Press F2 to rename!`);
    onActionComplete?.();
  };

  const handleDeleteItem = () => {
    if (!selectedItemId) {
      setFeedbackMessage("Please select a file or folder first to delete.");
      return;
    }
    const item = items.find((i) => i.id === selectedItemId);
    if (!item) return;

    if (currentFolderId === "trash") {
      // Permanent delete from trash
      setItems((prev) => prev.filter((i) => i.id !== selectedItemId));
      setFeedbackMessage(`Permanently erased "${item.name}".`);
    } else {
      // Move to recycle bin
      setItems((prev) =>
        prev.map((i) => (i.id === selectedItemId ? { ...i, parentId: "trash" } : i))
      );
      setFeedbackMessage(`Moved "${item.name}" to Recycle Bin. You can restore it anytime.`);
    }
    setSelectedItemId(null);
    onActionComplete?.();
  };

  const handleCopy = () => {
    if (!selectedItemId) {
      setFeedbackMessage("Select an item to copy.");
      return;
    }
    const item = items.find((i) => i.id === selectedItemId);
    setClipboardItem({ id: selectedItemId, action: "copy" });
    setFeedbackMessage(`Copied "${item?.name}" to clipboard (Ctrl + C). Now go to target folder and click Paste.`);
  };

  const handleCut = () => {
    if (!selectedItemId) {
      setFeedbackMessage("Select an item to move (cut).");
      return;
    }
    const item = items.find((i) => i.id === selectedItemId);
    setClipboardItem({ id: selectedItemId, action: "cut" });
    setFeedbackMessage(`Cut "${item?.name}" (Ctrl + X). Now go to target folder and click Paste.`);
  };

  const handlePaste = () => {
    if (!clipboardItem) {
      setFeedbackMessage("Clipboard is empty. Copy or Cut an item first.");
      return;
    }
    const sourceItem = items.find((i) => i.id === clipboardItem.id);
    if (!sourceItem) return;

    if (clipboardItem.action === "cut") {
      setItems((prev) =>
        prev.map((i) => (i.id === clipboardItem.id ? { ...i, parentId: currentFolderId } : i))
      );
      setFeedbackMessage(`Moved "${sourceItem.name}" to ${getFolderTitle(currentFolderId).en}.`);
      setClipboardItem(null);
    } else {
      // Duplicate
      const copyItem: SimulatedItem = {
        ...sourceItem,
        id: `copy-${Date.now()}`,
        name: `Copy_of_${sourceItem.name}`,
        parentId: currentFolderId,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setItems((prev) => [...prev, copyItem]);
      setFeedbackMessage(`Pasted duplicate of "${sourceItem.name}".`);
    }
    onActionComplete?.();
  };

  const handleRename = () => {
    if (!selectedItemId) {
      setFeedbackMessage("Select an item to rename.");
      return;
    }
    const item = items.find((i) => i.id === selectedItemId);
    if (!item) return;

    const newName = window.prompt("Enter new file/folder name:", item.name);
    if (newName && newName.trim() !== "") {
      // Check invalid characters
      const invalidChars = /[\/\\:*?"<>|]/;
      if (invalidChars.test(newName)) {
        alert("A file name cannot contain any of the following characters: \\ / : * ? \" < > |");
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.id === selectedItemId ? { ...i, name: newName.trim() } : i))
      );
      setFeedbackMessage(`Renamed to "${newName.trim()}".`);
      onActionComplete?.();
    }
  };

  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    setCurrentFolderId("documents");
    setFolderHistory(["documents"]);
    setHistoryIndex(0);
    setSelectedItemId(null);
    setClipboardItem(null);
    setFeedbackMessage("File Explorer reset to initial demonstration state.");
  };

  // Filter items in active folder
  const currentItems = items.filter((i) => {
    if (i.parentId !== currentFolderId) return false;
    if (searchQuery.trim() === "") return true;
    return i.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getItemIcon = (iconType: string, isFolder: boolean) => {
    if (isFolder) return <Folder className="text-amber-500 fill-amber-500/30 shrink-0" size={viewMode === "grid" ? 38 : 20} />;
    switch (iconType) {
      case "pdf":
        return <FileText className="text-red-500 shrink-0" size={viewMode === "grid" ? 36 : 20} />;
      case "word":
        return <FileText className="text-blue-500 shrink-0" size={viewMode === "grid" ? 36 : 20} />;
      case "excel":
        return <FileSpreadsheet className="text-emerald-500 shrink-0" size={viewMode === "grid" ? 36 : 20} />;
      case "image":
        return <ImageIcon className="text-purple-500 shrink-0" size={viewMode === "grid" ? 36 : 20} />;
      case "zip":
        return <FileArchive className="text-yellow-600 shrink-0" size={viewMode === "grid" ? 36 : 20} />;
      default:
        return <FileText className="text-gray-500 shrink-0" size={viewMode === "grid" ? 36 : 20} />;
    }
  };

  return (
    <Card className="border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
            <HardDrive size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500 text-white font-extrabold text-[10px] px-2 py-0.5">
                INTERACTIVE LAB
              </Badge>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                File Explorer Simulator (फाइल एक्सप्लोरर अभ्यास)
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-nepali">
              फोल्डर खोल्ने, नयाँ फोल्डर बनाउने, फाइल कपी/पेस्ट गर्ने र नाम फेर्ने अभ्यास गर्नुहोस्।
            </p>
          </div>
        </div>

        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="rounded-full text-xs font-bold border-slate-700 hover:bg-slate-800 text-slate-200"
        >
          <RotateCw size={12} className="mr-1" /> Reset Simulator
        </Button>
      </div>

      {/* Action Toolbar */}
      <div className="p-3 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            onClick={handleCreateFolder}
            size="sm"
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-8"
          >
            <FolderPlus size={14} className="mr-1" /> New Folder (Ctrl+Shift+N)
          </Button>

          <Button
            onClick={handleCopy}
            disabled={!selectedItemId}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs h-8 font-bold"
          >
            <Copy size={13} className="mr-1" /> Copy (Ctrl+C)
          </Button>

          <Button
            onClick={handleCut}
            disabled={!selectedItemId}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs h-8 font-bold"
          >
            <Scissors size={13} className="mr-1" /> Cut (Ctrl+X)
          </Button>

          <Button
            onClick={handlePaste}
            disabled={!clipboardItem}
            variant="outline"
            size="sm"
            className={`rounded-xl text-xs h-8 font-bold ${
              clipboardItem ? "border-orange-500 text-orange-600 animate-pulse" : ""
            }`}
          >
            <ClipboardPaste size={13} className="mr-1" /> Paste (Ctrl+V)
          </Button>

          <Button
            onClick={handleRename}
            disabled={!selectedItemId}
            variant="outline"
            size="sm"
            className="rounded-xl text-xs h-8 font-bold"
          >
            Rename (F2)
          </Button>

          <Button
            onClick={handleDeleteItem}
            disabled={!selectedItemId}
            variant="destructive"
            size="sm"
            className="rounded-xl text-xs h-8 font-bold"
          >
            <Trash2 size={13} className="mr-1" /> Delete
          </Button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-400"}`}
            title="Grid View"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-400"}`}
            title="List View"
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Navigation Address Bar & Search */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        {/* Breadcrumb path */}
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-1">
          <Button
            onClick={goBack}
            disabled={historyIndex <= 0}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-lg text-gray-500"
          >
            <ArrowLeft size={14} />
          </Button>
          <Button
            onClick={goForward}
            disabled={historyIndex >= folderHistory.length - 1}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-lg text-gray-500"
          >
            <ArrowRight size={14} />
          </Button>
          <Button
            onClick={goUp}
            disabled={currentFolderId === "root-c" || currentFolderId === "root-d" || currentFolderId === "usb"}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-lg text-gray-500"
            title="Go up one folder"
          >
            <ArrowUp size={14} />
          </Button>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-[11px] text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-slate-700">
            <HardDrive size={13} className="text-orange-500" />
            <span>This PC</span>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="font-bold text-orange-600 dark:text-orange-400">
              {getFolderTitle(currentFolderId).en}
            </span>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-60">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${getFolderTitle(currentFolderId).en}...`}
            className="pl-8 h-8 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Main Explorer Workspace (Sidebar + Files Area) */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[380px]">
        {/* Left Sidebar (Quick Access & Drives) */}
        <div className="md:col-span-1 p-3 bg-slate-50/80 dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 space-y-4 text-xs font-semibold">
          {/* Quick Access */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-2 block">
              Quick Access (द्रुत पहुँच)
            </span>

            <button
              onClick={() => navigateTo("documents")}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "documents"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Folder size={16} className={currentFolderId === "documents" ? "text-white" : "text-amber-500"} />
                <span>Documents</span>
              </div>
              <Badge variant="secondary" className="text-[9px] px-1 py-0">
                {items.filter((i) => i.parentId === "documents").length}
              </Badge>
            </button>

            <button
              onClick={() => navigateTo("downloads")}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "downloads"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Folder size={16} className={currentFolderId === "downloads" ? "text-white" : "text-blue-500"} />
                <span>Downloads</span>
              </div>
              <Badge variant="secondary" className="text-[9px] px-1 py-0">
                {items.filter((i) => i.parentId === "downloads").length}
              </Badge>
            </button>

            <button
              onClick={() => navigateTo("pictures")}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "pictures"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className={currentFolderId === "pictures" ? "text-white" : "text-purple-500"} />
                <span>Pictures</span>
              </div>
              <Badge variant="secondary" className="text-[9px] px-1 py-0">
                {items.filter((i) => i.parentId === "pictures").length}
              </Badge>
            </button>
          </div>

          {/* Drives / Devices */}
          <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-2 block">
              This PC (ड्राइभहरू)
            </span>

            <button
              onClick={() => navigateTo("root-c")}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "root-c"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <HardDrive size={16} className={currentFolderId === "root-c" ? "text-white" : "text-blue-500"} />
              <div>
                <span className="block">Local Disk (C:)</span>
                <span className="text-[10px] opacity-75 font-normal">Windows System</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo("root-d")}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "root-d"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <HardDrive size={16} className={currentFolderId === "root-d" ? "text-white" : "text-emerald-500"} />
              <div>
                <span className="block">Data Disk (D:)</span>
                <span className="text-[10px] opacity-75 font-normal">Personal Files</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo("usb")}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "usb"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <Usb size={16} className={currentFolderId === "usb" ? "text-white" : "text-yellow-500"} />
              <div>
                <span className="block">SanDisk USB (E:)</span>
                <span className="text-[10px] opacity-75 font-normal">Removable Drive</span>
              </div>
            </button>

            <button
              onClick={() => navigateTo("trash")}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors ${
                currentFolderId === "trash"
                  ? "bg-orange-500 text-white font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Trash2 size={16} className={currentFolderId === "trash" ? "text-white" : "text-red-500"} />
                <span>Recycle Bin</span>
              </div>
              <Badge variant="destructive" className="text-[9px] px-1 py-0">
                {items.filter((i) => i.parentId === "trash").length}
              </Badge>
            </button>
          </div>
        </div>

        {/* Right Content Area (Files & Folders) */}
        <div className="md:col-span-3 p-4 bg-white dark:bg-slate-900 overflow-y-auto max-h-[420px]">
          {currentItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
                <Folder size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  This folder is currently empty
                </h4>
                <p className="text-xs text-gray-400 font-nepali">
                  यहाँ कुनै फाइल छैन। माथिको "+ New Folder" थिचेर नयाँ फोल्डर बनाउनुहोस्।
                </p>
              </div>
              <Button onClick={handleCreateFolder} size="sm" className="rounded-full bg-orange-500 text-white text-xs font-bold">
                <FolderPlus size={14} className="mr-1" /> Create First Folder
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {currentItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                const isCut = clipboardItem?.id === item.id && clipboardItem.action === "cut";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    onDoubleClick={() => {
                      if (item.type === "folder") {
                        navigateTo(item.id);
                      } else {
                        setFeedbackMessage(`Opening "${item.name}" with default application.`);
                      }
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30 shadow-md ring-2 ring-orange-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-orange-300 dark:hover:border-slate-700"
                    } ${isCut ? "opacity-40 border-dashed" : ""}`}
                  >
                    <div className="my-2">{getItemIcon(item.iconType, item.type === "folder")}</div>
                    <div className="w-full space-y-0.5">
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate block w-full">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-gray-400 block">
                        {item.type === "folder" ? "Folder" : item.size}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-1">
              <div className="grid grid-cols-12 px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <span className="col-span-6">Name</span>
                <span className="col-span-3">Date Modified</span>
                <span className="col-span-3 text-right">Size</span>
              </div>

              {currentItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                const isCut = clipboardItem?.id === item.id && clipboardItem.action === "cut";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    onDoubleClick={() => {
                      if (item.type === "folder") navigateTo(item.id);
                    }}
                    className={`grid grid-cols-12 items-center px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-orange-500 text-white font-bold"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200"
                    } ${isCut ? "opacity-40" : ""}`}
                  >
                    <div className="col-span-6 flex items-center gap-2 truncate">
                      {getItemIcon(item.iconType, item.type === "folder")}
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="col-span-3 text-[11px] opacity-75">{item.updatedAt}</span>
                    <span className="col-span-3 text-[11px] text-right opacity-75">
                      {item.type === "folder" ? "—" : item.size}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Simulator Bottom Status Feedback Bar */}
      <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-orange-400 shrink-0" />
          <span className="font-semibold text-slate-200">{feedbackMessage}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>{currentItems.length} items</span>
          <span>•</span>
          <span>{selectedItemId ? "1 item selected" : "No selection"}</span>
        </div>
      </div>
    </Card>
  );
};

export default FileExplorerSimulator;
