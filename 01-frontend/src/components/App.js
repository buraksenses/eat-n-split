import { useEffect, useState } from "react";
import { FriendsList } from "./FriendsList";
import { BillSplittingForm } from "./BillSplittingForm";
import { AddFriendForm } from "./AddFriendForm";
import { Button } from "./Utils/Button";
import SpinnerLoading from "./Utils/SpinnerLoading";
import { apiClient, retrieveAllFriends } from "./api/FriendApiService";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [billFriend, setBillFriend] = useState("");

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
        <FriendsList
          friends={friends}
          onPayBill={setBillFriend}
          billFriend={billFriend}
        />
        <AddFriendForm
          isOpen={isOpen}
          friends={friends}
          onAddFriend={setFriends}
        />

        <Button clickEvent={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div className="sidebar">
        {billFriend && (
          <BillSplittingForm
            friends={friends}
            billFriend={billFriend}
            setFriends={setFriends}
            friendsList={friends}
            key={Math.random()}
          />
        )}
      </div>
    </div>
  );
}
