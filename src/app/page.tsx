import Header from "./_components/header";

const Page = () => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center flex-col gap-5">
        <h1 className="text-[28px]">Welcome to my blog post platform today!</h1>
        <div>Built by Vitalii B.   8 June 2025</div>
      </main>
    </>
  );
};
export default Page;
