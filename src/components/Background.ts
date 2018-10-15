/**
 * 游戏背景
 */
class BackGround extends Laya.Sprite {
    //定义背景
    private bg: Laya.Sprite;

    constructor() {
        super();
        this.init();
    }

    init(): void {
        //创建背景
        this.bg = new Laya.Sprite();
        //加载并显示背景图
        this.bg.loadImage("res/background.png");
        //把背景放到容器内
        this.addChild(this.bg);
    }
}