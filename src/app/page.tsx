import Footer from "@/component/Footer";
import SearchBar from "@/component/SearchBar";
export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <SearchBar/>
        <p>hello</p>
      </main>
      <Footer />
    </div>
  );
}
