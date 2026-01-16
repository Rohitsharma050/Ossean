import express from 'express'


export const getRandomRepo = async (req,res)=>{
     try {
    const url = `https://api.github.com/search/repositories?q=stars:1000..10000&sort=stars&order=desc&per_page=30`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    const data = await response.json();

    if (!data.items) {
      return res.json({ success: true, data: [] });
    }

    const finalData = data.items.map((repo) => ({
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

    res.json({ success: true, data: finalData });

  } catch (err) {
    res.status(500).json({ success: false, message: "GitHub API failed" });
  }
}

export const getFilterRepo = async (req,res)=>{
   try {
    const { language, popularity } = req.query;

    let q = "";

    if (popularity === "Legendary")
      q = "stars:>50000";
    else if (popularity === "Famous")
      q = "stars:10000..50000";
    else if (popularity === "Popular")
      q = "stars:1000..10000";
    else
      q = "stars:>1000";

    if (language && language !== "All Languages") {
      q = `language:${language}+${q}`;
    }

    const url = `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=30`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    const data = await response.json();

    if (!data.items) {
      return res.json({ success: true, data: [] });
    }

    // 🔥 SAME LOGIC (shifted from frontend)
    const finalData = data.items.map((repo) => ({
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

    res.json({ success: true, data: finalData });

  } catch (err) {
    res.status(500).json({ success: false, message: "GitHub fetch failed" });
  }
}

export const getSearchRepo = async (req,res)=>{
     try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.json({ success: true, data: [] });
    }

    const url = `https://api.github.com/search/repositories?q=${q}+in:name&per_page=30`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    const data = await response.json();

    if (!data.items) {
      return res.json({ success: true, data: [] });
    }

    // 🔥 SAME EXACT MATCH LOGIC
    const exactMatch = data.items.filter(
      repo => repo.name.toLowerCase() === q.toLowerCase()
    );

    if (exactMatch.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 🔥 SAME MAPPING LOGIC
    const finalData = exactMatch.map((repo) => ({
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

    res.json({ success: true, data: finalData });

  } catch (err) {
    res.status(500).json({ success: false, message: "Search failed" });
  }
}