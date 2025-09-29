import { Header } from "@/components/app/header";
import { Footer } from "@/components/app/footer";
import { PetNameGenerator } from "@/components/app/pet-name-generator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PetNameGenerator />
      </main>
      <Footer />
    </div>
  );
}
