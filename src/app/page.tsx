"use client";

import { useState } from "react";
import { EmailGenerator } from "@/components/email-generator";
import { InboxList } from "@/components/inbox-list";
import { EmailViewer } from "@/components/email-viewer";
import { ThemeSelector } from "@/components/theme-selector";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Github } from "lucide-react";

export default function Home() {
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEmailGenerated = (email: string) => {
    setCurrentEmail(email);
    setSelectedEmailId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEmailDeleted = () => {
    setSelectedEmailId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">TempMail</h1>
              <a
                href="https://www.linkedin.com/in/waqas-ishaque"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                Developed by Waqas Ishaque
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/WaqasIshaque1/temp-mail"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 h-9 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">GitHub</span>
            </a>
            <ThemeSelector />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <section className="mb-8">
          <EmailGenerator
            onEmailGenerated={handleEmailGenerated}
            currentEmail={currentEmail}
          />
        </section>

        <section className="grid lg:grid-cols-[400px_1fr] gap-6">
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <InboxList
              emailAddress={currentEmail}
              onEmailSelect={setSelectedEmailId}
              selectedEmailId={selectedEmailId || undefined}
              refreshTrigger={refreshTrigger}
            />
          </aside>
          <div className="min-h-[600px]">
            <EmailViewer
              emailId={selectedEmailId}
              onEmailDeleted={handleEmailDeleted}
            />
          </div>
        </section>
      </main>

      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About TempMail</CardTitle>
              <CardDescription>
                Your privacy-focused temporary email solution
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                TempMail provides you with a temporary, anonymous, free, disposable email address. 
                Protect your personal email from spam, advertising mailings, and malware by using 
                a temporary email address. No registration required - just generate and use!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Everything you need to know about TempMail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a temporary email?</AccordionTrigger>
                  <AccordionContent>
                    A temporary email is a disposable email address that you can use to receive emails 
                    without revealing your real email address. It's perfect for signing up for services, 
                    testing, or any situation where you don't want to use your personal email.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How long do emails last?</AccordionTrigger>
                  <AccordionContent>
                    Emails are stored temporarily and will be automatically deleted after a certain period. 
                    We recommend downloading any important information before it expires. The service is 
                    designed for temporary use only.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it really free?</AccordionTrigger>
                  <AccordionContent>
                    Yes! TempMail is completely free to use. No registration, no hidden fees, no credit 
                    card required. Just generate an email address and start receiving emails instantly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I send emails?</AccordionTrigger>
                  <AccordionContent>
                    Currently, TempMail only supports receiving emails. You cannot send emails from your 
                    temporary address. This is a receive-only service designed to protect your privacy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    Your privacy is our priority. We don't store any personal information, and all emails 
                    are temporary. However, remember that temporary emails are not suitable for sensitive 
                    communications. Use them only for non-critical purposes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-6 py-6">
          <p className="text-sm text-center text-muted-foreground">
            Powered by{" "}
            <a
              href="https://api.barid.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              Barid API
            </a>
            {" • "}
            <a
              href="https://github.com/WaqasIshaque1/temp-mail"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              Open Source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
