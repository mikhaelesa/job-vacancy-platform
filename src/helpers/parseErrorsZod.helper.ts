const parseErrorsZod = (
  errors: { [s: string]: unknown } | ArrayLike<unknown>
) => {
  const mapped: Record<string, string> = {};
  for (const [key, messages] of Object.entries(errors)) {
    mapped[key] = (messages as string[])[0];
  }
  return mapped;
};

export default parseErrorsZod;
