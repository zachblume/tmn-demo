import { useState, useEffect } from "react";

import Highlighter from "react-highlight-words";

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([
    "Start by searching for matching trials... try 'cancer' or 'asthma' ... and click the search button.",
  ]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      let url = "/api/forwardme?query=" + query;
      let response = fetch(url);
      response.then(async (res) => {
        res = await res.text();
        // console.log({ res });
        // res.split("####");
        setResults(res.split("####"));
        setLoading(false);
      });
    }
  }, [query]);

  function search() {
    setQuery(document.getElementById("searchFor").value);
  }

  return (
    <div>
      <Head>
        <title>Clinical trial theMedNet demo for interview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold">
          Search a database of 15k clinical trials using medBERT
        </h1>

        <input type="text" id="searchFor" className="" />
        <input type="submit" value="Search" onClick={search} id="submit" />
        <p className="mb-1">
          Take a look at the code on github at{" "}
          <a
            href="https://github.com/zachblume/tmn-demo"
            className="font-medium text-blue-600 dark:text-blue-500 underline"
          >
            https://github.com/zachblume/tmn-demo
          </a>
          .
        </p>
        <p className="mb-1">
          This frontend is a Next.JS app running on Vercel, the backend is a
          Python web server running on a Google Compute instance.
        </p>
        <p className="mb-3">
          Try it out by searching for matching trials... try 'cancer' or
          'asthma' ... and click the search button.
        </p>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {isLoading
            ? "Loading..."
            : results.map((result, index) => (
                <li
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  key={index}
                >
                  <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1">
                      <p className="mt-1  text-sm text-gray-500">
                        <Highlighter
                          highlightClassName="YourHighlightClass"
                          searchWords={query.split(" ")}
                          autoEscape={true}
                          textToHighlight={result.substring(0, 250)}
                        />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
        </ul>
      </main>
    </div>
  );
}
