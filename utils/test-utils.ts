// reference: https://github.com/vercel/next.js/issues/47131
export async function resolvedComponent<T>(Component, props: T) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
