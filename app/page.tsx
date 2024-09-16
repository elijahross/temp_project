import Quote from "../components/Quote"
import Visitor from "@/components/Visitor";
import dynamic from "next/dynamic";

const dynQuote = dynamic(() => import("../components/Quote"), { ssr: false });
const dynVisitor = dynamic(() => import("../components/Visitor"), { ssr: false });

export default async function Home() {
  return (
    <div className="p-10 px-32 w-full flex flex-col items-center justify-between overflow-x-hidden xl:overflow-x-visibel">
      <Quote/>
      <Visitor/>
    </div>
  );
}
