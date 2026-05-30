const pulseGrid = document.getElementById("pulseGrid");
const trustSpark = document.getElementById("trustSpark");
const timeScrubber = document.getElementById("timeScrubber");
const timeLabel = document.getElementById("timeLabel");
const trustScore = document.getElementById("trustScore");
const incidentList = document.getElementById("incidentList");
const heroProjects = document.getElementById("heroProjects");
const heroAccuracy = document.getElementById("heroAccuracy");
const heroVerify = document.getElementById("heroVerify");
const topologyEdges = document.getElementById("topologyEdges");
const topologyNodes = document.getElementById("topologyNodes");
const topologyLabels = document.getElementById("topologyLabels");
const personaSummary = document.getElementById("personaSummary");
const personaFocus = document.getElementById("personaFocus");
const personaActions = document.getElementById("personaActions");
const personaTabs = Array.from(document.querySelectorAll(".persona-tab"));
const artifactDrawer = document.getElementById("artifactDrawer");
const drawerTitle = document.getElementById("drawerTitle");
const drawerSubtitle = document.getElementById("drawerSubtitle");
const drawerMetrics = document.getElementById("drawerMetrics");
const drawerSchema = document.getElementById("drawerSchema");
const drawerLineage = document.getElementById("drawerLineage");
const drawerActions = document.getElementById("drawerActions");
const drawerClose = document.getElementById("drawerClose");
const replayRange = document.getElementById("replayRange");
const replayValue = document.getElementById("replayValue");
const replayRisk = document.getElementById("replayRisk");
const resilienceGrid = document.getElementById("resilienceGrid");

let provenanceData = null;
let incidentNodes = new Map();

function seedPulseGrid() {
  const dots = 30;
  pulseGrid.innerHTML = "";
  for (let i = 0; i < dots; i += 1) {
    const dot = document.createElement("div");
    dot.className = "pulse-dot";
    dot.style.animationDelay = `${(i % 6) * 0.4}s`;
    pulseGrid.appendChild(dot);
  }
}

function seedSparkline(values) {
  trustSpark.innerHTML = "";
  trustSpark.style.display = "flex";
  values.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.style.flex = "1";
    bar.style.marginRight = index === values.length - 1 ? "0" : "4px";
    bar.style.borderRadius = "6px";
    bar.style.background = "linear-gradient(180deg, rgba(41,185,179,0.6), rgba(58,120,255,0.25))";
    bar.style.height = `${10 + (value / 100) * 30}px`;
    trustSpark.appendChild(bar);
  });
}

function setTimelineState(index) {
  if (!provenanceData) return;
  const state = provenanceData.trustTimeline[index];
  if (!state) return;
  timeLabel.textContent = state.label;
  trustScore.textContent = state.trust;
  incidentNodes.forEach((node, id) => {
    if (state.incidents.includes(id)) {
      node.style.borderColor = "rgba(255, 91, 91, 0.4)";
      node.style.boxShadow = "0 0 12px rgba(255, 91, 91, 0.2)";
    } else {
      node.style.borderColor = "rgba(15, 24, 36, 0.08)";
      node.style.boxShadow = "none";
    }
  });
}

function updateReplayModel(value) {
  const days = Number(value);
  replayValue.textContent = `${days} days`;
  const risk = Math.max(1.2, 8 - days / 12);
  replayRisk.textContent = `${risk.toFixed(1)}%`;
}

function renderIncidents(incidents) {
  incidentList.innerHTML = "";
  incidentNodes = new Map();
  incidents.forEach((incident) => {
    const card = document.createElement("div");
    card.className = "incident";
    card.dataset.severity = incident.severity;
    card.innerHTML = `
      <div class="incident-title">${incident.title}</div>
      <div class="incident-meta">${incident.stream}</div>
    `;
    incidentList.appendChild(card);
    incidentNodes.set(incident.id, card);
  });
}

function renderTopology(topology) {
  topologyEdges.innerHTML = "";
  topologyNodes.innerHTML = "";
  topologyLabels.innerHTML = "";
  const nodeMap = new Map();
  topology.nodes.forEach((node) => {
    nodeMap.set(node.id, node);
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", node.r);
    if (node.artifactId) {
      circle.dataset.artifactId = node.artifactId;
      circle.classList.add("node-interactive");
    }
    if (node.status === "warning") {
      circle.classList.add("node-warning");
    }
    if (node.status === "critical") {
      circle.classList.add("node-critical");
    }
    topologyNodes.appendChild(circle);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", node.x + node.r + 8);
    label.setAttribute("y", node.y + 4);
    label.textContent = node.label;
    topologyLabels.appendChild(label);
  });

  topology.edges.forEach((edge) => {
    const from = nodeMap.get(edge.from);
    const to = nodeMap.get(edge.to);
    if (!from || !to) return;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    if (edge.status === "warning") {
      line.classList.add("edge-warning");
    }
    if (edge.status === "critical") {
      line.classList.add("edge-critical");
    }
    topologyEdges.appendChild(line);
  });
}

