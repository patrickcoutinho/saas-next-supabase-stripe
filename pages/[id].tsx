import { GetStaticProps, NextPage } from "next";
import { supabase } from "../services/supabase";

const LessonDetails: NextPage = ({ lesson }: any) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from("lesson").select("id");

  const paths = lessons?.map(({ id }) => ({ params: { id: id.toString() } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params: { id },
}: any) => {
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();

  return { props: { lesson } };
};

export default LessonDetails;
