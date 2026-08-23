const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(yyyyMm) {
  const [year, month] = yyyyMm.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

function renderProject(project) {
  const li = document.createElement("li");

  const time = document.createElement("time");
  time.dateTime = project.date;
  time.textContent = formatDate(project.date);

  const h3 = document.createElement("h3");
  const link = document.createElement("a");
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = project.displayName;
  h3.appendChild(link);

  const description = document.createElement("p");
  description.textContent = project.description;

  li.append(time, h3, description);

  if (project.tools && project.tools.length) {
    const tools = document.createElement("p");
    tools.className = "meta";
    tools.innerHTML = `<strong>Tools:</strong> ${project.tools.join(", ")}`;
    li.appendChild(tools);
  }

  if (project.experience) {
    const experience = document.createElement("p");
    experience.className = "meta";
    experience.innerHTML = `<strong>Experience gained:</strong> ${project.experience}`;
    li.appendChild(experience);
  }

  if (project.tags && project.tags.length) {
    const tags = document.createElement("div");
    tags.className = "tags";
    for (const tag of project.tags) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tags.appendChild(span);
    }
    li.appendChild(tags);
  }

  return li;
}

async function loadTimeline() {
  const list = document.getElementById("timeline");
  try {
    const res = await fetch("./projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const data = await res.json();

    list.replaceChildren();
    for (const project of data.projects) {
      list.appendChild(renderProject(project));
    }

    const updated = document.getElementById("updated-at");
    if (updated && data.generatedAt) {
      const date = new Date(data.generatedAt);
      updated.textContent = `Updated ${date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}`;
    }
  } catch (err) {
    list.innerHTML = "";
    const li = document.createElement("li");
    li.className = "error";
    li.textContent = "Couldn't load the project timeline right now — please check back later.";
    list.appendChild(li);
    console.error(err);
  }
}

loadTimeline();
