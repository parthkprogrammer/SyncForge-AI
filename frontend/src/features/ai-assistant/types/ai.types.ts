export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'sending' | 'complete' | 'error';
export type AIMode = 'explain' | 'optimize' | 'debug' | 'interview' | 'general';

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: string; // ISO date string or formatted time
  status: MessageStatus;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface SuggestedPrompt {
  id: string;
  prompt: string;
  label: string;
}
