import Footer from "@/components/footer";
import AddForm from "./component/add-form";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="max-w-screen-xl m-auto h-screen flex flex-col">
        <AddForm />
        <Footer />
      </div>
    </div>
  );
}
