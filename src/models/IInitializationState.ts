export interface InitializationState {
    pageName: string;
    isProd?: boolean;
    error?: {
        code: number,
        message: string
    };
}