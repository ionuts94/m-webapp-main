export async function imageIsValid(url) {
  const res = await fetch(url);
  const bufferRes = await res.blob();
  return bufferRes.type.startsWith('image/')
}