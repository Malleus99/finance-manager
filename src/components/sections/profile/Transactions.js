import classes from './Transactions.module.css';

const Transaction = ({ data }) => {
  const { id, icon, item, type, amount } = data;

  const price = Number(amount).toFixed(2);
  const styledItemName = item
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const styledItemType = type
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className={classes.transaction} id={id}>
      <div className={classes.pictureContainer}>
        <div className={classes.picture}>{icon}</div>
      </div>
      <div className={classes.description}>
        <span className={classes.descProduct}>{styledItemName}</span>
        <span className={classes.descType}>{styledItemType}</span>
      </div>
      <div className={classes.amount}>${price}</div>
    </div>
  );
};

export default Transaction;
