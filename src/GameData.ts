/**
 * 游戏数据类，可序列化为JSON格式保存在服务器
 */
class GameData {
    // 当前每种动物的价格
    public animalPrices: Array<number>;

    // 当前跑道中的动物， 数组中记录的是动物种类, 如[1,1,3,3,5,6,6]
    public runningAnimals: Array<number>;
    // 当前池中的动物， 数组中记录的是动物种类
    public selectedAnimals: Array<number>;

    // 当前的金币数
    public currentGold: number;

    // 当前解锁的动物级别（种类）
    public unlockedLevel: number;

    // 初始化默认数据
    public initDefaultValue() {
        this.animalPrices = new Array<number>(GameRules.animalCount);
        let price = GameRules.animalInitPrice;
        for (let i = 0; i < GameRules.animalCount; i++) {
            this.animalPrices[i] = price;
            price = price * 2;
        }

        this.runningAnimals = [];
        this.selectedAnimals = [];
        this.currentGold = GameRules.initGold;
        this.unlockedLevel = GameRules.initUnlockedLevel;
    }
}