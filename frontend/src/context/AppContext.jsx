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
  const [repoName,setRepoName] = useState("")
  const [searchList,setSearchList] = useState([])
  const [randomRepo,setRandomRepo] = useState([])



  const signOut = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const getRandomRepo = async ()=>{

    setLoading(true)
    const url = `https://api.github.com/search/repositories?q=stars:1000..10000&sort=stars&order=desc
`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.items) {
        setRandomRepo([]);
        setLoading(false)
        return;
      }

  const finalData = data.items.slice(0, 30).map((repo) => ({
  name: repo.name,
  language: repo.language,
  tag: repo.topics,
  stars: repo.stargazers_count,
  fork: repo.forks_count,
  owner: { avatar_url: repo.owner.avatar_url },
  html_url: repo.html_url,
  popularity:
    repo.stargazers_count > 50000
      ? "Legendary"
      : repo.stargazers_count > 10000
      ? "Famous"
      : repo.stargazers_count > 1000
      ? "Popular"
      : "Rising",
}));

    setLoading(false)
    setRandomRepo(finalData)
  }

  const getPopularityQuery = () => {
    if (popularity === "Legendary") return "stars:>50000+forks:>10000";
    if (popularity === "Famous") return "stars:10000..25000+forks:1000..5000";
    if (popularity === "Popular") return "stars:1000..10000+forks:100..1000";
    if (popularity === "Rising") return "stars:<1000+forks:<100";
    return "stars:>0"; 
  };

  const getRepoList = async () => {

    setLoading(true)
    try {
      let q = getPopularityQuery();

      if (language !== "All Languages") {
        q = `language:${language}+${q}`;
      }

      const url = `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.items) {
        setLoading(false)
        setRepoList([]);
        return;
      }

  const finalData = data.items.slice(0, 30).map((repo) => ({
  name: repo.name,
  language: repo.language,
  tag: repo.topics,
  stars: repo.stargazers_count,
  fork: repo.forks_count,
  owner: { avatar_url: repo.owner.avatar_url },
  html_url: repo.html_url,
  popularity:
    repo.stargazers_count > 50000
      ? "Legendary"
      : repo.stargazers_count > 10000
      ? "Famous"
      : repo.stargazers_count > 1000
      ? "Popular"
      : "Rising",
}));


      setRepoList(finalData);
      setLoading(false);
    } catch (error) {
      console.log("API ERROR:", error);
      setRepoList([]);
    }
  };

const getSearchList = async () => {

  setLoading(true)
  if (!repoName.trim()) {
    setLoading(false)
    setSearchList(randomRepo)
    return
  }

  try {
    const url = `https://api.github.com/search/repositories?q=${repoName}+in:name`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.items) {
      setSearchList(randomRepo)
      setLoading(true)
      return
    }

    const exactMatch = data.items.filter(
      repo => repo.name.toLowerCase() === repoName.toLowerCase()
    )

    if (exactMatch.length === 0) {
      setLoading(false)
      setSearchList(randomRepo)
      return
    }

    const finalData = exactMatch.slice(0, 30).map((repo) => ({
      name: repo.name,
      language: repo.language,
      tag: repo.topics,
      stars: repo.stargazers_count,
      fork: repo.forks_count,
      owner: { avatar_url: repo.owner.avatar_url },
      html_url: repo.html_url,
      popularity:
        repo.stargazers_count > 50000
          ? "Legendary"
          : repo.stargazers_count > 10000
          ? "Famous"
          : repo.stargazers_count > 1000
          ? "Popular"
          : "Rising",
    }))

    setSearchList(finalData)
    setLoading(false)

  } catch (error) {
    console.log("Search API error:", error)
    setSearchList(randomRepo)
  }
}
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

useEffect(() => {
  if (!token) return

  const timer = setTimeout(() => {
    getSearchList()
  }, 600)

  return () => clearTimeout(timer)
}, [repoName])


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
        searchList,setSearchList,
        repoName,setRepoName,
        randomRepo,loading

        
      }}
    >
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
