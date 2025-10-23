"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Trash2, FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react";
import { getAttachmentDownloadUrl, deleteAttachment } from "@/lib/api";
import { AttachmentSummary } from "@/types/email";

interface AttachmentsViewerProps {
  attachments: AttachmentSummary[];
  onAttachmentDeleted: () => void;
}

export function AttachmentsViewer({ attachments, onAttachmentDeleted }: AttachmentsViewerProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDownload = (attachmentId: string, filename: string) => {
    const url = getAttachmentDownloadUrl(attachmentId);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (attachmentId: string) => {
    if (!confirm("Are you sure you want to delete this attachment?")) return;
    
    setDeletingId(attachmentId);
    try {
      await deleteAttachment(attachmentId);
      onAttachmentDeleted();
    } catch (error) {
      console.error("Failed to delete attachment:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (contentType: string) => {
    if (contentType.startsWith("image/")) return FileImage;
    if (contentType.startsWith("video/")) return FileVideo;
    if (contentType.startsWith("audio/")) return FileAudio;
    if (contentType.startsWith("text/") || contentType.includes("pdf")) return FileText;
    return File;
  };

  const getFileTypeLabel = (contentType: string): string => {
    const parts = contentType.split("/");
    if (parts.length > 1) {
      return parts[1].toUpperCase();
    }
    return contentType.toUpperCase();
  };

  if (attachments.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p className="text-sm">No attachments</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-28rem)]">
      <div className="space-y-2">
        {attachments.map((attachment) => {
          const FileIcon = getFileIcon(attachment.content_type);
          
          return (
            <div 
              key={attachment.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                  <FileIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{attachment.filename}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="text-[10px] h-4">
                    {getFileTypeLabel(attachment.content_type)}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {formatFileSize(attachment.size)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDownload(attachment.id, attachment.filename)}
                  className="h-8 w-8"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(attachment.id)}
                  disabled={deletingId === attachment.id}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
