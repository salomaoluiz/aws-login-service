export interface IUseCase<Input, Result> {
  execute(input: Input): Promise<Result>;
}

export interface IUseCaseWithoutInput<Result> {
  execute(): Promise<Result>;
}
