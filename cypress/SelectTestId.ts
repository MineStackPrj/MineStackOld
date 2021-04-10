/**
 * E2Eテスト用のカスタムデータ属性
 * @param id カスタムデータ属性のID
 */
export function selectTestId(id: string): string {
  return `[data-testid="${id}"]`;
}