function openDrawer(artifact) {
  if (!artifact) return;
  drawerTitle.textContent = artifact.title;
  drawerSubtitle.textContent = artifact.subtitle;
  drawerMetrics.innerHTML = `
    <span>Status: ${artifact.status}</span>
    <span>Latency: ${artifact.latency}</span>
    <span>Quality: ${artifact.quality}</span>
    <span>Owner: ${artifact.owner}</span>
  `;
  drawerSchema.textContent = artifact.schema;
  drawerLineage.innerHTML = artifact.lineage.map((item) => `<li>${item}</li>`).join("");
  drawerActions.innerHTML = artifact.actions
    .map((item) => `<span class="action-pill">${item}</span>`)
    .join("");
  artifactDrawer.classList.add("is-open");
  artifactDrawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  artifactDrawer.classList.remove("is-open");
  artifactDrawer.setAttribute("aria-hidden", "true");
}

function renderPersonas(personas, key) {
  const persona = personas[key];
  if (!persona) return;
  personaSummary.innerHTML = `
    <h3>${persona.title}</h3>
    <p>${persona.summary}</p>
  `;
  personaFocus.innerHTML = `
    <div class="panel-title">Focus areas</div>
    <ul class="persona-list">${persona.focus.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  personaActions.innerHTML = `
    <div class="panel-title">Primary actions</div>
    ${persona.actions.map((item) => `<span class="action-pill">${item}</span>`).join("")}
  `;
}

function renderResilience(resilience) {
  resilienceGrid.innerHTML = "";
  resilience.forEach((item) => {
    const card = document.createElement("div");
    card.className = "resilience-card";
    card.innerHTML = `
      <div class="resilience-pill">${item.tag}</div>
      <div class="panel-title">${item.title}</div>
      <p>${item.summary}</p>
      <div class="interaction-meta">${item.mitigation}</div>
    `;
    resilienceGrid.appendChild(card);
  });
}

function applyHeroMetrics(hero) {
  heroProjects.textContent = hero.projects;
  heroAccuracy.textContent = hero.accuracy;
  heroVerify.textContent = hero.verify;
}

function observeSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function bootWithData(data) {
  provenanceData = data;
  applyHeroMetrics(data.hero);
  renderIncidents(data.incidents);
  renderTopology(data.topology);
  seedSparkline(data.trustSpark);
  renderPersonas(data.personas, "lead");
  renderResilience(data.resilience);
  setTimelineState(0);

  topologyNodes.addEventListener("click", (event) => {
    const target = event.target;
    if (!target || !target.dataset.artifactId) return;
    const artifact = provenanceData.artifacts.find((item) => item.id === target.dataset.artifactId);
    openDrawer(artifact);
  });
}

seedPulseGrid();
updateReplayModel(replayRange.value);
observeSections();

fetch("data/provenance.json")
  .then((response) => response.json())
  .then((data) => bootWithData(data))
  .catch(() => {
    bootWithData({
      hero: { projects: "120+", accuracy: "99.3%", verify: "14 min" },
      trustTimeline: [
        { label: "Now - nominal state", trust: 92, incidents: ["inc-001"] },
        { label: "T-4 hr - drift detected", trust: 81, incidents: ["inc-001", "inc-002"] },
        { label: "T-2 days - schema conflict", trust: 67, incidents: ["inc-002", "inc-003"] }
      ],
      trustSpark: [70, 74, 78, 82, 85, 88, 91, 94, 92, 90, 88, 87, 89, 92, 93, 92],
      incidents: [
        { id: "inc-001", title: "Drift risk - feature pipeline", stream: "toxicity.features.v3", severity: "warning" },
        { id: "inc-002", title: "Missing data hash", stream: "trial_sites.cohort_14", severity: "critical" },
        { id: "inc-003", title: "Environment mismatch", stream: "model.training.env", severity: "warning" }
      ],
      topology: {
        nodes: [
          { id: "raw-data", x: 80, y: 70, r: 16, status: "nominal", label: "raw data", artifactId: "artifact-raw" },
          { id: "clean", x: 220, y: 120, r: 18, status: "nominal", label: "cleaning", artifactId: "artifact-clean" },
          { id: "features", x: 360, y: 80, r: 16, status: "warning", label: "features", artifactId: "artifact-features" },
          { id: "train", x: 320, y: 240, r: 20, status: "warning", label: "training", artifactId: "artifact-train" },
          { id: "eval", x: 470, y: 200, r: 14, status: "nominal", label: "evaluation", artifactId: "artifact-eval" },
          { id: "report", x: 560, y: 140, r: 24, status: "critical", label: "report", artifactId: "artifact-report" }
        ],
        edges: [
          { from: "raw-data", to: "clean", status: "nominal" },
          { from: "clean", to: "features", status: "warning" },
          { from: "clean", to: "train", status: "nominal" },
          { from: "features", to: "train", status: "warning" },
          { from: "train", to: "eval", status: "nominal" },
          { from: "eval", to: "report", status: "critical" }
        ]
      },
      artifacts: [
        {
          id: "artifact-raw",
          title: "Raw assay data",
          subtitle: "toxicity.raw.cohort_14",
          status: "Nominal",
          latency: "3.2s",
          quality: "99.6%",
          owner: "Data Ops",
          schema: "+ added field: assay_batch_id",
          lineage: ["s3://aesculapius/raw/", "etl.ingest"],
          actions: ["Open manifest", "Validate hash"]
        },
        {
          id: "artifact-clean",
          title: "Cleaned cohort",
          subtitle: "toxicity.clean.cohort_14",
          status: "Nominal",
          latency: "5.1s",
          quality: "99.1%",
          owner: "Data Engineering",
          schema: "~ updated field: toxicity_label (int -> float)",
          lineage: ["raw assay", "quality checks"],
          actions: ["Compare schema", "Open lineage"]
        },
        {
          id: "artifact-features",
          title: "Feature store",
          subtitle: "toxicity.features.v3",
          status: "Warning",
          latency: "10.2s",
          quality: "97.8%",
          owner: "ML Platform",
          schema: "! removed field: lipid_ratio",
          lineage: ["cleaned cohort", "feature pipeline"],
          actions: ["Open diff", "Branch replay"]
        },
        {
          id: "artifact-train",
          title: "Model training",
          subtitle: "toxicity.train.run_32",
          status: "Warning",
          latency: "18.4s",
          quality: "96.9%",
          owner: "Research Core",
          schema: "~ updated param: lr (0.001 -> 0.002)",
          lineage: ["features v3", "csv runner"],
          actions: ["Open run log", "Check environment"]
        },
        {
          id: "artifact-eval",
          title: "Evaluation suite",
          subtitle: "toxicity.eval.apr",
          status: "Nominal",
          latency: "6.7s",
          quality: "99.0%",
          owner: "Model QA",
          schema: "+ added metric: aupr",
          lineage: ["training run", "baseline report"],
          actions: ["Export metrics", "Verify replay"]
        },
        {
          id: "artifact-report",
          title: "Regulatory report",
          subtitle: "toxicity.report.submission",
          status: "Critical",
          latency: "22.1s",
          quality: "91.4%",
          owner: "Compliance",
          schema: "! missing hash: env_digest",
          lineage: ["evaluation suite", "audit ledger"],
          actions: ["Generate certificate", "Lock submission"]
        }
      ],
      personas: {
        lead: {
          title: "Principal Investigator",
          summary: "Portfolio view of program health, lineage confidence, and approval readiness.",
          focus: ["Branch review for publication", "Compliance gates for regulated data", "Research timeline health"],
          actions: ["Approve merge", "Request verification", "Export reproducibility pack"]
        },
        scientist: {
          title: "Computational Researcher",
          summary: "Notebook-first workspace with live provenance, diffs, and experiment comparisons.",
          focus: ["Compare experiment branches", "Trace anomaly to preprocessing", "Replay historical runs"],
          actions: ["Fork timeline", "Run experiment", "Tag artifact"]
        },
        compliance: {
          title: "Compliance Officer",
          summary: "Audit-focused view of policy adherence, signatures, and immutable records.",
          focus: ["Policy violations", "Audit ledger integrity", "CSV runner compliance"],
          actions: ["Sign certificate", "Open policy bundle", "Generate audit report"]
        }
      },
      resilience: [
        {
          tag: "Provenance gaps",
          title: "External data detection",
          summary: "Unregistered datasets are flagged and impact downstream artifacts with reduced confidence.",
          mitigation: "Repair flow links missing sources to hashed manifests."
        },
        {
          tag: "Environment drift",
          title: "Container integrity checks",
          summary: "Missing images or registry drift trigger rebuild prompts with explicit disclosure.",
          mitigation: "Fallback rebuilds are marked as non-authoritative."
        },
        {
          tag: "Merge conflicts",
          title: "Lineage-aware resolution",
          summary: "Artifact conflicts surface with diff views, keeping both branches traceable.",
          mitigation: "Merge nodes preserve decision history."
        },
        {
          tag: "Audit integrity",
          title: "Tamper-evident ledger",
          summary: "Hash chain mismatches lock projects until administrators validate records.",
          mitigation: "Merkle root signatures prove tamper status."
        }
      ]
    });
  });

timeScrubber.addEventListener("input", (event) => {
  setTimelineState(Number(event.target.value));
});

replayRange.addEventListener("input", (event) => {
  updateReplayModel(event.target.value);
});

drawerClose.addEventListener("click", () => {
  closeDrawer();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});

personaTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    personaTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    if (provenanceData) {
      renderPersonas(provenanceData.personas, tab.dataset.persona);
    }
  });
});
