const apiUrl = "https://api.inaturalist.org/v1";

const form = document.getElementById("user-form");
const input = document.getElementById("username");
const message = document.getElementById("message");
const results = document.getElementById("results");

document.getElementById("site-title").textContent = siteTitle;
document.title = siteTitle;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = input.value.trim();
  if (username) {
    showAchievements(username);
  }
});

// Lets you share a link like yoursite.onrender.com/?user=someusername
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("user")) {
  input.value = urlParams.get("user");
  showAchievements(input.value);
}

// Looks for an iNaturalist user whose login matches what was typed
async function findUser(username) {
  const response = await fetch(apiUrl + "/users/autocomplete?q=" + encodeURIComponent(username));
  const data = await response.json();
  return data.results.find(function (user) {
    return user.login.toLowerCase() === username.toLowerCase();
  });
}

// Asks iNaturalist how many observations (or species) this user has for one achievement
async function getCount(achievement, userLogin) {
  const params = new URLSearchParams({
    user_id: userLogin,
    project_id: achievement.projectId,
    per_page: 1
  });
  if (achievement.taxonId) {
    params.set("taxon_id", achievement.taxonId);
  }
  if (achievement.researchGrade) {
    params.set("quality_grade", "research");
  }

  let path = "/observations";
  if (achievement.type === "species") {
    path = "/observations/species_counts";
  }

  const response = await fetch(apiUrl + path + "?" + params);
  if (!response.ok) {
    throw new Error("iNaturalist said " + response.status + " for " + achievement.name);
  }
  const data = await response.json();
  return data.total_results;
}

function makeCard(achievement, count, done) {
  const shown = Math.min(count, achievement.goal);
  const percent = Math.round((shown / achievement.goal) * 100);

  const card = document.createElement("div");
  card.className = done ? "card done" : "card";
  card.innerHTML =
    "<h3>" + achievement.name + "</h3>" +
    "<p>" + achievement.description + "</p>" +
    '<div class="bar"><div class="fill" style="width: ' + percent + '%"></div></div>' +
    "<small>" + (done ? "Completed" : shown + " of " + achievement.goal) + "</small>";
  return card;
}

async function showAchievements(username) {
  results.innerHTML = "";
  message.textContent = "Looking up " + username + "...";

  try {
    const user = await findUser(username);
    if (!user) {
      message.textContent = "There's no iNaturalist user called " + username + ". Check the spelling and try again.";
      return;
    }

    // check every achievement at the same time so it loads faster
    const counts = await Promise.all(achievements.map(function (achievement) {
      return getCount(achievement, user.login);
    }));

    let completed = 0;
    achievements.forEach(function (achievement, i) {
      const done = counts[i] >= achievement.goal;
      if (done) {
        completed++;
      }
      results.appendChild(makeCard(achievement, counts[i], done));
    });

    message.textContent = user.login + " has completed " + completed + " of " + achievements.length + " achievements.";
  } catch (error) {
    console.log(error);
    message.textContent = "Couldn't reach iNaturalist. Wait a minute and try again.";
  }
}
