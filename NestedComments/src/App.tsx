import CommentInput from "./components/CommentInput"
import './App.css'
import useComments from "./hooks/useComments"
import Comment from "./components/Comment"
function App() {
const {comments,deleteComment,updateComment,addNewComment,addReply}=useComments()
  return (
    <>
      <h3>Nested Comments</h3>
      <CommentInput addNewComment={addNewComment}/>
      {comments.map((c)=><Comment onAddReply={addReply} onEdit={updateComment} onDelete={deleteComment} key={c.id} comment={c}></Comment>)}
    </>
  )
}

export default App
