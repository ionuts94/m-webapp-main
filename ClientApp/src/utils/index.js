export async function imageIsValid(url) {
  const res = await fetch(url);
  const buffer = await res.blob();
  return buffer.type.startsWith('image/')
}