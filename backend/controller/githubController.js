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
      q = "stars:<1000";

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

    const exactMatch = data.items.filter(
      repo => repo.name.toLowerCase() === q.toLowerCase()
    );

    if (exactMatch.length === 0) {
      return res.json({ success: true, data: [] });
    }

  
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

export const getOrgList = async (req, res) => {

  try {

    const { year } = req.query

    const url = `https://api.gsocorganizations.dev/${year}.json`

    const response = await fetch(url)

    const data = await response.json()

    const finalData = data.organizations.map((org) => ({
      name: org.name,
      img_url: org.image_url,
      bg_color: org.image_background_color,
      desc: org.description,
      url: org.url,
      category: org.category,
      projects_url: org.projects_url,
      ideas_url: org.ideas_url,
      guide_url: org.guide_url,
      topics: org.topics,
      technologies: org.technologies,
      contact_email: org.contact_email,
      mailing_list: org.mailing_list,
      twitter_url: org.twitter_url,
      num_projects: org.num_projects
    }))

    res.json({
      success: true,
      data: finalData
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}