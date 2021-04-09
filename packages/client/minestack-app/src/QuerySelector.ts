/**
 * @file QuerySelector.ts
 * @author MineStackPrj
 * @copyright Copyright © 2021 MineStackPrj All rights reserved.
 */

/**
 * `data-testid`で指定したタグを取得
 * @param container renderで生成したHTMLドキュメント
 * @param id `data-testid`に指定したID
 */
export function querySelector(container: HTMLDivElement | undefined, id: string): Element | null | undefined {
  return container?.querySelector(`[data-testid="${id}"]`);
}
