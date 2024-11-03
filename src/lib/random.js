import { webcrypto } from "node:crypto";

if (!webcrypto) {
  throw new Error(
    "Stopping: Wrong Node version, or crypto support is disabled.",
  );
}

const randomBool = (() => {
  const a = new Uint8Array(1);
  return () => {
    webcrypto.getRandomValues(a);
    return a[0] % 2;
  };
})();

export { randomBool };
