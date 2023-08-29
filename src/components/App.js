import { useEffect, useState } from "react";
import { FriendsList } from "./FriendsList";
import { BillSplittingForm } from "./BillSplittingForm";
import { AddFriendForm } from "./AddFriendForm";
import { Button } from "./Utils/Button";
import SpinnerLoading from "./Utils/SpinnerLoading";
import { apiClient, retrieveAllFriends } from "./api/FriendApiService";

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
  const [friends, setFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [billFriend, setBillFriend] = useState({});

  function loadFriends() {
    apiClient.get("/friends").then((response) => {
      console.log(response.data);
      setFriends(response.data._embedded.friends);
    });
  }

  useEffect(() => loadFriends(), []);

  /*useEffect(() => {
    const fetchFriends = async () => {
      const baseUrl = `http://localhost:8080/api/friends`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }

      const responseJson = await response.json();
      setFriends(responseJson._embedded.friends);
      setIsLoading(false);
    };

    fetchFriends().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }*/

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
