import { doc, getDoc, updateDoc } from 'firebase/firestore';

import classes from './Goal.module.css';
import { useRef, useState } from 'react';
import { auth, db } from 'fb-init';

const Goal = ({ data }) => {
  const { id, icon, item, type, currentAmount, fullAmount } = data;
  const [selectingPlus, setSelectingPlus] = useState(false);
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const inputNumberRef = useRef();

  // Styling goals fields
  const fillerStyle = { width: `${(currentAmount / fullAmount) * 100}%` };

  const capItem = item.charAt(0).toUpperCase() + item.slice(1);
  const capType = type.charAt(0).toUpperCase() + type.slice(1);
  // END

  const selectPlusHandler = () => {
    setSelectingPlus(true);
  };

  const deselectingPlusHandler = (e) => {
    if (e.target.form?.tagName === 'FORM' || !selectingPlus) {
      return;
    }
    setSelectingPlus(false);
  };

  const goalIncrementHandler = async (e) => {
    e.preventDefault();
    if (fullAmount - currentAmount < +inputNumberRef.current.value) {
      return console.log('Exceeded');
    }
    try {
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        throw new Error('Document does not exist');
      }
      const goals = docSnapshot.data().goals;
      const goalIndex = goals.findIndex((goal) => goal.id === id);
      goals[goalIndex].currentAmount += parseInt(inputNumberRef.current.value);
      await updateDoc(docRef, { goals });
    } catch (error) {
      console.error(error);
    } finally {
      setSelectingPlus(false);
    }
  };

  const addGoalAmount = selectingPlus ? (
    <form onSubmit={goalIncrementHandler} className={classes.numberForm}>
      <input
        ref={inputNumberRef}
        className={classes.inputNumber}
        type='number'
        required
      />
      <button className={classes.submitNumber} type='submit'>
        +
      </button>
    </form>
  ) : (
    <div className={classes.addAmount} onClick={selectPlusHandler}>
      +
    </div>
  );

  return (
    <div className={classes.container} id={id} onClick={deselectingPlusHandler}>
      <div className={classes.pictureCtn}>
        <span className={classes.picture}>{icon}</span>
      </div>
      <div className={classes.infoCtn}>
        <div className={classes.category}>
          <span className={classes.catName}>{capItem}</span>
          <span className={classes.catType}>{capType}</span>
        </div>
        <div>
          <div className={classes.priceGoal}>
            <div className={classes.currentPrice}>
              <span>${Number(currentAmount).toFixed(2)}</span>
              {addGoalAmount}
            </div>
            <span className={classes.finalPrice}>
              ${Number(fullAmount).toFixed(2)}
            </span>
          </div>
          <div className={classes.completion}>
            <div className={classes.filler} style={fillerStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;
