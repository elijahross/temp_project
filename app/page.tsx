import dynamic from "next/dynamic";

const DynQuote = dynamic(() => import("../components/Quote"), { ssr: false });
const DynVisitor = dynamic(() => import("../components/Visitor"), { ssr: false });

export default async function Home() {
  return (
    <div className="p-10 px-32 w-full flex flex-col items-center justify-between overflow-x-hidden xl:overflow-x-visibel">
      <DynQuote/>
      <DynVisitor/>
    </div>
  );
}
