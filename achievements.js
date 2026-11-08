// This is the file you edit to set up your achievements.
//
// projectId:     the project's slug, which is the last part of its iNaturalist address.
//                inaturalist.org/projects/my-project-name -> "my-project-name"
// type:          "observations" counts observations, "species" counts different species
// goal:          how many it takes to earn the achievement
// taxonId:       (optional) only count one group. 3 = birds, 47126 = plants,
//                47158 = insects, 47170 = fungi. Other ids are in a taxon page's address.
// researchGrade: (optional) set to true to only count research grade observations

const siteTitle = "wlc BioBlitz Achievements";

const achievements = [
  {
    name: "first Steps",
    description: "Add your first observation to the project.",
    projectId: "wlc-f26-bioblitz",
    type: "observations",
    goal: 1,
    image: "images/woodfrog.png",
  },
  {
    name: "regular",
    description: "Add 25 observations to the project.",
    projectId: "wlc-f26-bioblitz",
    type: "observations",
    goal: 25
  },
  {
    name: "species Collector",
    description: "Find 10 different species.",
    projectId: "wlc-f26-bioblitz",
    type: "species",
    goal: 10
  },
  {
    name: "Bird Watcher",
    description: "Find 5 different kinds of birds.",
    projectId: "wlc-f26-bioblitz",
    type: "species",
    goal: 5,
    taxonId: 3
  },
  {
    name: "verified",
    description: "Get 10 research grade observations.",
    projectId: "wlc-f26-bioblitz",
    type: "observations",
    goal: 10,
    researchGrade: true
  },
  {
    name: "true birder",
    description: "Get 25 research grade bird observations.",
    projectId: "wlc-f26-bioblitz",
    type: "observations",
    goal: 25,
    researchGrade: true,
    taxonId: 3
  },
  {
    name: "master baiter",
    description: "Observe 15 different fish species.",
    projectId: "wlc-f26-bioblitz",
    type: "species",
    goal: 15,
    taxonId: 47178
  }
];
