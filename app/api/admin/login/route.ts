export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    return new Response("Success", {
      status: 200,
      headers: {
        "Set-Cookie": "admin=true; Path=/; HttpOnly",
      },
    });
  }

  return new Response("Wrong Password", { status: 401 });
}
