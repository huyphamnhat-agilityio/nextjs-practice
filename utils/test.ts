export async function resolvedComponent<T>(Component, props: T) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
