
import './App.css'
import { ExplorerItem } from './components/ExplorerItem'
import useExplorer from './hooks/useExplorer'

function App() {
  const{fileExplorer,addItem,deleteItem,updateItem}=useExplorer()

  return (
    <>
      {fileExplorer!=null&&<ExplorerItem item={fileExplorer} addItem={addItem} deleteItem={deleteItem} editItem={updateItem}></ExplorerItem>}
      
    </>
  )
}

export default App
