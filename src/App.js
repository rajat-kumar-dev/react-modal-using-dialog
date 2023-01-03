import { useState } from 'react';
import Modal from './components/modal/Modal';
import './App.css';
const App = () => {
  const [modalOpen, setModalOpen] = useState(false); //state for modal to open or close
  const [lockModal, setLockModal] = useState(false); //lock modal for not to close/cancle on escape
  function open() {
    setModalOpen(true);
  }
  function close() {
    setModalOpen(false);
  }
  return (
    <div>
      <button onClick={open}>OPEN Modal</button>
      <button onClick={() => setLockModal(!lockModal)}>
        {lockModal ? 'Unlock' : 'Lock'}
      </button>
      <Modal
        open={modalOpen}
        onClose={close}
        className="myModal"
        locked={lockModal}
      >
        <div>
          <button onClick={close}>close</button>
          <button onClick={() => setLockModal(!lockModal)}>
            {lockModal ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
