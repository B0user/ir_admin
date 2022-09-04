import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

const Models = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  
  const { data:products } = useQuery(["products"], () => 
    axiosPrivate.get('/products/all').then((res) => res.data)
  );
  const { data:models, error, isLoading, isError, refetch } = useQuery(["models"], () =>
    axiosPrivate.get('/models/all').then((res) => res.data)
  );

  if (isLoading) return <span className="spinner-border" />;
  if (isError) return <p>Что-то пошло не так... {error}</p>;

  const deleteModel = async (id) => {
    if(!id) {
        console.error('Empty ID');
        return;
    }
    try {
        await axiosPrivate.delete(`/models/exact/${id}`);
        refetch();
    } catch (err) {
        console.error(err);
    }
  }
  const readModel = (id) => {
    if(!id) {
        console.error('Empty ID');
        return;
    }
    try {
        navigate(`${id}`);
    } catch (err) {
        console.error(err);
    }
  } 
  const translateProduct_id = (_id) => {
    try {
        const found = products.find(item => item._id === _id);
        return found.name;
    } catch (err) {
        console.error(err);
        return null;
    }
}

  return (
    <div className="row">
      <h1 className="text-center mb-4">Список моделей</h1>
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
        {models?.length ? (
          <ul className="ps-0 ms-1" id="models">
            {models.map((model, i) => (
              <div
                key={i}
                className="info d-flex justify-content-between align-items-center ms-3 mb-2"
              >
                <li><b>{products?.length ? translateProduct_id(model.product_id) : 'Loading...'}{'--->'}</b>  <b>цвет:</b> {model.color} <b>размер:</b> {model.size}</li>
                <div className="icons">
                  <button
                    className="btn btn-primary me-2 rounded-pill"
                    onClick={() => readModel(model._id)}
                  >
                    Больше
                  </button>
                  <span className="ms-2">
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => deleteModel(model._id)}
                    />
                  </span>
                  <span className="ms-2">
                    <Link to="add">
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>Нет моделей</p>
        )}
        <Link to="add">
          <button className="btn btn-cp bg-cp-nephritis rounded-pill w-100">
            Добавить новую модель
          </button>
        </Link>
      </div>
      <br />
    </div>
  );
};

export default Models;
