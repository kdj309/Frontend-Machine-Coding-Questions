import { useState } from "react";

export default function CommentInput({
  addNewComment,
}: {
  addNewComment: (content: string) => void;
}) {
  const [content, setContent] = useState<string>("");
  return (
    <div className="comment-wrapper">
      <textarea
        value={content}
        name=""
        id=""
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="New Comment"
      ></textarea>
      <button
        type="button"
        onClick={() => {
          addNewComment(content);
          setContent("");
        }}
      >
        submit
      </button>
    </div>
  );
}
