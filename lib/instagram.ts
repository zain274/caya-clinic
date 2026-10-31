import { instagramPosts } from "@/lib/clinic";

type Post = (typeof instagramPosts)[number];
const BROKEN = /may be broken|may have been removed|isn.t available|page isn.t available/i;

// Server-side check: drop posts whose embed page says "broken/removed".
// If the check itself fails (timeout, blocked), keep the post so section never goes blank by mistake.
async function isWorking(p: Post): Promise<boolean> {
  try {
    const res = await fetch(`https://www.instagram.com/${p.type}/${p.id}/embed`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
      headers: { "user-agent": "Mozilla/5.0 (compatible; CayaSite/1.0)" },
    });
    if (res.status === 404 || res.status === 410) return false;
    if (!res.ok) return true;
    return !BROKEN.test(await res.text());
  } catch {
    return true;
  }
}

export async function getWorkingPosts(): Promise<Post[]> {
  const ok = await Promise.all(instagramPosts.map(isWorking));
  return instagramPosts.filter((_, i) => ok[i]);
}
