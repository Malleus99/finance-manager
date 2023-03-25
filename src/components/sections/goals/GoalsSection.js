import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { db } from 'fb-init';
import Goal from './Goal';
import classes from './GoalsSection.module.css';
import AddGoal from './AddGoal';
import PlusSVG from 'helpers/Plus_SVG';

const GoalsSection = () => {
  const [displayAddGoalsOverlay, setDisplayAddGoalsOverlay] = useState(false);
  const [goals, setGoals] = useState([]);

  const auth = getAuth();
  const docRef = doc(db, 'users', auth.currentUser.uid);

  useEffect(() => {
    const getItem = async () => {
      const docSnap = await getDoc(docRef);
      setGoals(docSnap.data().goals);
    };
    getItem();
  }, []);

  const activeGoalsList = goals
    .filter((item) => item.currentAmount < item.fullAmount)
    .map((item) => <Goal data={item} key={item.id} />);
  const reachedGoalsList = goals
    .filter((item) => item.currentAmount === item.fullAmount)
    .map((item) => <Goal data={item} key={item.id} />);

  // ADD GOAL LOGIC
  const showAddGoalsOverlayHandler = () => {
    setDisplayAddGoalsOverlay(true);
  };

  const hideAddGoalsOverlayHandler = () => {
    setDisplayAddGoalsOverlay(false);
  };

  return (
    <>
      <div className={classes.section}>
        <div className={classes.goals}>
          <h2 className={classes.goalsName}>ACTIVE</h2>
          <div onClick={showAddGoalsOverlayHandler}>
            <PlusSVG className={classes.plusSvg} />
          </div>
          <div className={classes.goalsList}>{activeGoalsList}</div>
        </div>
        <div className={classes.goals}>
          <h2 className={classes.goalsName}>REACHED</h2>
          <div className={classes.goalsList}>{reachedGoalsList}</div>
        </div>
      </div>
      {displayAddGoalsOverlay && (
        <AddGoal onClose={hideAddGoalsOverlayHandler} />
      )}
    </>
  );
};

export default GoalsSection;
