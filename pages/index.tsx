import type { NextPage } from "next";
import Link from "next/link";
import { useUser } from "../context/users";
import { supabase } from "../services/supabase";

const Home: NextPage = ({ lessons }: any) => {
  const { user } = useUser();

  console.log({ user });

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons.map((lesson: any) => (
        <Link key={lesson.id} href={`${lesson.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return { props: { lessons } };
};

export default Home;
