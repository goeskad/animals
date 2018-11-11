/**
 * 游戏规则， 定义一些基本规则数据
 */
class GameRules {
    // 初始金钱
    public static initGold: number = 1000;
    //初始解锁动物级别
    public static initUnlockedLevel: number = 4;
    
    // 动物总数
    public static animalCount: number = 7;
    // 动物初始速度
    public static animalInitSpeed: number = 1;
    // 每种动物速度增加量
    public static animalSpeedIncrement: number = 0.1;
    // 动物初始价格
    public static animalInitPrice: number = 100;
    // 动物价格每次购买后增加百分比
    public static animalPriceIncrement: number = 20;
    // 动物每跑一圈的奖励金初始值，每一种动物的奖励金根据此值计算出来
    public static animalInitBonus: number = 100;
}