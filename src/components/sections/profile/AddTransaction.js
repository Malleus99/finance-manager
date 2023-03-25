import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { db } from 'fb-init';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import Modal from 'components/UI/Modal';
import classes from './AddTransaction.module.css';
import generateRandomID from 'helpers/RandomId';

const AddTransaction = ({ onClose }) => {
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  const auth = getAuth();
  const docRef = doc(db, 'users', auth.currentUser.uid);

  const [icon, setIcon] = useState('😀');
  const itemRef = useRef();
  const typeRef = useRef();
  const amountRef = useRef();

  const addTransactionHandler = async () => {
    await updateDoc(docRef, {
      transactions: arrayUnion({
        id: generateRandomID(),
        icon: icon, //READY
        item: itemRef.current.value,
        type: typeRef.current.value,
        amount: parseInt(amountRef.current.value),
      }),
    });
  };

  const emojiDisplayHandler = () => {
    setDisplayEmojiPicker(!displayEmojiPicker);
  };

  useEffect(() => {
    setDisplayEmojiPicker(false);
  }, [icon]);

  const emojiSelectHandler = (e) => {
    setIcon(e.native);
  };

  return (
    <Modal onClose={onClose}>
      <div className={classes.overlay}>
        <span>Add Transaction</span>
        <div className={classes.inputFields}>
          <div className={classes.inputContainer} onClick={emojiDisplayHandler}>
            <div className={classes.inputName}>Select Icon</div>
            <div>{icon}</div>
          </div>
          <div className={classes.inputContainer}>
            <div className={classes.inputName}>Item Name</div>
            <input type='text' ref={itemRef} />
          </div>
          <div className={classes.inputContainer}>
            <div className={classes.inputName}>Item Type</div>
            <input type='text' ref={typeRef} />
          </div>
          <div className={classes.inputContainer}>
            <div className={classes.inputName}>Amount</div>
            <input type='number' ref={amountRef} />
          </div>
        </div>
        <button onClick={addTransactionHandler}>SUBMIT</button>
      </div>
      {displayEmojiPicker && (
        <Picker data={data} onEmojiSelect={emojiSelectHandler} />
      )}
    </Modal>
  );
};

export default AddTransaction;
