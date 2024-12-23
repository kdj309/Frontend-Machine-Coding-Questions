import { useState } from "react";
import { commentwithreplies } from "../hooks/useComments";

export default function Comment({
  comment,
  onDelete,
  onAddReply,
  onEdit,
}: {
  comment: commentwithreplies;
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
  onAddReply: (id: number, content: string) => void;
}) {
  const { content, votes, timestamp, replies } = comment;
  const [showReplies, setshowReplies] = useState<boolean>(false);
  const [enableEdit, setenableEdit] = useState<boolean>(false);
  const [commentText, setcommentText] = useState<string>(content);
  const [replyText, setReplyText] = useState<string>("");

  return (
    <div className="comment-card">
      {!enableEdit ? (
        <h3>{content}</h3>
      ) : (
        <div className="comment-reply">
          <textarea
            value={commentText}
            rows={4}
            placeholder="Add Comment"
            onChange={(e) => setcommentText(e.target.value)}
          ></textarea>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <button
              type="button"
              onClick={() => {
                onEdit(comment.id, commentText);
                setenableEdit(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setenableEdit(false)} type="button">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <p>Votes:{votes}</p>
        <p>{new Date(timestamp).toLocaleDateString()}</p>
      </div>
      <div className="comment-button-container">
        <button>👍</button>
        <button>👎</button>
        <button onClick={() => setshowReplies((prev) => !prev)}>
          {showReplies ? "Hide Replies" : "Show Replies"}
        </button>
        <button onClick={() => setenableEdit((prev) => !prev)}>Edit</button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
      {showReplies && (
        <div className="comment-reply">
          <textarea
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add Relpy"
          ></textarea>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <button
              type="button"
              onClick={() => {
                onAddReply(comment.id, replyText);
                setReplyText("");
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
      {replies.length > 0 && showReplies && (
        <div className="comment-replies">
          {replies.map((c) => (
            <Comment
              onAddReply={onAddReply}
              onEdit={onEdit}
              onDelete={onDelete}
              key={c.id}
              comment={c}
            ></Comment>
          ))}
        </div>
      )}
    </div>
  );
}
