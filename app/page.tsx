import Visitor from "../components/Visitor";
import Quote from "../components/Quote"

export default async function Home() {
  return (
    <div className="p-10 md:px-32 sm:px-10 px-8 w-full flex flex-col items-center justify-between overflow-x-hidden xl:overflow-x-visibel">
      <Quote/>
      <Visitor />
    </div>
  );
}
