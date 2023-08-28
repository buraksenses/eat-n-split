import { useState } from "react";
import { FriendsList } from "./FriendsList";
import { BillSplittingForm } from "./BillSplittingForm";
import { AddFriendForm } from "./AddFriendForm";
import { Button } from "./Utils/Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);
  const [billFriend, setBillFriend] = useState("");

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onPayBill={setBillFriend} />
        <AddFriendForm
          isOpen={isOpen}
          friends={friends}
          onAddFriend={setFriends}
        />

        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div className="sidebar">
        {billFriend && (
          <BillSplittingForm
            billFriend={billFriend}
            setFriends={setFriends}
            key={Math.random()}
          />
        )}
      </div>
    </div>
  );
}
