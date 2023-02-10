import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  let results = [];
  results.push({ text: "sdfsfsdf" });
  results.push({ text: "sdfsfsdf" });

  return (
    <div className={styles.container}>
      <Head>
        <title>Clinical trial theMedNet demo for interview</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Search a database of 15k clinical trials using medBERT</h1>
        <input type="text" id="searchFor" className="" />
        <div className="clear">
          {results.map((result) => (
            <>
              <div className="card">
                <p>{result.text}</p>
              </div>
            </>
          ))}
        </div>
      </main>
    </div>
  );
}
