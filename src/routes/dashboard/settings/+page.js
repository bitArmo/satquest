// src/routes/dashboard/+page.js
export async function load({ fetch }) {
  const response = await fetch('/api/user');
  const userData = await response.json();
  return { userData };
}