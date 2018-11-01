/**
 * 动物的跑道
 */
class AnimalsTrail extends Laya.Box {
    private manager: DataManager = DataManager.getInstance();

    constructor() {
        super();
    }

    // 动物移动动画
    public animalsRun() {
        for (let index = 0; index < this.numChildren; index++) {
            let animal: Animal = this.getChildAt(index) as Animal;

            // 计算弧度
            let radian = animal.rotation * Math.PI / 180;
            // 计算位置
            animal.x = OvalConfig.longAxis * Math.cos(radian) + OvalConfig.center.x;
            animal.y = OvalConfig.shortAxis * Math.sin(radian) + OvalConfig.center.y;
            // 设置当前角度
            animal.rotation += animal.speed;
            if (animal.rotation > 360) {
                animal.rotation = 0;
            }
        }
    }

    // 增加动物进入跑道
    public addAnimal(animal: Animal) {
        animal.changeState(AnimalState.Running);

        // 设置一个随机角度
        animal.rotation = Math.random() * 360;
        this.addChild(animal);
    }

    // 从跑道中移除动物
    public removeAnimal(animal: Animal) {
        this.removeChild(animal);

        animal.recover();
    }
}

class OvalConfig {
    // 椭圆中心点
    public static center: Laya.Point = new Laya.Point(240, 426);

    // 半长轴
    public static longAxis: number = 170;

    // 半短轴
    public static shortAxis: number = 356;
}