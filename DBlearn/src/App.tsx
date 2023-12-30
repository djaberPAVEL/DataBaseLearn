import "./App.css";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  const { users, error, isloading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUser = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setUsers(originalUser);
    });
  };

  const addNewUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "djaber" };
    setUsers([...users, newUser]);
    userService
      .create(newUser)
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setUsers(originalUser);
      });
  };

  const UpdateUser = (user: User) => {
    const originalUser = [...users];
    const UpdatedUser = { ...user, name: user.name + "!" };

    setUsers(users.map((u) => (u.id === user.id ? UpdatedUser : u)));

    userService.update(UpdatedUser).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
      setUsers(originalUser);
    });
  };
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isloading && <div className="spinner-border"></div>}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => addNewUser()}
      >
        add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1 "
                onClick={() => {
                  UpdateUser(user);
                }}
              >
                update
              </button>
              <button
                className="btn btn-outline-danger "
                onClick={() => {
                  deleteUser(user);
                }}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
