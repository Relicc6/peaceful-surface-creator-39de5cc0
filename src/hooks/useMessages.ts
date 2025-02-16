
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/types/message";
import { useAuth } from "@/contexts/AuthContext";

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("application_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setMessages(
        data.map((msg): Message => ({
          id: msg.id,
          applicationId: msg.application_id,
          senderId: msg.sender_id,
          senderType: msg.sender_id === user?.id ? "learner" : "employer",
          content: msg.content,
          timestamp: new Date(msg.created_at),
          readAt: msg.read_at ? new Date(msg.read_at) : undefined,
          reactions: Array.isArray(msg.reactions) ? msg.reactions.map(r => {
            const reaction = r as { emoji: string; count: number };
            return {
              emoji: reaction.emoji,
              count: reaction.count
            };
          }) : [],
          isEdited: msg.is_edited || false,
          editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined,
          threadId: msg.thread_id || undefined,
          isPinned: msg.is_pinned || false,
          attachments: Array.isArray(msg.attachments) ? msg.attachments.map(a => {
            const attachment = a as { name: string; url: string; type: string };
            return {
              name: attachment.name,
              url: attachment.url,
              type: attachment.type
            };
          }) : [],
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactionAdd = async (messageId: string, emoji: string) => {
    try {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;

      const existingReactions = message.reactions || [];
      const existingReaction = existingReactions.find((r) => r.emoji === emoji);
      
      let newReactions;
      if (existingReaction) {
        newReactions = existingReactions.map((r) =>
          r.emoji === emoji ? { ...r, count: r.count + 1 } : r
        );
      } else {
        newReactions = [...existingReactions, { emoji, count: 1 }];
      }

      const { error } = await supabase
        .from("messages")
        .update({ reactions: newReactions })
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, reactions: newReactions } : m
        )
      );
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !user) return;

    try {
      const { data: application } = await supabase
        .from("applications")
        .select("employer_id")
        .eq("id", conversationId)
        .single();

      if (!application) throw new Error("Application not found");

      const { error } = await supabase.from("messages").insert({
        content,
        application_id: conversationId,
        sender_id: user.id,
        recipient_id: application.employer_id,
        reactions: [],
        is_edited: false,
        is_pinned: false,
        attachments: [],
      });

      if (error) throw error;
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      const channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `application_id=eq.${conversationId}`,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const newMessage: Message = {
                id: payload.new.id,
                applicationId: payload.new.application_id,
                senderId: payload.new.sender_id,
                senderType: payload.new.sender_id === user?.id ? "learner" : "employer",
                content: payload.new.content,
                timestamp: new Date(payload.new.created_at),
                readAt: payload.new.read_at ? new Date(payload.new.read_at) : undefined,
                reactions: Array.isArray(payload.new.reactions) ? payload.new.reactions.map(r => ({
                  emoji: (r as any).emoji,
                  count: (r as any).count
                })) : [],
                isEdited: payload.new.is_edited || false,
                editedAt: payload.new.edited_at ? new Date(payload.new.edited_at) : undefined,
                threadId: payload.new.thread_id || undefined,
                isPinned: payload.new.is_pinned || false,
                attachments: Array.isArray(payload.new.attachments) ? payload.new.attachments.map(a => ({
                  name: (a as any).name,
                  url: (a as any).url,
                  type: (a as any).type
                })) : [],
              };
              setMessages((prev) => [...prev, newMessage]);
            } else if (payload.eventType === "UPDATE") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === payload.new.id
                    ? {
                        ...msg,
                        reactions: Array.isArray(payload.new.reactions) ? payload.new.reactions.map(r => ({
                          emoji: (r as any).emoji,
                          count: (r as any).count
                        })) : [],
                      }
                    : msg
                )
              );
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId, user?.id]);

  return {
    messages,
    isLoading,
    sendMessage,
    handleReactionAdd,
  };
};
