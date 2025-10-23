"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw, Mail } from "lucide-react";
import { getSupportedDomains } from "@/lib/api";

interface EmailGeneratorProps {
  onEmailGenerated: (email: string) => void;
  currentEmail?: string;
}

export function EmailGenerator({ onEmailGenerated, currentEmail }: EmailGeneratorProps) {
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = async () => {
    try {
      const supportedDomains = await getSupportedDomains();
      setDomains(supportedDomains);
      if (supportedDomains.length > 0) {
        const randomIndex = Math.floor(Math.random() * supportedDomains.length);
        setSelectedDomain(supportedDomains[randomIndex]);
      }
    } catch (error) {
      console.error("Failed to load domains:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateRandomUsername = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleGenerate = () => {
    const newUsername = generateRandomUsername();
    setUsername(newUsername);
    const email = `${newUsername}@${selectedDomain}`;
    onEmailGenerated(email);
  };

  const handleCopy = async () => {
    if (currentEmail) {
      await navigator.clipboard.writeText(currentEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fullEmail = username ? `${username}@${selectedDomain}` : currentEmail || "";

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Generate Email Address</CardTitle>
            <CardDescription className="text-xs">Create a temporary disposable email</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 flex-1"
          />
          <span className="text-muted-foreground font-mono text-sm">@</span>
          <Select
            value={selectedDomain}
            onValueChange={setSelectedDomain}
            disabled={loading}
          >
            <SelectTrigger className="h-10 w-[180px]">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerate}
          className="w-full h-10"
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Generate
        </Button>

        {fullEmail && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md border">
            <code className="flex-1 text-sm font-mono truncate">
              {fullEmail}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-8 shrink-0"
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
