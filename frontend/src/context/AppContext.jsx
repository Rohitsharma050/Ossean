import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading,setLoading] = useState(true)
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );


  const [repoList, setRepoList] = useState([]);
  const [language, setLanguage] = useState("All Languages");
  const [popularity, setPopularity] = useState("All Popularity");
  const [randomRepo,setRandomRepo] = useState([])


  const signOut = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const getRandomRepo = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      `${backendUrl}/api/github/randomRepo`
    );

    const result = await response.json();

    if (!result.success) {
      setRandomRepo([]);
      return;
    }

    setRandomRepo(result.data);

  } catch (err) {
    setRandomRepo([]);
  } finally {
    setLoading(false);
  }
};

  const getPopularityQuery = () => {
    if (popularity === "Legendary") return "stars:>50000+forks:>10000";
    if (popularity === "Famous") return "stars:10000..25000+forks:1000..5000";
    if (popularity === "Popular") return "stars:1000..10000+forks:100..1000";
    if (popularity === "Rising") return "stars:<1000+forks:<100";
    return "stars:>0"; 
  };

  const getRepoList = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      `${backendUrl}/api/github/filterRepo?language=${language}&popularity=${popularity}`
    );

    const result = await response.json();

    if (!result.success) {
      setRepoList([]);
      return;
    }

    setRepoList(result.data);

  } catch (error) {
    setRepoList([]);
  } finally {
    setLoading(false);
  }
};






  useEffect(() => {
  if (token) {
    getRandomRepo()
  }
}, [token])

  useEffect(()=>{
    if(token){
      getRepoList()
    }
  },[language,popularity,token])





  return (
    <Appcontext.Provider
      value={{
        backendUrl,
        token,
        signOut,
        setToken,
        repoList,
        setRepoList,
        language,
        setLanguage,
        popularity,
        setPopularity,
        getRepoList,
        randomRepo,loading,setLoading,

        
      }}
    >
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
