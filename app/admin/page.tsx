import { redirect } from "next/navigation";

const page = () => {
  redirect("/admin/addProduct");
};

export default page;
