/**
 * 动物的跑道
 */
class AnimalTrail {
    private manager: DataManager = DataManager.getInstance();

    constructor(private ui: ui.AnimalTrailUI, private goldLb: Laya.Label) {
    }

    // 动物移动动画
    public animalsRun() {
        for (let index = 1; index < this.ui.numChildren; index++) {
            let child = this.ui.getChildAt(index);

            let animal: Animal;
            if (child instanceof Animal) {
                animal = child as Animal;
            } else {
                continue;
            }

            // 计算弧度
            let radian = animal.rotation * Math.PI / 180;
            // 计算位置
            animal.x = OvalConfig.longAxis * Math.cos(radian) + OvalConfig.center.x;
            animal.y = OvalConfig.shortAxis * Math.sin(radian) + OvalConfig.center.y;

            if (animal.getUIAttributes().winBonusBox) {
                animal.getUIAttributes().winBonusBox.y -= 2;
                if (animal.getUIAttributes().winBonusBox.y < 300) {
                    animal.getUIAttributes().winBonusBox.alpha -= 0.05;
                }
                if (animal.getUIAttributes().winBonusBox.y === 250) {
                    animal.getUIAttributes().resetWinBonusBox();
                }
            } 

            // 设置当前角度
            animal.rotation -= animal.speed;
            if (animal.rotation < 0) {
                animal.rotation = 360;
                this.winBonus(animal);
            }
        }
    }

    private winBonus(animal: Animal) {
        this.manager.getData().currentGold += animal.bonus;
        this.goldLb.text = this.manager.getData().currentGold.toString();

        let winBox: ui.WinBonusUI = Laya.Pool.getItemByClass(Animal.WinBonus_Pool_Sign, ui.WinBonusUI);
        winBox.show(false, false);
        winBox.alpha = 1;
        winBox.pos(380, 350);
        winBox.blabel.text = animal.bonus.toString();

        animal.getUIAttributes().winBonusBox = winBox;
    }

    // 增加动物进入跑道
    public addAnimal(animal: Animal) {
        animal.changeState(AnimalState.Running);

        // 设置一个随机角度
        animal.rotation = Math.random() * 360;
        
        this.ui.addChild(animal);
        console.log("check animal", animal.getBounds());
    }

    // 从跑道中移除动物
    public removeAnimal(animal: Animal) {
        animal.removeSelf();

        animal.recover();
    }
}

class OvalConfig {
    // 椭圆中心点
    public static center: Laya.Point = new Laya.Point(215, 360);

    // 半长轴
    public static longAxis: number = 171;

    // 半短轴
    public static shortAxis: number = 316;
}

class WinBonusBox extends Laya.Box {
    
}