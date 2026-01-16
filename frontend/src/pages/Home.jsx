import React, { useContext } from "react";
import Filterbar from "../components/Filterbar";
import { Appcontext } from "../context/AppContext";
import Loader from "../components/Loader";

const Home = () => {
  const { repoList, loading } = useContext(Appcontext);

  return (
    <div className="text-white px-3 sm:px-6 py-6">

      <Filterbar />

      {/* TABLE HEADER (Desktop only) */}
      <div className="hidden lg:flex items-center bg-black/80 w-fixed py-3 px-4 mt-6 text-sm font-medium">
        <div className="w-1/4">Repository</div>
        <div className="w-1/6">Language</div>
        <div className="w-1/4">Tags</div>
        <div className="w-1/10 text-right">Stars</div>
        <div className="w-1/10 text-right">Forks</div>
        <div className="w-1/10 text-right">Popularity</div>
      </div>

      {/* 🔄 LOADER */}
      {loading && <Loader />}

      {/* 📦 DATA */}
      {!loading && (
        <div className="divide-y divide-white/10 mt-4">
          {repoList.map((item, index) => (
            <div key={item.id || index}>

              {/* DESKTOP ROW */}
              <div className="hidden lg:flex items-center bg-black/70 py-2 px-3 border border-white/10">

                <div className="w-1/4 flex items-center gap-3">
                  <img
                    src={item.owner.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-white/10"
                  />
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold hover:underline"
                  >
                    {item.name}
                  </a>
                </div>

                <div className="w-1/6 text-sm">{item.language}</div>

                <div className="w-1/4 flex flex-wrap gap-2">
                  {item.tag?.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-1/10 text-right text-sm">{item.stars}</div>
                <div className="w-1/10 text-right text-sm">{item.fork}</div>

                <div className="w-1/10 text-right">
                  <PopularityBadge value={item.popularity} />
                </div>
              </div>

              {/* MOBILE CARD */}
              <div className="lg:hidden bg-black/70 border border-white/10 rounded-lg p-4 space-y-3">

                <div className="flex items-center gap-3">
                  <img
                    src={item.owner.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-white/10"
                  />
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                  >
                    {item.name}
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-white/10 px-2 py-1 rounded">
                    {item.language || "N/A"}
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded">
                    ⭐ {item.stars}
                  </span>
                  <span className="bg-white/10 px-2 py-1 rounded">
                    🍴 {item.fork}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tag?.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <PopularityBadge value={item.popularity} />
              </div>

            </div>
          ))}

          {repoList.length === 0 && (
            <div className="text-center text-neutral-400 py-8">
              No repositories to show.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

/* Badge Component */
const PopularityBadge = ({ value }) => {
  const styles = {
    Legendary: "border-yellow-600 text-yellow-400 bg-yellow-600/10",
    Famous: "border-purple-600 text-purple-400 bg-purple-600/10",
    Popular: "border-green-600 text-green-400 bg-green-600/10",
    Default: "border-gray-600 text-gray-300 bg-gray-600/10"
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs rounded-md border ${
        styles[value] || styles.Default
      }`}
    >
      {value}
    </span>
  );
};
