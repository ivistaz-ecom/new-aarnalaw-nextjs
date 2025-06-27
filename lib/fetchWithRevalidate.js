
export async function fetchWithRevalidate(url, revalidate = 60) {
    return fetch(url, {
      cache: "force-cache",
      next: { revalidate },
    });
  }