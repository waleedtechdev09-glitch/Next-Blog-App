export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    return new Response("Success", {
      status: 200,
      headers: {
        "Set-Cookie": "admin-auth=true; Path=/",
      },
    });
  }

  return new Response("Wrong Password", { status: 401 });
}
