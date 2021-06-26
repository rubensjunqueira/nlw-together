export interface IService<TRequest, TResponse> {
    execute(data?: TRequest): Promise<TResponse>
}