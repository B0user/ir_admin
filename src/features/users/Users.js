import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faArchive } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

const UserRecord = ({ user, refetch }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const archivateUser = async (id) => {
    if (!id) {
      console.error("Empty ID");
      return;
    }
    try {
      await axiosPrivate.put(`/users/${id}/archivate`);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!id) {
      console.error("Empty ID");
      return;
    }
    try {
      await axiosPrivate.delete(`/users/${id}`);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const readUser = (id) => {
    if (!id) {
      console.error("Empty ID");
      return;
    }
    try {
      navigate(`${id}`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      key={user._id}
      className="info d-flex justify-content-between align-items-center ms-3 py-1 border-bottom"
    >
      <li>{user.active ? user.username : "[ARCHIVATED] " + user.username }</li>
      <div className="icons">
        <button
          className="btn btn-primary me-2 rounded-pill"
          onClick={() => readUser(user._id)}
        >
          Больше
        </button>
        <span className="ms-2">
          <FontAwesomeIcon
            icon={faArchive}
            onClick={() => archivateUser(user._id)}
          />
        </span>
        <span className="ms-2">
          <FontAwesomeIcon
            icon={faMinus}
            onClick={() => deleteUser(user._id)}
          />
        </span>
        <span className="ms-2">
          <Link to="add">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </span>
      </div>
    </div>
  );
};

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, error, isLoading, isError, refetch } = useQuery(["users"], () =>
    axiosPrivate.get("/users").then((res) => res.data)
  );

  if (isLoading) return <span className="spinner-border" />;
  if (isError) return <p>Что-то пошло не так... {error}</p>;

  return (
    <div className="row">
      <h1 className="text-center mb-4">Список пользователей</h1>
      <div className="wrapper ">
        <div className="input-group mb-4">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button type="button" className="btn btn-outline-primary">
            поиск
          </button>
        </div>
        {data?.length ? (
          <ul className="ps-0 ms-1" id="users">
            {data.map((user) => (
              <UserRecord user={user} refetch={refetch} />
            ))}
          </ul>
        ) : (
          <p>Нет пользователей</p>
        )}
        <Link to="add">
          <button className="btn btn-cp bg-cp-nephritis rounded-pill w-100">
            Добавить нового пользователя
          </button>
        </Link>
      </div>
      <br />
    </div>
  );
};

export default Users;
