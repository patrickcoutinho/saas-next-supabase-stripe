import type { NextPage } from "next";
import { supabase } from "./services/supabase";

const Home: NextPage = ({ lessons }: any) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {lessons.map((lesson: any) => (
        <p key={lesson.id}>{lesson.title}</p>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return { props: { lessons } };
};

export default Home;
