import { useState, useMemo, useRef, useEffect } from 'react';
import { initialMockConversations } from '../../features/ai-assistant/data/aiMockData';
import { generateMockResponse } from '../../features/ai-assistant/services/mockAIService';
import { useChatScroll } from '../../features/ai-assistant/hooks/useChatScroll';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import {
  AIChatHeader,
  ConversationSidebar,
  ChatMessage,
  ChatInput,
  AIWelcomeState,
  TypingIndicator,
  MessageErrorState,
  AIContextIndicator,
  AIModeSelector,
} from '../../features/ai-assistant/components';
import { Button } from '../../components/ui/Button';

// Types
import type { Conversation, ChatMessage as ChatMessageType, AIMode } from '../../features/ai-assistant/types/ai.types';

export default function AIAssistantPage() {
  const [conversations, setConversations] = useState<Conversation[]>(() => initialMockConversations());
  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    const list = initialMockConversations();
    return list.length > 0 ? list[0].id : null;
  });
  
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AIMode>('general');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Custom dialogs for confirmations
  const [showClearModal, setShowClearModal] = useState(false);
  
  // Error simulation state
  const [errorPrompt, setErrorPrompt] = useState<string | null>(null);

  // References to handle stop-generation timeouts and scrolling
  const responseTimeoutRef = useRef<number | null>(null);
  
  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  const messages = activeConversation ? activeConversation.messages : [];
  
  // Custom scroll ref that smooth-scrolls when messages list length changes
  const bottomRef = useChatScroll(messages.length + (isGenerating ? 1 : 0) + (errorPrompt ? 1 : 0));

  // Stop Generation sequence
  const handleStopGeneration = () => {
    if (responseTimeoutRef.current) {
      window.clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
    setIsGenerating(false);
    setErrorPrompt(null);
  };

  // Clean up timeouts on component unmount
  useEffect(() => {
    return () => {
      if (responseTimeoutRef.current) {
        window.clearTimeout(responseTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = (textToSend = input) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isGenerating) return;

    let activeId = activeConversationId;
    
    // Auto-create new conversation container if none is active
    if (!activeId) {
      activeId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: activeId,
        title: trimmed.slice(0, 24) + (trimmed.length > 24 ? '...' : ''),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(activeId);
    }

    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      conversationId: activeId,
      role: 'user',
      content: trimmed,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'complete',
    };

    // Update conversation arrays immutably
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          const isNew = c.title === 'New Chat' || c.messages.length === 0;
          return {
            ...c,
            title: isNew ? trimmed.slice(0, 24) + (trimmed.length > 24 ? '...' : '') : c.title,
            updatedAt: new Date().toISOString(),
            messages: [...c.messages, userMessage],
          };
        }
        return c;
      })
    );

    setInput('');
    setErrorPrompt(null);
    setIsGenerating(true);

    // Simulate error triggers if users prompt explicitly contains "error"
    if (trimmed.toLowerCase().includes('error')) {
      responseTimeoutRef.current = window.setTimeout(() => {
        setIsGenerating(false);
        setErrorPrompt(trimmed);
      }, 1500);
      return;
    }

    // Generate mock AI response
    responseTimeoutRef.current = window.setTimeout(async () => {
      try {
        const responseText = await generateMockResponse(trimmed, selectedMode);
        
        const assistantMessage: ChatMessageType = {
          id: `msg-${Date.now()}`,
          conversationId: activeId!,
          role: 'assistant',
          content: responseText,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'complete',
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === activeId) {
              return {
                ...c,
                updatedAt: new Date().toISOString(),
                messages: [...c.messages, assistantMessage],
              };
            }
            return c;
          })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsGenerating(false);
      }
    }, 1800);
  };

  const handleRegenerate = (msgId: string) => {
    // Locate parent prompt: find user message immediately preceding msgId
    if (!activeConversation) return;
    const msgIdx = activeConversation.messages.findIndex((m) => m.id === msgId);
    if (msgIdx <= 0) return;
    
    const prevUserMessage = activeConversation.messages[msgIdx - 1];
    if (prevUserMessage && prevUserMessage.role === 'user') {
      // Remove all messages following this query
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConversationId) {
            return {
              ...c,
              messages: c.messages.slice(0, msgIdx),
            };
          }
          return c;
        })
      );
      handleSend(prevUserMessage.content);
    }
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setErrorPrompt(null);
    setInput('');
    setIsGenerating(false);
  };

  const handleNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    setErrorPrompt(null);
    setInput('');
    setIsGenerating(false);
    setMobileSidebarOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
  };

  const handleConfirmClearChat = () => {
    if (activeConversationId) {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConversationId) {
            return { ...c, messages: [] };
          }
          return c;
        })
      );
    }
    setErrorPrompt(null);
    setShowClearModal(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-50 dark:bg-slate-950 relative">
      
      {/* 1. Sidebar - Desktop View */}
      <div className="hidden lg:block w-72 shrink-0 h-full">
        <ConversationSidebar
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={handleSelectConversation}
          onDelete={handleDeleteConversation}
          onNewChat={handleNewChat}
        />
      </div>

      {/* 2. Sidebar - Mobile Drawer View */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 max-w-[80vw] h-full shadow-2xl z-50 flex flex-col bg-slate-950"
            >
              <ConversationSidebar
                conversations={conversations}
                activeId={activeConversationId}
                onSelect={handleSelectConversation}
                onDelete={handleDeleteConversation}
                onNewChat={handleNewChat}
                onCloseMobileDrawer={() => setMobileSidebarOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Main Chat Workspace Panel */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        
        {/* Header toolbar */}
        <AIChatHeader
          onNewChat={handleNewChat}
          onClearConversation={() => setShowClearModal(true)}
          onToggleSidebar={() => setMobileSidebarOpen((p) => !p)}
        />

        {/* Scrollable Conversation area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col">
          {messages.length === 0 ? (
            <AIWelcomeState onSelectPrompt={(p) => handleSend(p)} />
          ) : (
            <div className="flex-grow">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onRegenerate={handleRegenerate}
                  isGenerating={isGenerating}
                />
              ))}

              {/* Typing bounce dots */}
              {isGenerating && <TypingIndicator />}

              {/* Error messages simulations */}
              {errorPrompt && (
                <MessageErrorState
                  promptText={errorPrompt}
                  onRetry={() => handleSend(errorPrompt)}
                />
              )}

              {/* Anchor block to scroll bottom target */}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Footer controls & prompt triggers */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3.5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between max-w-4xl mx-auto w-full">
            <AIModeSelector
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              disabled={isGenerating}
            />
            <AIContextIndicator />
          </div>

          <div className="max-w-4xl mx-auto w-full">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => handleSend()}
              onStop={handleStopGeneration}
              isGenerating={isGenerating}
            />
          </div>
        </div>

      </div>

      {/* 4. Custom Accessible Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearModal(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-left z-50"
            >
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                Clear Conversation
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 leading-relaxed">
                Are you sure you want to delete all messages in this conversation? This operation cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearModal(false)}
                  className="border-slate-200 dark:border-slate-800 h-8 px-4 rounded-xl text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConfirmClearChat}
                  className="bg-error-600 hover:bg-error-700 text-white h-8 px-4 rounded-xl text-xs font-bold"
                >
                  Clear Chat
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
