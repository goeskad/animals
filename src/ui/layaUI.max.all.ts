
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class AnimalPoolUI extends View {
		public c1:Laya.Image;
		public c2:Laya.Image;
		public c3:Laya.Image;
		public c4:Laya.Image;
		public c5:Laya.Image;
		public c6:Laya.Image;
		public c7:Laya.Image;
		public c8:Laya.Image;
		public c9:Laya.Image;
		public c10:Laya.Image;
		public c11:Laya.Image;
		public c12:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":250,"height":290},"child":[{"type":"Image","props":{"y":10,"x":10,"width":70,"var":"c1","skin":"slot.png","height":60}},{"type":"Image","props":{"y":10,"x":90,"width":70,"var":"c2","skin":"slot.png","height":60}},{"type":"Image","props":{"y":10,"x":170,"width":70,"var":"c3","skin":"slot.png","height":60}},{"type":"Image","props":{"y":80,"x":10,"width":70,"var":"c4","skin":"slot.png","height":60}},{"type":"Image","props":{"y":80,"x":90,"width":70,"var":"c5","skin":"slot.png","height":60}},{"type":"Image","props":{"y":80,"x":170,"width":70,"var":"c6","skin":"slot.png","height":60}},{"type":"Image","props":{"y":150,"x":10,"width":70,"var":"c7","skin":"slot.png","height":60}},{"type":"Image","props":{"y":150,"x":90,"width":70,"var":"c8","skin":"slot.png","height":60}},{"type":"Image","props":{"y":150,"x":170,"width":70,"var":"c9","skin":"slot.png","height":60}},{"type":"Image","props":{"y":220,"x":10,"width":70,"var":"c10","skin":"slot.png","height":60}},{"type":"Image","props":{"y":220,"x":90,"width":70,"var":"c11","skin":"slot.png","height":60}},{"type":"Image","props":{"y":220,"x":170,"width":70,"var":"c12","skin":"slot.png","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.AnimalPoolUI.uiView);

        }

    }
}

module ui {
    export class AnimalShopUI extends Dialog {
		public closeBtn:Laya.Image;
		public alist:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"width":300,"height":400},"child":[{"type":"Image","props":{"y":1,"x":245,"top":0,"skin":"panelglass.png","sizeGrid":"17,24,32,25","right":0,"left":0,"bottom":0}},{"type":"Image","props":{"y":1,"x":245,"width":55,"var":"closeBtn","skin":"close.png","height":49}},{"type":"List","props":{"y":60,"x":20,"var":"alist","repeatY":4,"repeatX":1},"child":[{"type":"SellAnimal","props":{"y":-1,"x":-2,"name":"render","runtime":"ui.SellAnimalUI"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.SellAnimalUI",ui.SellAnimalUI);

            super.createChildren();
            this.createView(ui.AnimalShopUI.uiView);

        }

    }
}

module ui {
    export class AnimalTrailUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":430,"height":720},"child":[{"type":"Image","props":{"y":2,"x":4,"width":422,"skin":"trail.png","height":712}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.AnimalTrailUI.uiView);

        }

    }
}

module ui {
    export class MainViewUI extends View {
		public poolUI:ui.AnimalPoolUI;
		public goldLb:Laya.Label;
		public buyBtn:Laya.Image;
		public trailUI:ui.AnimalTrailUI;
		public shopUI:ui.AnimalShopUI;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":480,"height":852},"child":[{"type":"AnimalPool","props":{"y":263,"x":120,"var":"poolUI","runtime":"ui.AnimalPoolUI"}},{"type":"Label","props":{"y":186,"x":223,"width":67,"var":"goldLb","text":"123","height":59,"fontSize":20,"font":"Microsoft YaHei","color":"#f1fb01","bold":true}},{"type":"Image","props":{"y":156,"x":129,"skin":"mgold.png"}},{"type":"Image","props":{"y":582,"x":185,"width":121,"var":"buyBtn","skin":"buy.png","height":76}},{"type":"AnimalTrail","props":{"y":41,"x":26,"var":"trailUI","runtime":"ui.AnimalTrailUI"}},{"type":"AnimalShop","props":{"y":223,"x":98,"var":"shopUI","runtime":"ui.AnimalShopUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.AnimalPoolUI",ui.AnimalPoolUI);
			View.regComponent("ui.AnimalTrailUI",ui.AnimalTrailUI);
			View.regComponent("ui.AnimalShopUI",ui.AnimalShopUI);

            super.createChildren();
            this.createView(ui.MainViewUI.uiView);

        }

    }
}

module ui {
    export class SellAnimalUI extends View {
		public aprice:Laya.Label;
		public abox:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":260,"height":70},"child":[{"type":"Image","props":{"y":5,"x":161,"width":90,"skin":"buy.png","height":60}},{"type":"Image","props":{"y":34,"x":168,"width":22,"skin":"mgold.png","height":30}},{"type":"Label","props":{"y":42,"x":196,"var":"aprice","text":"123","font":"Microsoft YaHei","color":"#eeee0f","bold":true}},{"type":"Box","props":{"y":5,"x":10,"width":60,"var":"abox","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.SellAnimalUI.uiView);

        }

    }
}

module ui {
    export class WinBonusUI extends Dialog {
		public blabel:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":100,"height":40},"child":[{"type":"Box","props":{"y":0,"x":4},"child":[{"type":"Image","props":{"y":0,"x":0,"width":27,"skin":"mgold.png","height":36}},{"type":"Label","props":{"y":13,"x":33,"width":66,"var":"blabel","text":"123","height":42,"font":"Microsoft YaHei","color":"#cdf10e","bold":true}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.WinBonusUI.uiView);

        }

    }
}
