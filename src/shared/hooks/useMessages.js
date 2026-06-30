import { useState, useEffect, useCallback, useRef } from "react";
import * as contactService from "../services/contact.service";

const POLL_INTERVAL = 30_000; // poll every 30 seconds

// Request browser notification permission once
const requestNotificationPermission = async () => {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

const fireNotification = (count) => {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  new Notification("Timothy CMS — New Message", {
    body: `You have ${count} new message${count > 1 ? "s" : ""} from a client.`,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "new-message", // replaces previous notification instead of stacking
  });
};

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track the message count from the LAST poll so we can
  // detect genuinely NEW arrivals without alerting on mount
  const prevCountRef = useRef(null);
  const isMountedRef = useRef(true);

  // ─── GET ALL MESSAGES ────────────────────────────────────────────
  const fetchMessages = useCallback(async ({ silent = false } = {}) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      // contactService.getMessages() already returns the array directly
      const data = await contactService.getMessages();
      const incoming = Array.isArray(data) ? data : [];

      if (!isMountedRef.current) return;

      setMessages(incoming);

      // ── New-message notification logic ──
      // prevCountRef.current is null only on the very first fetch
      // so we never fire a notification on initial page load
      if (prevCountRef.current !== null) {
        const prevUnread = prevCountRef.current;
        const newUnread = incoming.filter((m) => !m.read).length;

        if (newUnread > prevUnread) {
          fireNotification(newUnread - prevUnread);
        }
      }

      // Update the ref AFTER comparison
      prevCountRef.current = incoming.filter((m) => !m.read).length;
    } catch (err) {
      if (!isMountedRef.current) return;
      const message = err.response?.data?.message || "Failed to fetch messages";
      setError(message);
      console.error("[useMessages] GET /contact:", message);
    } finally {
      if (!isMountedRef.current) return;
      if (!silent) setLoading(false);
    }
  }, []);

  // ─── INITIAL LOAD + NOTIFICATION PERMISSION ──────────────────────
  useEffect(() => {
    isMountedRef.current = true;
    requestNotificationPermission();
    fetchMessages();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchMessages]);

  // ─── BACKGROUND POLLING ──────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      // silent = true keeps loading spinner from flickering during polls
      fetchMessages({ silent: true });
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  // ─── MARK AS READ ─────────────────────────────────────────────────
  const markAsRead = async (id) => {
    // Optimistic update — flip immediately in UI
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, read: true } : m))
    );
    // Keep prevCountRef in sync so the next poll doesn't miscount
    prevCountRef.current = Math.max(0, (prevCountRef.current ?? 1) - 1);

    try {
      await contactService.markAsRead(id);
    } catch (err) {
      // Rollback on failure
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: false } : m))
      );
      prevCountRef.current = (prevCountRef.current ?? 0) + 1;
      console.error("[useMessages] PATCH /contact/:id/read:", err.response?.data?.message);
      throw err;
    }
  };

  // ─── DELETE MESSAGE ──────────────────────────────────────────────
  const deleteMessage = async (id) => {
    // Snapshot for rollback
    const snapshot = messages;

    // Optimistic remove
    setMessages((prev) => prev.filter((m) => m._id !== id));

    try {
      await contactService.deleteMessage(id);
    } catch (err) {
      // Rollback on failure
      setMessages(snapshot);
      console.error("[useMessages] DELETE /contact/:id:", err.response?.data?.message);
      throw err;
    }
  };

  // ─── DERIVED STATE ────────────────────────────────────────────────
  const unreadCount = messages.filter((m) => !m.read).length;

  return {
    messages,
    loading,
    error,
    unreadCount,
    markAsRead,
    deleteMessage,
    refetch: fetchMessages,
  };
};