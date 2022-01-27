
interface TReducerAction<T> {
  type: T
}

export type TAction<T, P = undefined> = P extends undefined ? TReducerAction<T> : TReducerAction<T> & { payload: P };
