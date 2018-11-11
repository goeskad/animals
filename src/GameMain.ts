/**
 * 游戏主程序
 */
class GameMain {
    //管理当前游戏数据，如那些动物在跑道上
    private manager: DataManager;

    private mainView: MainView;

    constructor() {
        //初始化引擎，设置游戏设计宽高，并且打开WebGL模式
        Laya.init(480, 852, Laya.WebGL);
        //1440*2560 9：16
        //加载图集资源
        // Laya.loader.load("res/atlas/animals.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);

        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置剧中对齐
        Laya.stage.alignH = "center";
        //设置横竖屏
        Laya.stage.screenMode = "horizontal";
   
        this.startLoad();
    }

    startLoad(): void {
        //缓存animal动画
        // Laya.Animation.createFrames(["res/a1.png"], "a1");
        // Laya.Animation.createFrames(["res/a2.png"], "a2");
        // Laya.Animation.createFrames(["res/a3.png"], "a3");
        // Laya.Animation.createFrames(["res/a4.png"], "a4");
        // Laya.Animation.createFrames(["res/a5.png"], "a5");
        // Laya.Animation.createFrames(["res/a6.png"], "a6");

        this.onLoaded();
    }

    onLoaded(): void {
        console.log("laya loaded");

        //重置游戏数据
        this.manager = DataManager.getInstance();

        this.mainView = new MainView();
        Laya.stage.addChild(this.mainView);
        Laya.stage.bgColor = "#00c1ff";

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
        this.mainView.trail.animalsRun();
    }
}