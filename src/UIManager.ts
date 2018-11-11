/**
 * 游戏UI管理器
 */
class UIManager {
    private static instance = null;

    // 单例
    public static getInstance() : UIManager {
        if (UIManager.instance === null) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }

    public mainView: MainView;

    constructor() {
        this.mainView = new MainView();
    }
}