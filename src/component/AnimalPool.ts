/**
 * 已购买的动物池， 可从池中取出动物放到跑道上
 */
class AnimalPool {
    private manager: DataManager = DataManager.getInstance();

    private slots: Laya.Image[];

    private slotAnimals: Animal[];

    private draggingAnimal: Animal;

    private cleanedRunningCopy: boolean;

    constructor(private ui: ui.AnimalPoolUI, private trail: AnimalTrail) {
        this.slots = [ui.c1, ui.c2, ui.c3, ui.c4, ui.c5, ui.c6, ui.c7, ui.c8, ui.c9, ui.c10, ui.c11, ui.c12];
        for (let index = 0; index < this.slots.length; index++) {
            this.slots[index].on(Laya.Event.MOUSE_DOWN, this, this.clickSlot, [index]);
        }
        this.slotAnimals = new Array<Animal>(this.slots.length);
    }

    public canAddAnimal() {
        return this.getAvailableSlot() >= 0;
    }

    // 增加动物进入池
    public addAnimal(animal: Animal) {
        let index: number = this.getAvailableSlot();
        this.addAnimalToSlot(animal, index);
    }

    private addAnimalToSlot(animal: Animal, index: number) {
        animal.changeState(AnimalState.Bought);
        this.ui.addChild(animal);
        this.setAnimalToSlot(animal, index);
    }

    // 从池中移除动物
    private removeAnimal(index: number) {
        let animal: Animal = this.slotAnimals[index];
        if (this.hasRunningCopy(animal)) {
            this.toggleForTrail(animal);
        }

        this.slotAnimals[index] = null;
        animal.removeSelf();
        animal.recover();
    }

    private getAvailableSlot(): number {
        for (let index = 0; index < this.slotAnimals.length; index++) {
            if (!this.slotAnimals[index]) {
                return index;
            }
        }
        return -1;
    }

    public clickSlot(index: number) {
        let animal: Animal = this.slotAnimals[index];
        if (animal) {
            if (this.hasRunningCopy(animal)) {
                this.toggleForTrail(animal);
                this.cleanedRunningCopy = true;
            } else {
                this.cleanedRunningCopy = false;
            }

            this.ui.on(Laya.Event.MOUSE_MOVE, this, this.moveAnimal, [index]);
            this.ui.on(Laya.Event.MOUSE_UP, this, this.stopDragAnimal, [index]);
            this.ui.on(Laya.Event.MOUSE_OUT, this, this.stopDragAnimal, [index]);
        }
    }

    public moveAnimal(index: number): void {
        let animal: Animal = this.slotAnimals[index];
        this.draggingAnimal = animal;

        animal.x = Math.max(Math.min(this.ui.mouseX - 30, this.ui.width - animal.width/2), 10);
        animal.y = Math.max(Math.min(this.ui.mouseY - 30, this.ui.height - animal.height/2), 10);
    }

    public stopDragAnimal(index: number) {
       this.ui.off(Laya.Event.MOUSE_MOVE, this, this.moveAnimal);
       this.ui.off(Laya.Event.MOUSE_UP, this, this.stopDragAnimal);
       this.ui.off(Laya.Event.MOUSE_OUT, this, this.stopDragAnimal);

       if (this.draggingAnimal) {
            // find the closed slot
            let animal: Animal = this.draggingAnimal;
            this.draggingAnimal = null;
            let closestSlotIndex = this.findClosestSlot(animal);
            if (closestSlotIndex >= 0) {
                // remove from previous slot
                if (this.slotAnimals[closestSlotIndex]) {
                    if ((index + 1) < GameRules.animalCount && closestSlotIndex !== index 
                    && this.slotAnimals[closestSlotIndex].animalKind === animal.animalKind) {
                        this.mergeAnimal(index, closestSlotIndex);
                        return;
                    }
                } else {
                    this.slotAnimals[index] = null;
                    this.setAnimalToSlot(animal, closestSlotIndex);
                    return;
                }
            } 
            
            // move back
            Laya.Tween.to(animal, { x: this.slots[index].x + 5, y: this.slots[index].y }, 100);
       } else {
           if (!this.cleanedRunningCopy) {
               this.toggleForTrail(this.slotAnimals[index]);
           }
       }
    }

    private mergeAnimal(fromIndex: number, toIndex: number) {
        let animalKind: number = this.slotAnimals[fromIndex].animalKind + 1;
        let newAnimal: Animal = Animal.createViaPrototype(this.manager.getAnimalPrototype(animalKind));

        this.removeAnimal(fromIndex);
        this.removeAnimal(toIndex);

        this.addAnimalToSlot(newAnimal, toIndex);
    }

    private getAnimalSlot(animal: Animal): number {
        for (let index = 0; index < this.slotAnimals.length; index++) {
            if (this.slotAnimals[index] === animal) {
                return index;
            }
        }
        return -1;
    }

    private findClosestSlot(animal: Animal): number {
        for (let index = 0; index < this.slots.length; index++) {
            let slot: Laya.Image = this.slots[index];
            if (Math.abs(slot.x-animal.x) < slot.width/3 && Math.abs(slot.y-animal.y) < slot.height/3) {
                return index;
            }
        }
        return -1;
    }

    private setAnimalToSlot(animal: Animal, index: number) {
        this.slotAnimals[index] = animal;
        animal.pos(this.slots[index].x + 5, this.slots[index].y);
    }

    // 点击池中动物时把此动物加入跑道或者从跑道中移除
    public toggleForTrail(animal: Animal): void {
        if (this.hasRunningCopy(animal)) {
            this.trail.removeAnimal(animal.getUIAttributes().runningCopy);
            this.clearRunningCopy(animal);
        } else {
            let runningAnimal = Animal.createViaPrototype(animal);
            runningAnimal.changeState(AnimalState.Running);
            this.trail.addAnimal(runningAnimal);
        
            this.setRunningCopy(animal, runningAnimal);
        }
    }

    private hasRunningCopy(animal: Animal): boolean {
        if (animal.getUIAttributes().runningCopy) {
            return true;
        }
        return false;
    }

    // 设置跑圈状态
    private setRunningCopy(animal: Animal, runningCopy: Animal): void {
        animal.getUIAttributes().runningCopy = runningCopy;
        animal.image.alpha = 0.5;
    }

    // 清除跑圈状态
    private clearRunningCopy(animal: Animal): void {
        animal.getUIAttributes().runningCopy = null;
        animal.image.alpha = 1;
    }
    // TODO 绘制池中每个动物格子的小方块
}