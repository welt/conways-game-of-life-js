import { webcrypto } from "node:crypto";

const randomBool = (() => {
  const a = new Uint8Array(1);
  return () => {
    webcrypto.getRandomValues(a);
    return a[0] % 2;
  };
})();

export { randomBool };
