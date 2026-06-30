export function getSafeData(
  response
) {
  if (
    !response ||
    !response.data
  ) {
    return null;
  }

  return response.data;
}