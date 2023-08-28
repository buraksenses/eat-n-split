import { Friend } from "./Friend";

export function FriendsList({ friends, onPayBill }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} onPayBill={onPayBill} key={friend.id} />
        ))}
      </ul>
    </>
  );
}
