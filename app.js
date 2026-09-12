/*
  النسخة الحالية هي واجهة جاهزة.
  لكي تصبح الرسائل حقيقية ولحظية بين هاتفين، نحتاج ربط هذا الملف
  بمخزن/قناة realtime. لا توجد خدمة خارجية مفعلة هنا بعد.

  مهم: GitHub Pages لا يوفر قناة realtime أو قاعدة بيانات بحد ذاته.
*/

const DEMO_USERS = {
  user1: {name: "1", password: "4"},
  user2: {name: "الصديق", password: "654321"}
};

let selectedUser = null;
let currentUser = null;

const $ = id => document.getElementById(id);

document.querySelectorAll("[data-user]").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedUser = btn.dataset.user;
    document.querySelectorAll("[data-user]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

$("loginBtn").onclick = () => {
  if (!selectedUser) return $("loginMsg").textContent = "اختر حسابًا أولًا.";
  if ($("password").value !== DEMO_USERS[selectedUser].password)
    return $("loginMsg").textContent = "كلمة المرور غير صحيحة.";
  currentUser = selectedUser;
  $("login").classList.add("hidden");
  $("chat").classList.remove("hidden");
  renderDemo();
};

$("logoutBtn").onclick = () => {
  currentUser = null;
  $("chat").classList.add("hidden");
  $("login").classList.remove("hidden");
  $("password").value = "";
  $("messages").innerHTML = "";
};

$("sendForm").onsubmit = e => {
  e.preventDefault();
  const input = $("messageInput");
  const text = input.value.trim();
  if (!text) return;
  addBubble(text, true, "✓");
  input.value = "";
};

function addBubble(text, mine, ticks="") {
  const box = document.createElement("div");
  box.className = "bubble " + (mine ? "mine" : "theirs");
  box.innerHTML = `<div>${escapeHtml(text)}</div>
    ${mine ? `<span class="meta"><span class="tick">${ticks}</span></span>` : ""}`;
  $("messages").appendChild(box);
  $("messages").scrollTop = $("messages").scrollHeight;
}

function renderDemo(){
  $("messages").innerHTML = "";
  addBubble("أهلًا 👋", false);
  addBubble("أهلًا بك ❤️", true, "✓✓");
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}
