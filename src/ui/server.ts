import http from "node:http";
import { loadJobs, loadQueue, saveQueue } from "../storage/store.js";

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>ApplyNow</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; }
    .job { border: 1px solid #ddd; padding: 12px; border-radius: 8px; margin-bottom: 10px; }
    .row { display:flex; gap: 8px; align-items:center; }
    .muted { color:#666; font-size: 0.9em; }
    button { padding: 8px 12px; }
  </style>
</head>
<body>
  <h1>ApplyNow</h1>
  <p class="muted">Select jobs to apply for, then click “Queue for Apply”.</p>
  <div id="jobs"></div>
  <div style="margin-top:16px;">
    <button id="queue">Queue for Apply</button>
  </div>
<script>
async function fetchJobs(){
  const res = await fetch('/api/jobs');
  return res.json();
}

async function fetchQueue(){
  const res = await fetch('/api/queue');
  return res.json();
}

function render(jobs, queue){
  const root = document.getElementById('jobs');
  root.innerHTML = '';
  jobs.forEach(j => {
    const el = document.createElement('div');
    el.className = 'job';
    el.innerHTML = `
      <div class="row">
        <input type="checkbox" data-id="${j.id}" ${queue.includes(j.id) ? 'checked' : ''} />
        <strong>${j.title}</strong>
      </div>
      <div class="muted">${j.company} · ${j.location ?? '—'} · ${j.source}</div>
      <div><a href="${j.url}" target="_blank" rel="noreferrer">Open</a></div>
    `;
    root.appendChild(el);
  });
}

async function main(){
  const [jobs, queue] = await Promise.all([fetchJobs(), fetchQueue()]);
  render(jobs, queue);
  document.getElementById('queue').onclick = async () => {
    const ids = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(x => x.dataset.id);
    await fetch('/api/queue', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ ids })});
    alert('Queued ' + ids.length + ' jobs');
  };
}

main();
</script>
</body>
</html>`;

export function startUiServer(port = 5179) {
  const server = http.createServer((req, res) => {
    if (!req.url) return;
    if (req.url === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(html);
      return;
    }
    if (req.url === "/api/jobs") {
      const jobs = loadJobs();
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(jobs));
      return;
    }
    if (req.url === "/api/queue" && req.method === "GET") {
      const queue = loadQueue();
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(queue));
      return;
    }
    if (req.url === "/api/queue" && req.method === "POST") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        const { ids } = JSON.parse(body || "{\"ids\":[]}");
        saveQueue(Array.isArray(ids) ? ids : []);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      });
      return;
    }
    res.writeHead(404);
    res.end("Not found");
  });
  server.listen(port, () => {
    console.log(`UI running at http://localhost:${port}`);
  });
}
