import { useState } from "react";
import { Label } from "./Utils/Label";
import { Button } from "./Utils/Button";

export function AddFriendForm({ isOpen, onAddFriend }) {
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendImageURL, setNewFriendImageURL] = useState("");

  function handleOnAddNewFriend(e) {
    e.preventDefault();
    const newFriend = {
      id: Math.random(),
      name: newFriendName,
      image: newFriendImageURL,
      balance: 0,
    };

    onAddFriend((items) => [...items, newFriend]);
  }

  return (
    <div>
      {isOpen && (
        <form className="form-add-friend" onSubmit={handleOnAddNewFriend}>
          <Label>👫 Friend's name</Label>
          <input
            type="text"
            className="input"
            onChange={(e) => setNewFriendName(e.target.value)}
          ></input>
          <Label>📷 Friend's Image</Label>
          <input
            type="text"
            className="input"
            onChange={(e) => setNewFriendImageURL(e.target.value)}
          ></input>
          <Button>Add</Button>
        </form>
      )}
    </div>
  );
}
