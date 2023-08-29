import { useState } from "react";
import { Label } from "./Utils/Label";
import { Button } from "./Utils/Button";
import { apiClient } from "./api/FriendApiService";

export function BillSplittingForm({ billFriend, setFriends }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [payPerson, setPayPerson] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedBalance = yourExpense - (bill - yourExpense);
    if (payPerson === "friend") {
      setFriends((friends) =>
        friends.map((friend) =>
          friend.id === billFriend.id
            ? { ...friend, balance: friend.balance + updatedBalance }
            : friend
        )
      );
    } else {
      setFriends((friends) =>
        friends.map((friend) =>
          friend.id === billFriend.ids
            ? { ...friend, balance: friend.balance - updatedBalance }
            : friend
        )
      );
    }
  }

  const updateFriend = (friend) => {
    apiClient
      .put(`/friends/${friend.id}`, friend)
      .then((response) => setFriends(response.data._embedded))
      .catch((error) => console.error("Error updating friend balance", error));
  };

  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>SPLIT A BILL WITH {billFriend.name}</h2>
      <Label>💰 Bill value</Label>
      <input
        type="number"
        className="input"
        onChange={(e) => setBill(e.target.value)}
      ></input>

      <Label>🙋‍♂️ Your expense</Label>
      <input
        type="number"
        className="input"
        onChange={(e) => setYourExpense(Number(e.target.value))}
      ></input>

      <Label>👫 {billFriend.name}'s expense</Label>
      <input
        type="number"
        className="input"
        value={bill - yourExpense}
        disabled
      ></input>

      <Label>🤑 Who's paying the bill?</Label>
      <select onChange={(e) => setPayPerson(e.target.value)} value={payPerson}>
        <option value="you">You</option>
        <option value="friend">{billFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
