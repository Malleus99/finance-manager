import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from 'fb-init';
import Transaction from './Transactions';
import classes from './ProfileSection.module.css';
import PlusSVG from 'helpers/Plus_SVG';
import AddTransaction from './AddTransaction';

const ProfileSection = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  // const [balanceAmount, setBalanceAmount] = useState(0);
  const [displayTransactionsOverlay, setDisplayTransactionOverlay] =
    useState(false);
  const auth = getAuth();
  const docRef = doc(db, 'users', auth.currentUser.uid);

  const depositAmount = transactionsList
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const withdrawalAmount = transactionsList
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balanceAmount = depositAmount + withdrawalAmount;

  // const handleUpdateProfile = () => {
  //   const user = auth.currentUser;

  //   updateProfile(user, {
  //     displayName: 'charlotte williams',
  //   })
  //     .then(() => {
  //       console.log('Profile updated successfully');
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  useEffect(() => {
    const getItem = async () => {
      const docSnap = await getDoc(docRef);
      setTransactionsList(docSnap.data().transactions);
    };
    getItem();
  }, []);

  const recentTransactions = transactionsList.map((item) => (
    <Transaction data={item} key={item.id} />
  ));

  const userNameCapitalized = auth?.currentUser?.displayName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const showTransactionsOverlayHandler = () => {
    setDisplayTransactionOverlay(true);
  };
  const hideTransactionsOverlayHandler = () => {
    setDisplayTransactionOverlay(false);
  };

  return (
    <div className={classes.section}>
      <div className={classes.profile}>
        <div className={classes.userName}>{userNameCapitalized}</div>
        <div className={classes.imgContainer}>
          <img
            className={classes.img}
            alt='xzxz'
            src={auth?.currentUser?.photoURL}
          />
        </div>
        <div className={classes.balance}>
          <span className={classes.attribute}>Your Balance</span>
          <span className={classes.amount}>${balanceAmount.toFixed(2)}</span>
        </div>
        <div className={classes.transactions}>
          <div className={classes.deposit}>
            <div className={classes.symbol}>↑</div>
            <div className={classes.movement}>
              <span className={classes.anotation}>Deposit</span>
              <span>${depositAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className={classes.withdrawal}>
            <div className={classes.symbol}>↓</div>
            <div className={classes.movement}>
              <span className={classes.anotation}>Withdrawal</span>
              <span>${withdrawalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.transactionsName}>
          <div className={classes.recent}>Recent transactions</div>
          <div onClick={showTransactionsOverlayHandler}>
            <PlusSVG className={classes.plusSvg} />
          </div>
          {displayTransactionsOverlay && (
            <AddTransaction onClose={hideTransactionsOverlayHandler} />
          )}
        </div>
        <div className={classes.transactionTypesContainer}>
          {recentTransactions}
        </div>
      </div>
    </div>
  );
};
export default ProfileSection;
