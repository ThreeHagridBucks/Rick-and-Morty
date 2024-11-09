import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const status = urlParams.get('status');
    const species = urlParams.get('species');
    const type = urlParams.get('type');
    const gender = urlParams.get('gender');
    const page = urlParams.get('page');

    let newApiURL = API_URL;
    if (name || status || species || type || gender) {
      newApiURL += '?';
      if (name) newApiURL += `name=${name}&`;
      if (status) newApiURL += `status=${status}&`;
      if (species) newApiURL += `species=${species}&`;
      if (type) newApiURL += `type=${type}&`;
      if (gender) newApiURL += `gender=${gender}&`;
    }
    if (page) {
      newApiURL += `page=${page}`;
    }

    setApiURL(newApiURL);
  }, []);

  const uniqueValues = useMemo(() => {
    const statuses = new Set();
    const species = new Set();
    const types = new Set();
    const genders = new Set();

    characters.forEach((character) => {
      statuses.add(character.status);
      species.add(character.species);
      types.add(character.type);
      genders.add(character.gender);
    });

    return {
      statuses: Array.from(statuses),
      species: Array.from(species),
      types: Array.from(types),
      genders: Array.from(genders)
    };
  }, [characters]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info,
      uniqueValues
    }),
    [activePage, apiURL, characters, isFetching, isError, info, uniqueValues]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
