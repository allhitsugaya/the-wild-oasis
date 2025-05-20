import React, { createContext, useState } from 'react';
import Button from '../../ui/Button.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';
import Modal from '../../ui/Modal.jsx';




function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin'>
          <Button variation="primary" size='medium'>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin'>
          <CreateCabinForm/>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button variation='primary' size='medium' onClick={()=> setIsOpenModal((isOpenModal)=> !isOpenModal)}>Add new cabin</Button>
//       {isOpenModal && <Modal onClose={()=> setIsOpenModal(false)}>
//         <CreateCabinForm onClose={()=> setIsOpenModal(false)}/>
//       </Modal>}</div>
//   );
// }

