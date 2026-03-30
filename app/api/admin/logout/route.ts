export async function POST() {
  return new Response("Logged out", {
    headers: {
      "Set-Cookie": "admin-auth=; Path=/; Max-Age=0",
    },
  });
}
