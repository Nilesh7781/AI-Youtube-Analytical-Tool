export const POST = async (req: Request) => {
  const userData = await req.json();
  console.log("User data received:", userData);

  // TODO: Save to DB or call Inngest if needed

  return new Response(JSON.stringify({ message: "User created successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
