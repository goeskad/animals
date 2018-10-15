/**
 * 游戏数据管理器
 */
class DataManager {
    private static instance = null;

    // 单例
    public static getInstance() : DataManager {
        if (DataManager.instance === null) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }

    private gameData: GameData;

    constructor() {
        if (DataManager.instance !== null) {
            return DataManager.instance;
        }

        // 从服务器获取当前用户的游戏数据
        this.gameData = this.loadData();

        // 如果当前用户没有数据则初始化默认数据
        if (this.gameData === null) {
           this.gameData = new GameData();
           this.gameData.initDefaultValue();
        }
    }

    // 获取当前游戏数据
    public getData(): GameData {
        return this.gameData;
    }

    // 从服务器获取当前用户的游戏数据
    public loadData(): GameData {
        // TODO
        return null;
    }

    // 保存当前游戏数据到服务器
    public saveData() {
        // TODO
    }

    // 游戏数据发生变化
    public dataChanged() {
       // 暂时啥也不做
    }
}