import { useState } from "react";
import { Label } from "./Utils/Label";
import { Button } from "./Utils/Button";
import { apiClient } from "./api/FriendApiService";

export function BillSplittingForm({ billFriend, setFriends, friendsList }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [payPerson, setPayPerson] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedBalance = yourExpense - (bill - yourExpense);

    const updatedFriend = {
      ...billFriend,
      balance:
        payPerson === "friend"
          ? billFriend.balance + updatedBalance
          : billFriend.balance - updatedBalance,
    };

    try {
      const response = await apiClient.put(
        `/friends/${updatedFriend.id}`,
        updatedFriend
      );
      console.log("Friend updated:", response.data);

      const updatedFriends = friendsList.map((friend) =>
        friend.id === updatedFriend.id ? updatedFriend : friend
      );
      setFriends(updatedFriends);
    } catch (error) {
      console.error("Error updating friend:", error);
    }
  }

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
