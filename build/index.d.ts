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
    public setColor(this: string): this;
    public setMessage(this: string): this;
    public setBackground(this: string): this;

    public build(): Promise<Buffer>;
}