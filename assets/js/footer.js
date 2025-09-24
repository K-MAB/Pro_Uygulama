
(async function mountFooter(){
  const host = document.getElementById('footer');
  if(!host) return;
  const res = await fetch('partials/footer.html');
  host.innerHTML = await res.text();
})();

