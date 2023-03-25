import { useEffect, useState, useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { db } from 'fb-init';
import Modal from 'components/UI/Modal';
import classes from './AddGoal.module.css';
import generateRandomID from 'helpers/RandomId';

const AddGoal = ({ onClose }) => {
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  const auth = getAuth();
  const docRef = doc(db, 'users', auth.currentUser.uid);

  const [icon, setIcon] = useState('😀');
  const itemRef = useRef();
  const typeRef = useRef();
  const currentAmountRef = useRef();
  const fullAmountRef = useRef();

  const addGoalHandler = async () => {
    await updateDoc(docRef, {
      goals: arrayUnion({
        id: generateRandomID(),
        icon: icon,
        item: itemRef.current.value,
        type: typeRef.current.value,
        currentAmount: parseInt(currentAmountRef.current.value),
        fullAmount: parseInt(fullAmountRef.current.value),
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
        <span>Add Goal</span>
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
            <div className={classes.inputName}>Current Amount</div>
            <input type='number' ref={currentAmountRef} />
          </div>
          <div className={classes.inputContainer}>
            <div className={classes.inputName}>Full Amount</div>
            <input type='number' ref={fullAmountRef} />
          </div>
        </div>
        <button onClick={addGoalHandler}>SUBMIT</button>
      </div>
      {displayEmojiPicker && (
        <Picker data={data} onEmojiSelect={emojiSelectHandler} />
      )}
    </Modal>
  );
};

export default AddGoal;
