import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "~/components/navbar";
import { Posts } from "~/components/posts";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blogging engine</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex min-h-screen flex-1 flex-col items-start justify-center gap-16 py-16 pl-pageGutter">
        <div>
          <h1 className="text-4xl font-bold">Recent articles</h1>
        </div>
        <div className="flex h-full w-1/2 flex-1 flex-col items-start justify-start gap-8 rounded-xl ">
          <Posts />
        </div>
      </main>
    </>
  );
}
