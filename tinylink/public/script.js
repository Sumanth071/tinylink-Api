// LOAD LINKS
async function loadLinks() {
  const res = await fetch("/api/links");
  const data = await res.json();

  const table = document.getElementById("linkTable");
  table.innerHTML = "";

  data.forEach((link) => {
    table.innerHTML += `
      <tr class="border-b">
        <td class="p-2">
          <a class="text-blue-600 underline" href="/code/${link.code}">
            ${link.code}
          </a>
        </td>

        <td class="p-2">${link.url.substring(0, 40)}...</td>

        <td class="p-2">${link.clicks}</td>

        <td class="p-2">
          <button onclick="deleteLink('${link.code}')" 
            class="text-red-600">Delete</button>
        </td>
      </tr>
    `;
  });
}

// CREATE LINK
document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = document.getElementById("url").value.trim();
  const code = document.getElementById("code").value.trim();

  const res = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, code }), // VALID JSON
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
  } else {
    alert("Created!");
    loadLinks();
    document.getElementById("createForm").reset();
  }
});

// DELETE LINK
async function deleteLink(code) {
  if (!confirm("Delete this link?")) return;

  const res = await fetch(`/api/links/${code}`, { method: "DELETE" });

  if (res.ok) {
    loadLinks();
  } else {
    alert("Delete failed");
  }
}

loadLinks();
