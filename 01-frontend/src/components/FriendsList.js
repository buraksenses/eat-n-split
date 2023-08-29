import { Friend } from "./Friend";

export function FriendsList({ friends, onPayBill, billFriend }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            onPayBill={onPayBill}
            billFriend={billFriend}
            key={friend.id}
          />
        ))}
      </ul>
    </>
  );
}
