import { ApiResponse, Email, EmailSummary, AttachmentSummary } from "@/types/email";

const API_BASE_URL = "https://api.barid.site";

export async function getSupportedDomains(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/domains`);
  const data: ApiResponse<string[]> = await response.json();
  
  if (!data.success || !data.result) {
    throw new Error("Failed to fetch supported domains");
  }
  
  return data.result;
}

export async function getEmails(
  emailAddress: string,
  limit: number = 10,
  offset: number = 0
): Promise<EmailSummary[]> {
  const response = await fetch(
    `${API_BASE_URL}/emails/${emailAddress}?limit=${limit}&offset=${offset}`
  );
  const data: ApiResponse<EmailSummary[]> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || "Failed to fetch emails");
  }
  
  return data.result || [];
}

export async function getEmailCount(emailAddress: string): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/emails/count/${emailAddress}`);
  const data: ApiResponse<{ count: number }> = await response.json();
  
  if (!data.success || !data.result) {
    throw new Error("Failed to fetch email count");
  }
  
  return data.result.count;
}

export async function getEmailById(emailId: string): Promise<Email> {
  const response = await fetch(`${API_BASE_URL}/inbox/${emailId}`);
  const data: ApiResponse<Email> = await response.json();
  
  if (!data.success || !data.result) {
    throw new Error(data.error?.message || "Failed to fetch email");
  }
  
  return data.result;
}

export async function deleteEmail(emailId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/inbox/${emailId}`, {
    method: "DELETE",
  });
  const data: ApiResponse<{ message: string }> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || "Failed to delete email");
  }
}

export async function deleteAllEmails(emailAddress: string): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/emails/${emailAddress}`, {
    method: "DELETE",
  });
  const data: ApiResponse<{ message: string; deleted_count: number }> = await response.json();
  
  if (!data.success || !data.result) {
    throw new Error("Failed to delete emails");
  }
  
  return data.result.deleted_count;
}

export async function getEmailAttachments(emailId: string): Promise<AttachmentSummary[]> {
  const response = await fetch(`${API_BASE_URL}/inbox/${emailId}/attachments`);
  const data: ApiResponse<AttachmentSummary[]> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || "Failed to fetch attachments");
  }
  
  return data.result || [];
}

export function getAttachmentDownloadUrl(attachmentId: string): string {
  return `${API_BASE_URL}/attachments/${attachmentId}`;
}

export async function deleteAttachment(attachmentId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/attachments/${attachmentId}`, {
    method: "DELETE",
  });
  const data: ApiResponse<{ message: string }> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error?.message || "Failed to delete attachment");
  }
}
