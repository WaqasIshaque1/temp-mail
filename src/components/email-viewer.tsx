"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Trash2, Download, Paperclip } from "lucide-react";
import { getEmailById, deleteEmail, getEmailAttachments } from "@/lib/api";
import { Email, AttachmentSummary } from "@/types/email";
import { AttachmentsViewer } from "@/components/attachments-viewer";

interface EmailViewerProps {
  emailId: string | null;
  onEmailDeleted: () => void;
}

export function EmailViewer({ emailId, onEmailDeleted }: EmailViewerProps) {
  const [email, setEmail] = useState<Email | null>(null);
  const [attachments, setAttachments] = useState<AttachmentSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (emailId) {
      loadEmail();
      loadAttachments();
    } else {
      setEmail(null);
      setAttachments([]);
    }
  }, [emailId]);

  const loadEmail = async () => {
    if (!emailId) return;
    
    setLoading(true);
    try {
      const fetchedEmail = await getEmailById(emailId);
      setEmail(fetchedEmail);
    } catch (error) {
      console.error("Failed to load email:", error);
      setEmail(null);
    } finally {
      setLoading(false);
    }
  };

  const loadAttachments = async () => {
    if (!emailId) return;
    
    try {
      const fetchedAttachments = await getEmailAttachments(emailId);
      setAttachments(fetchedAttachments);
    } catch (error) {
      console.error("Failed to load attachments:", error);
      setAttachments([]);
    }
  };

  const handleDelete = async () => {
    if (!emailId || !confirm("Are you sure you want to delete this email?")) return;
    
    setDeleting(true);
    try {
      await deleteEmail(emailId);
      onEmailDeleted();
    } catch (error) {
      console.error("Failed to delete email:", error);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (!emailId) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">Select an email</p>
          <p className="text-xs mt-1">Choose a message to view</p>
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!email) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Failed to load email</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-1">
            <CardTitle className="text-base truncate">{email.subject || "(No subject)"}</CardTitle>
            <div className="space-y-0.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="font-medium min-w-[40px]">From:</span>
                <span className="truncate">{email.from_address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium min-w-[40px]">To:</span>
                <span className="truncate">{email.to_address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium min-w-[40px]">Date:</span>
                <span>{formatDate(email.received_at)}</span>
              </div>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleting}
            className="h-8 w-8 shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        {email.has_attachments && attachments.length > 0 && (
          <Badge variant="secondary" className="text-[10px] h-5 w-fit">
            <Paperclip className="h-2.5 w-2.5 mr-1" />
            {attachments.length} {attachments.length === 1 ? "attachment" : "attachments"}
          </Badge>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="html" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4">
            <TabsTrigger value="html" className="text-xs">HTML</TabsTrigger>
            <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
            {attachments.length > 0 && (
              <TabsTrigger value="attachments" className="text-xs">
                Files ({attachments.length})
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="html" className="flex-1 m-0 p-4">
            <ScrollArea className="h-[calc(100vh-28rem)]">
              {email.html_content ? (
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: email.html_content }}
                />
              ) : (
                <p className="text-sm text-muted-foreground">No HTML content</p>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="text" className="flex-1 m-0 p-4">
            <ScrollArea className="h-[calc(100vh-28rem)]">
              {email.text_content ? (
                <pre className="whitespace-pre-wrap text-xs">
                  {email.text_content}
                </pre>
              ) : (
                <p className="text-sm text-muted-foreground">No text content</p>
              )}
            </ScrollArea>
          </TabsContent>
          
          {attachments.length > 0 && (
            <TabsContent value="attachments" className="flex-1 m-0 p-4">
              <AttachmentsViewer 
                attachments={attachments} 
                onAttachmentDeleted={loadAttachments}
              />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
