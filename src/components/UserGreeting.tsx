type User = {
  name: string;
};

export default function UserGreeting({ user }: { user: User }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <>
      <h1 className="text-4xl font-bold">
        👋 {greeting}, {user.name}
      </h1>

      <p className="text-blue-100 mt-3 text-lg">
        Welcome back! Here's what's happening with your customer feedback today.
      </p>
    </>
  );
}