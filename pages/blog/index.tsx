import Link from "next/link";
import { css } from "@emotion/css";

const navigationLinks = ["Home", "About", "Get started", "Sign in"];
const imageUrls = [
  "https://miro.medium.com/fit/c/140/140/1*M355w-f84DHrZ6L0wxPGeA.jpeg",
  "https://miro.medium.com/fit/c/140/140/1*v9dNxym7pqhE3ifa3FPG3Q@2x.jpeg",
  "https://miro.medium.com/fit/c/140/140/1*M3gpFGW2mq1rHmhxB8VlJA.jpeg",
];

export default function Blog() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 10rem",
      })}
    >
      <nav
        className={css({
          width: "100%",
          listStyle: "none",
        })}
      >
        <ul
          className={css({
            display: "flex",
            justifyContent: "space-around",
            padding: "0",
            listStyle: "none",
          })}
        >
          {navigationLinks.map((link) => (
            <li key={link}>
              <Link href={link}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <article>
          <p>
            As a Black coming-of-age story, set in 1968, highlights a pivotal
            moment in American history. Finally, America can learn what it was
            like to grow up as a Black boy only a few years after the Civil
            Rights Act and Voting Rights Act were passed into law. During this
            time, Black people experienced.
          </p>
          <p>
            Now, let us address the white elephant in the room — White
            privilege. White people are so used to seeing themselves at the
            center of American television and cinema; some find it absolutely
            repulsive to see the other side of the coin. The irony is not lost
            on me that Black people grew up watching these classic American
            television series that centered around the White experience.
          </p>
          <p>
            So seeing other stories about Black, Indian, Asian, or Latino kids
            growing up and discovering their sense of morality, falling in love,
            or getting into trouble bothers some White folks to no end.
          </p>
        </article>
      </main>
      <footer>
        <ul>
          {imageUrls.map((url) => (
            <img key={url} src={url} />
          ))}
        </ul>
      </footer>
    </div>
  );
}
