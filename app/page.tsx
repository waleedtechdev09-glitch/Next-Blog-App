"use client";
import BlogList from "@/components/BlogList";
import CinematicPostCard from "@/components/CinematicPostCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <BlogList />
      <CinematicPostCard />
      <Footer />
    </div>
  );
}
