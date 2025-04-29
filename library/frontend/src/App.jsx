import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendations from "./components/Recommendations";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState("authors");
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, [token]);

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore()
    setPage("authors")
    notify("Logged out")
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          !token &&
          <button onClick={() => setPage("login")}>login</button>
        }
        {
          token &&
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        } 
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <LoginForm show={page === "login"} setPage={setPage} setError={notify} setToken={setToken} />
      <NewBook show={page === "add"} setError={notify} />
      <Recommendations show={page === "recommend"} />
    </div>
  );
};

export default App;
