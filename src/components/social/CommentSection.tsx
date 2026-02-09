"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Comment {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  content: string;
  parent_id?: string | null;
  created_at: string;
}

interface CommentSectionProps {
  targetType: "challenge" | "submission";
  targetId: string;
  comments: Comment[];
  userId?: string;
  userName?: string;
  userAvatar?: string;
  onPostComment?: (content: string, parentId?: string) => Promise<void>;
}

function formatTimeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function CommentItem({
  comment,
  replies,
  userId,
  onReply,
  depth = 0,
}: {
  comment: Comment;
  replies: Comment[];
  userId?: string;
  onReply: (parentId: string) => void;
  depth?: number;
}) {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div
      className={cn("group", depth > 0 && "ml-8 border-l-2 border-border pl-4")}
    >
      <div className="flex gap-3 py-2">
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-xs font-bold text-primary shrink-0">
          {comment.user_avatar ? (
            <img
              src={comment.user_avatar}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            comment.user_name?.charAt(0)?.toUpperCase() || "?"
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-foreground">
              {comment.user_name}
            </span>
            <span className="text-muted-foreground">
              {formatTimeAgo(comment.created_at)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
            {comment.content}
          </p>
          <div className="flex items-center gap-3 mt-1">
            {userId && (
              <button
                onClick={() => onReply(comment.id)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Reply
              </button>
            )}
            {replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
              >
                {showReplies ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      <AnimatePresence>
        {showReplies &&
          replies.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CommentItem
                comment={reply}
                replies={[]}
                userId={userId}
                onReply={onReply}
                depth={depth + 1}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export function CommentSection({
  comments,
  userId,
  userName,
  onPostComment,
}: CommentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  // Separate top-level comments from replies
  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesMap: Record<string, Comment[]> = {};
  comments
    .filter((c) => c.parent_id)
    .forEach((c) => {
      if (!repliesMap[c.parent_id!]) repliesMap[c.parent_id!] = [];
      repliesMap[c.parent_id!].push(c);
    });

  const handlePost = async () => {
    if (!newComment.trim() || !onPostComment) return;
    setIsPosting(true);
    try {
      await onPostComment(newComment.trim(), replyingTo || undefined);
      setNewComment("");
      setReplyingTo(null);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Toggle header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="font-medium">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1 overflow-hidden"
          >
            {/* Comment list */}
            {topLevel.length === 0 && (
              <p className="text-sm text-muted-foreground py-3 text-center">
                No comments yet. Be the first!
              </p>
            )}
            {topLevel.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={repliesMap[comment.id] || []}
                userId={userId}
                onReply={(parentId) => {
                  setReplyingTo(parentId);
                }}
              />
            ))}

            {/* New comment input */}
            {userId && onPostComment && (
              <div className="pt-3 border-t border-border">
                {replyingTo && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-primary">
                    <span>
                      Replying to{" "}
                      {comments.find((c) => c.id === replyingTo)?.user_name}
                    </span>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {userName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handlePost();
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={handlePost}
                      disabled={!newComment.trim() || isPosting}
                      className="px-2.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
