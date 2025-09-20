export enum KeyType { DropKey, UnlockKey };
export async function verifyAuth(key: string, type: KeyType): Promise<boolean> {
  // TODO: add database stuff
  const demoDropKey = "0ECgnekF6mzZ74ns-DEMO";
  const demoUnlockKey = "lfdW8kiGk*TdmH^Eiw^2l0aOp6i#YzkU-DEMO";
  if (type === KeyType.DropKey) {
    // demo code
    if (key === demoDropKey) {
      return true;
    } else {
      return false
    }
  }
  if (type === KeyType.UnlockKey) {
    // demo code
    if (key === demoUnlockKey) {
      return true;
    } else {
      return false
    }
  }
  return false;
}