/**
 * 游戏主程序
 */
class GameMain {
    //跑道
    private trail: AnimalsTrail;

    //已添加的动物池
    private pool: AnimalsPool;

    //购买动物按钮
    private buyAnimals: BuyAnimals;

    //管理当前游戏数据，如那些动物在跑道上
    private manager: DataManager;

    constructor() {
        //初始化引擎，设置游戏设计宽高，并且打开WebGL模式
        Laya.init(480, 852, Laya.WebGL);
        //加载图集资源
        // Laya.loader.load("res/atlas/animals.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);

        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置剧中对齐
        Laya.stage.alignH = "center";
        //设置横竖屏
        Laya.stage.screenMode = "vertical";
    }

    onLoaded(): void {
        //创建循环滚动的背景
        var bg: BackGround = new BackGround();
        //把背景添加到舞台上显示出来
        Laya.stage.addChild(bg);

        //重置游戏数据
        this.manager = DataManager.getInstance();

        //跑动的动物容器
        this.trail = new AnimalsTrail();
        //添加到舞台上
        Laya.stage.addChild(this.trail);

        //选择了的动物容器
        this.pool = new AnimalsPool();
        //添加到舞台上
        Laya.stage.addChild(this.pool);
        
        //买动物容器
        this.buyAnimals = new BuyAnimals();
        //添加到舞台上
        Laya.stage.addChild(this.buyAnimals);

        //开始
        this.start();
    }

    start(): void {
        this.resume();
    }

    /**暂停 */
    public pause(): void {
        //停止游戏主循环
        Laya.timer.clear(this, this.onLoop);
    }

    /**恢复 */
    public resume(): void {
        //创建游戏主循环
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop(): void {
        // 控制动物移动
        this.trail.animalsRun();
    }
}