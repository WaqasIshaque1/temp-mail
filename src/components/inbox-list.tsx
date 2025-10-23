"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox, RefreshCw, Trash2, Paperclip, ChevronRight } from "lucide-react";
import { getEmails, deleteAllEmails } from "@/lib/api";
import { EmailSummary } from "@/types/email";

interface InboxListProps {
  emailAddress: string;
  onEmailSelect: (emailId: string) => void;
  selectedEmailId?: string;
  refreshTrigger?: number;
}

export function InboxList({ emailAddress, onEmailSelect, selectedEmailId, refreshTrigger }: InboxListProps) {
  const [emails, setEmails] = useState<EmailSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (emailAddress) {
      loadEmails();
    }
  }, [emailAddress, refreshTrigger]);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    if (!emailAddress) return;

    const interval = setInterval(() => {
      loadEmails();
    }, 5000);

    return () => clearInterval(interval);
  }, [emailAddress]);

  const loadEmails = async () => {
    setLoading(true);
    try {
      const fetchedEmails = await getEmails(emailAddress, 50);
      setEmails(fetchedEmails);
    } catch (error) {
      console.error("Failed to load emails:", error);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all emails?")) return;
    
    setDeleting(true);
    try {
      await deleteAllEmails(emailAddress);
      setEmails([]);
    } catch (error) {
      console.error("Failed to delete emails:", error);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Inbox className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Inbox</CardTitle>
              <CardDescription className="text-xs">
                {emails.length} {emails.length === 1 ? "message" : "messages"}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={loadEmails}
              disabled={loading || !emailAddress}
              className="h-8 w-8"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDeleteAll}
              disabled={deleting || emails.length === 0}
              className="h-8 w-8"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          ) : !emailAddress ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <Inbox className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm font-medium">Generate an email first</p>
              <p className="text-xs mt-1">Create a temporary email to start</p>
            </div>
          ) : emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <Inbox className="h-12 w-12 mb-3 opacity-20" />
              <p className="text-sm font-medium">No emails yet</p>
              <p className="text-xs mt-1">Messages will appear here</p>
            </div>
          ) : (
            <div className="divide-y">
              {emails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => onEmailSelect(email.id)}
                  className={`w-full text-left p-4 transition-colors group relative ${
                    selectedEmailId === email.id 
                      ? "bg-accent" 
                      : "bg-muted/30 hover:bg-accent/50"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-sm truncate flex-1">
                        {email.subject || "(No subject)"}
                      </p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {email.has_attachments && email.attachment_count && email.attachment_count > 0 && (
                          <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground truncate flex-1">
                        {email.from_address}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(email.received_at)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
