import { notFound } from "next/navigation";
import Home from "../page";

export default async function Page({ params }: { params: { section: string } }) {
  const { section } = await params;

  if (section === "home") {
    return <Home />;
  }

  // Dynamic import for sections
  let Component;
  try {
    Component = (await import(`./sections/${section}`)).default;
  } catch {
    notFound();
  }

  return <Component />;
}