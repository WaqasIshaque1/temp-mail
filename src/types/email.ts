export interface EmailSummary {
  id: string;
  from_address: string;
  to_address: string;
  subject: string | null;
  received_at: number;
  has_attachments?: boolean;
  attachment_count?: number;
}

export interface Email {
  id: string;
  from_address: string;
  to_address: string;
  subject: string | null;
  received_at: number;
  html_content: string | null;
  text_content: string | null;
  has_attachments?: boolean;
  attachment_count?: number;
}

export interface AttachmentSummary {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  created_at: number;
}

export interface ApiResponse<T> {
  success: boolean;
  result?: T;
  error?: {
    name: string;
    message: string;
  };
  note?: {
    supported_domains?: string[];
  };
}
