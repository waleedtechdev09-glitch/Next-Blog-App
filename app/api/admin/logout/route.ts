export async function POST() {
  return new Response("Logged out", {
    status: 200,
    headers: {
      "Set-Cookie": "admin=; Path=/; HttpOnly; Max-Age=0",
    },
  });
}
