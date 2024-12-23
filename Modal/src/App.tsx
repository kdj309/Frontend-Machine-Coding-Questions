import { useState } from 'react'
import './App.css'
import Modal from './components/Modal';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal=()=>{
    setIsVisible((prev)=>!prev)
  }
  const closeModal=()=>{
    setIsVisible(false)
  }


  return (
    <>
      <button className='modal-toggle-btn' onClick={toggleModal}>{isVisible?'Hide ':'Show '}Modal</button>
      <Modal title='custom modal' isVisible={isVisible} onClose={closeModal}>
        <div>This Modal Content</div>
      </Modal>
    </>
  )
}

export default App
