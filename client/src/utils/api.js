export async function checkBackend() {
  const res = await fetch("http://localhost:5000");
  const data = await res.text();
  console.log(data);
}
