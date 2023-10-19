export declare class welcomeCard {
    constructor(options?: {
        username?: string;
        avatar?: string;
        title?: string;
        color?: string;
        message?: string;
        background: string;
    });

    public setName(name: string): this;
    public setAvatar(image: string): this;
    public setTitle(title: string): this;
    public setColor(color: string): this;
    public setMessage(message: string): this;
    public setBackground(background: string): this;

    public build(): Promise<Buffer>;
}
