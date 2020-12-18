/**
 * レコード作成用DTO
 */
export type CreateDto<T, U extends keyof T> = Required<Pick<T, U>>;

/**
 * レコード更新用DTO
 */
export type UpdateDto<T, U extends keyof T> = Partial<Pick<T, U>>;
