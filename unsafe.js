const UNSAFE = Symbol("UNSAFE");

export function unsafe(str) {
  return {
    UNSAFE: UNSAFE,
    toString: () => {
      return str;
    },
  };
}

export function isUnsafe(value) {
  if (value && value.UNSAFE && value.UNSAFE === UNSAFE) {
    return true;
  }

  return false;
}
