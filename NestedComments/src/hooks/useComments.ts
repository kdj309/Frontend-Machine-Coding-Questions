import { useCallback, useState } from "react";
import commentdata from "../data/comments.json";
export interface comment {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
}
export interface commentwithreplies extends comment {
  replies: commentwithreplies[];
}
const initialComment = {
  id: Date.now(),
  votes: 0,
  timestamp: new Date().toLocaleDateString(),
  replies: [],
};
export default function useComments() {
  const [comments, setComments] = useState<commentwithreplies[]>(commentdata);

  const addNewComment = useCallback((content: string) => {
    const withContent = { ...initialComment, content };
    setComments((prev) => [...prev, withContent]);
  }, []);

  const deleteComment = useCallback(
    (id: number) => {
      function deletCommentHelper(
        commentsData: commentwithreplies[],
        commentid: number
      ) {
        const copy = [...commentsData];
        const filteredComments: commentwithreplies[] = copy
          .filter((c) => c.id != commentid)
          .map((c) => ({
            ...c,
            replies: deletCommentHelper(c.replies, commentid),
          }));
        return filteredComments;
      }
      setComments(deletCommentHelper(comments, id));
    },
    [comments.length]
  );

  const updateComment = useCallback(
    (id: number, newContent: string) => {
      function updateCommentHelper(
        commentsData: commentwithreplies[],
        commentid: number,
        newContentdata: string
      ) {
        const copy = [...commentsData];

        const filteredComments: commentwithreplies[] = copy.map((c) => {
          if (c.id === commentid) {
            return {
              ...c,
              content: newContentdata,
            };
          } else {
            return {
              ...c,
              replies: updateCommentHelper(
                c.replies,
                commentid,
                newContentdata
              ),
            };
          }
        });
        return filteredComments;
      }
      setComments(updateCommentHelper(comments, id, newContent));
    },
    [comments.length]
  );

  const addReply = useCallback(
    (id: number, replycontent: string) => {
      function addReplyHelper(
        commentsData: commentwithreplies[],
        commentid: number
      ) {
        const copy = [...commentsData];

        const filteredComments: commentwithreplies[] = copy.map((c) => {
          if (c.id === commentid) {
            return {
              ...c,
              replies: c.replies.concat([
                { ...initialComment, content: replycontent },
              ]),
            };
          } else {
            return {
              ...c,
              replies: addReplyHelper(c.replies, commentid),
            };
          }
        });
        return filteredComments;
      }
      setComments(addReplyHelper(comments, id));
    },
    [comments]
  );

  return {
    comments,
    addNewComment,
    deleteComment,
    updateComment,
    addReply,
  };
}
