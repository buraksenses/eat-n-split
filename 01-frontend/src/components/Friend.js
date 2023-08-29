import { Button } from "./Utils/Button";

export function Friend({ friend, onPayBill, billFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button
        clickEvent={
          friend === billFriend ? () => onPayBill("") : () => onPayBill(friend)
        }
      >
        {friend === billFriend ? "Close" : "Select"}
      </Button>
    </li>
  );
}
