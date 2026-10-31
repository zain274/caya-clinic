import { clinic } from "@/lib/clinic";
import { getWorkingPosts } from "@/lib/instagram";

export const revalidate = 3600;

export default async function Instagram() {
  const posts = await getWorkingPosts();
  return (
    <section id="instagram" className="section tint">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>From Our Instagram</h2>
            <p>Treatments, results and clinic life, straight from our feed.</p>
          </div>
          <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="btn">Follow @cayaclinicofficial</a>
        </div>
        {posts.length > 0 && (
          <ul className="ig-strip" aria-label="Instagram posts and reels">
            {posts.map((p) => (
              <li key={p.id}>
                <iframe
                  src={`https://www.instagram.com/${p.type}/${p.id}/embed`}
                  title={`Instagram ${p.type === "reel" ? "reel" : "post"} by ${p.user}`}
                  loading="lazy"
                  allowFullScreen
                />
                <a href={`https://www.instagram.com/${p.user}/${p.type}/${p.id}/`} target="_blank" rel="noopener noreferrer">Open on Instagram</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
